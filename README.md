# Status Notify

Tiny cross-platform desktop notification scripts implemented in TypeScript (targeting Node/NPM) and Bash.

## Example use case

Suppose there are long-running tasks on `remote` machine, and you want to be notified when the complete on `local` desktop.

The following will work with UNIX-like `remote` and `local` machines using a `bash` shell, and needs to be adapted on other platforms.

1. Check out this project on both machines;
1. Build the TypeScript part of the project on `local`: `npm install && node_modules/.bin/tsc`;
1. On `remote`, create a status file (`$HOME/.status-notify` could be any path you choose): `printf "" > $HOME/.status-notify`;
1. On `local`, run the notification server, piping the `remote` status file to its standard input: `ssh remote 'tail -f $HOME/.status-notify' | npm start`; in this command, you should replace `remote` with the hostname of the `remote` machine;
1. On `remote`, run a command and report its status code via the status file: `asdf; /path/to/status-notify/gen-notification.sh $? "Status of asdf" "Completed attempt to run asdf" >> $HOME/.status-notify`;
1. Observe the notification on `local`; the notification will nag every `timeout_time + 10 seconds` until the user acts on it to clear it.

You may wish to wrap the "run the notification server" and the "run a command and report its status" steps in a less verbose context such as a shell alias, function, or script.

## Acknowledgements

The `success` and `error` images are used according to Creative Commons licenses:

- [File:Xcode test case success green.svg](https://commons.wikimedia.org/wiki/File:Xcode_test_case_success_green.svg) by Sergey Fedotov, licensed for unmodified use under [Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/deed.en).
- [Error icon](https://www.iconfinder.com/icons/381599/error_icon) by Tahsin Tahil, licensed for unmodified use under [Attribution 3.0 Unported (CC BY 3.0)](https://creativecommons.org/licenses/by/3.0/).

The `success` and `error` sounds are licensed according ot Creative Commons licenses:

- [Soft-Notifications - Bell - Ding-Dong](https://openverse.org/audio/c66607e4-8323-4d81-afd6-c0dbf06686e3) by LegitCheese, licensed for unmodified use under [CC0 1.0 Universal (CC0 1.0) Public Domain Dedication](https://creativecommons.org/publicdomain/zero/1.0/).
- [Warning UI](https://openverse.org/audio/eb22504e-6178-430b-b927-21f5d685420e) by EminYILDIRIM, licensed for unmodified use under [Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
