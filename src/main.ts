'use strict';

// Copyright 2023 The Status Notify Authors. All rights reserved.
// Use of this source code is governed by a Apache-style license that can be
// found in the LICENSE file.

import {createInterface} from 'readline';
import notifier from 'node-notifier';
import {lstatSync} from 'fs';
import {join, dirname} from 'path';

const imagesDirectory = 'notify_icon_images';
let baseImagesDirectory = __dirname;
let actualImagesDirectory: string|null = null;
for (let i = 0; i < 10; i++) {
  try {
    const dir = join(baseImagesDirectory, imagesDirectory);
    const dirStat = lstatSync(dir);
    if (dirStat.isDirectory()) {
      actualImagesDirectory = dir;
      break;
    }
  } catch (_error) {}
  try {
    baseImagesDirectory = dirname(baseImagesDirectory);
  } catch (_error) {}
}
if (actualImagesDirectory === null) {
  console.warn(`Failed to find "${imagesDirectory}" directory for icons`);
}

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  try {
    const {status, title, message} = JSON.parse(line);
    const icon: string|undefined = actualImagesDirectory !== null ?
      (status === 0 ?
        join(`${actualImagesDirectory}`, 'success.png') :
        join(`${actualImagesDirectory}`, 'error.png')) :
      undefined;
    const notification = {
      title,
      message, icon,
      contentImage: icon,
      sound: true,
      wait: true,
    };
    const notify = () => {
      console.log('Notifying', notification);
      notifier.notify(notification, (_, __, metadata) => {
        console.log('Notification complete', metadata);
        if (metadata?.activationType === 'timeout') {
          setTimeout(notify, 10000);
        }
      })
    };
    notify();
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
