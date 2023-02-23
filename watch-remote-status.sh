#!/usr/bin/env bash

# Copyright 2023 The Status Notify Authors. All rights reserved.
# Use of this source code is governed by a Apache-style license that can be
# found in the LICENSE file.

set -e

if [[ "$#" != "1" ]]; then
  printf "USAGE:\n/path/to/watch-remote-status.sh [remote-host]\n" >&2
  exit 1
fi

declare SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd "$SCRIPT_DIR"

source ./status-notify.bashrc

clear-remote-status "$1"
ssh "$1" 'tail -f "$STATUS_NOTIFY_FILE"' | npm start
