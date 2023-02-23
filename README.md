# Status Notify

Tiny cross-platform desktop notification scripts implemented in TypeScript (targeting Node/NPM) and Bash.

## Example use case

Suppose there are long-running tasks on `remote` machine, and you want to be notified when the complete on `local` desktop.

The following will work with UNIX-like `remote` and `local` machines using a `bash` shell, and needs to be adapted on other platforms.

1. Check out this project on both machines;
1. Build the TypeScript part of the project on `local`: `npm install && node_modules/.bin/tsc`;
1. On `remote`, source the `.bashrc` script that contains the `status-notify` bash function: `source status-notify.bashrc` (really, something like this should be added to `remote`'s `~/.bashrc` file to source the script in every shell during setup);
1. On `local`, run the notification server, piping the `remote` a remote status file to its standard input: `watch-remote-status.sh remote`; in this command, you should replace the shell script argument, `remote`, with the hostname of the `remote` machine;
1. On `remote`, run a command and report its status code via the status file: `asdf; nag-status`; this will hang, waiting for one character of input;
1. Observe the notification on `local`; the notification will nag every 10 seconds for an hour, or until you enter one character of input in the `remote` shell that is running the `nag-status` bash function.

If you are interested in additional helper functions or want to port this flow to another platform, read `status-notify.bashrc` and `src/main.ts` for pointers on how the `local`/`remote` dialogue works.

## Acknowledgements

The `success` and `error` images are used according to Creative Commons licenses:

- [File:Xcode test case success green.svg](https://commons.wikimedia.org/wiki/File:Xcode_test_case_success_green.svg) by Sergey Fedotov, licensed for unmodified use under [Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/deed.en).
- [Error icon](https://www.iconfinder.com/icons/381599/error_icon) by Tahsin Tahil, licensed for unmodified use under [Attribution 3.0 Unported (CC BY 3.0)](https://creativecommons.org/licenses/by/3.0/).

The `success` and `error` sounds are licensed according ot Creative Commons licenses:

- [Soft-Notifications - Bell - Ding-Dong](https://openverse.org/audio/b46209de-f7ff-4514-b228-c36aa3b14c16) by ironcross32, licensed for unmodified use under [CC0 1.0 Universal (CC0 1.0) Public Domain Dedication](https://creativecommons.org/publicdomain/zero/1.0/).
- [Sci-Fi Alert 07.wav](https://openverse.org/audio/f79594de-5b12-4783-a1c1-a2986a6621a8) by Glitchedtones, licensed for unmodified use under [CC0 1.0 Universal (CC0 1.0) Public Domain Dedication](https://creativecommons.org/publicdomain/zero/1.0/).
