

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
