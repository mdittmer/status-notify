# Copyright 2023 The Status Notify Authors. All rights reserved.
# Use of this source code is governed by a Apache-style license that can be
# found in the LICENSE file.

export STATUS_NOTIFY_FILE="${STATUS_NOTIFY_FILE:-$HOME/.status-notify}"

function read-char() {
  stty -icanon -echo
  eval "$1=\$(dd bs=1 count=1 2>/dev/null)"
  stty icanon echo
}

function status-notify-status () {
  local ID="$(date +%Y-%m-%d_%H:%M:%S)"
  local STATUS="${1:-1}"
  local TITLE="${2:-${HOSTNAME} status}"
  local MESSAGE="${3:-command on ${HOSTNAME} complete}"
  local CHAR

  printf '{"id": "'"$ID"'", "kind": "start", "status": '"$1"', "title": "'"$TITLE"'", "message": "'"$MESSAGE"'"}\n' >&1

  read-char CHAR

  printf '{"id": "'"$ID"'", "kind": "stop"}\n' >&1
}

function status-notify () {
  local STATUS=$?
  local TITLE="${2:-${HOSTNAME} status}"
  local MESSAGE="${3:-command on ${HOSTNAME} complete}"

  status-notify-status "$STATUS" "$TITLE" "$MESSAGE"
}

function clear-status() {
  printf "" > "${STATUS_NOTIFY_FILE}"
}

function nag-status () {
  status-notify >> "${STATUS_NOTIFY_FILE}"
}

function clear-remote-status () {
  ssh "$1" 'printf "" > "${STATUS_NOTIFY_FILE}"'
}
