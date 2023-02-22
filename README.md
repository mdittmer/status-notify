# Status Notify

Tiny cross-platform desktop notification scripts.

## Example use case

Suppose there are long-running tasks on `remote` machine, and you want to be notified when the complete on `local` desktop.

The following will work with UNIX-like `remote` and `local` machines using `bash`, and needs to be adapted on other platforms.

1. Check out this project on both machines;
1. Build the TypeScript part of the project on `local`: `npm install && node_modules/.bin/tsc`;
1. On `remote`, create a status file (`$HOME/.status-notify` could be any path you choose): `printf "" > $HOME/.status-notify`;
1. On `local`, run the notification server, piping the `remote` status file to its standard input: `node out/ts/main.js < <(ssh remote 'tail -f $HOME/.status-notify')`; in this command, you should replace `remote` with the hostname of the `remote` machine;
1. On `remote`, run a command and report its status code via the status file: `asdf; /path/to/status-notify/gen-notification.sh $? "Status of asdf" "Completed attempt to run asdf"`.
1. Observe the notification on `local`.

## Image acknowledgements

The `success` and `error` images are used according to Creative Commons licenses:

- [File:Xcode test case success green.svg](https://commons.wikimedia.org/wiki/File:Xcode_test_case_success_green.svg) by Sergey Fedotov, licensed for unmodified use under [Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/deed.en).
- [Error icon](https://www.iconfinder.com/icons/381599/error_icon) by Tahsin Tahil, licensed for unmodified use under [Attribution 3.0 Unported (CC BY 3.0)](https://creativecommons.org/licenses/by/3.0/).
