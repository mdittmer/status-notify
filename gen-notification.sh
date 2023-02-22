#!/usr/bin/env bash

# Copyright 2023 The Status Notify Authors. All rights reserved.
# Use of this source code is governed by a Apache-style license that can be
# found in the LICENSE file.

printf '{"status": '"$1"', "title": "'"$2"'", "message": "'"$3"'"}\n' >&1