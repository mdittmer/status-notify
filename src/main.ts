'use strict';

// Copyright 2023 The Status Notify Authors. All rights reserved.
// Use of this source code is governed by a Apache-style license that can be
// found in the LICENSE file.

import {createInterface} from 'readline';
import notifier from 'node-notifier';
import {lstatSync} from 'fs';
import {join, dirname} from 'path';
import Os from 'os';
import sound from 'play-sound';

const player = sound();

function findDirectory(directoryName: string, opt_baseDirectory?: string|undefined) {
  let baseDirectory = opt_baseDirectory || __dirname;
  for (let i = 0; i < 10; i++) {
    try {
      const dir = join(baseDirectory, directoryName);
      const dirStat = lstatSync(dir);
      if (dirStat.isDirectory()) {
        return dir;
      }
    } catch (_error) {}
    try {
      baseDirectory = dirname(baseDirectory);
    } catch (_error) {}
  }
  return null;
}

const imagesDirectory = 'status-notify_icon_images';
const actualImagesDirectory: string|null = findDirectory(imagesDirectory);
if (actualImagesDirectory === null) {
  console.warn(`Failed to find "${imagesDirectory}" directory for icons`);
}

const successIcon = actualImagesDirectory !== null ?
  join(`${actualImagesDirectory}`, 'success.png') :
  null;
const errorIcon = actualImagesDirectory !== null ?
  join(`${actualImagesDirectory}`, 'error.png') :
  null;
const getIcon = actualImagesDirectory !== null ?
  ((status: number) => status === 0 ? successIcon : errorIcon) :
  ((status: number) => undefined);

const soundsDirectory = 'status-notify_sounds';
const actualSoundsDirectory: string|null = findDirectory(soundsDirectory);
if (actualSoundsDirectory === null) {
  console.warn(`Failed to find "${actualSoundsDirectory}" directory for sounds`);
}

function noop() {}

const nagInterval = 10000;
const nag = actualSoundsDirectory !== null ?
  (status: number) => {
    const soundFile = status === 0 ?
      join(`${actualSoundsDirectory}`, 'success.wav') :
      join(`${actualSoundsDirectory}`, 'error.wav');

    let countdown = 60;
    let stopped = false;
    function run() {
      if (!stopped) {
        player.play(soundFile);

        countdown--;
        if (countdown <= 0) {
          stopped = true;
        } else {
          setTimeout(run, nagInterval);
        }
      }
    }
    function stop() {
      stopped = true;
    }
    run();
    return stop;
  } :
  (status: number) => {
    return noop;
  };

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const notifications = new Map();

function processStart(data: any) {
  const {id, status, title, message} = data;
  const icon: string|null|undefined = getIcon(status);
  const notification = {
    title,
    message,
    icon,
    contentImage: icon,
    timeout: 60 * 60,
  };

  console.log('Notifying', id, notification);

  notifier.notify(notification);

  const stop = nag(status);

  notifications.set(id, stop);
}

function processStop(data: any) {
  const {id} = data;
  if (!notifications.has(id)) {
    throw new Error(`Recieved "stop" from unknown notification ID "${id}"`);
  }

  const stop = notifications.get(id);
  console.log('Stopping', id)
  stop();
}

rl.on('line', (line) => {
  try {
    const data = JSON.parse(line);
    const {kind} = data;
    if (kind === 'start') {
      processStart(data);
    } else if (kind === 'stop') {
      processStop(data);
    }
  } catch (error) {
    console.error(error);
  }
});

rl.once('close', () => {
  console.log('Bye!');
  process.exit(0);
});

const icon: string|undefined = actualImagesDirectory !== null ?
  join(`${actualImagesDirectory}`, 'success.png') :
  undefined;
notifier.notify({
  title: 'status-notify ready',
  message: 'status-notify is now reading messages from its stdin',
  icon,
  contentImage: icon,
});
