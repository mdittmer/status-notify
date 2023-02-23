#!/usr/bin/env bash

# Copyright 2023 The Status Notify Authors. All rights reserved.
# Use of this source code is governed by a Apache-style license that can be
# found in the LICENSE file.

declare SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

source "$SCRIPT_DIR/status-notify.bashrc"

status-notify-status "$1" "$2" "$3"
