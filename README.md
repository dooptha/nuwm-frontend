# NUWM Frontend
This is open source React Native application designed for students by students of the [NATIONAL UNIVERSITY OF WATER AND ENVIRONMENTAL ENGINEERING](http://en.nuwm.edu.ua/).

[![Build Status](https://travis-ci.com/dooptha/nuwm-frontend.svg?branch=develop)](https://travis-ci.com/dooptha/nuwm-frontend)
[![Maintainability](https://api.codeclimate.com/v1/badges/470fde4b1b8945fba5f0/maintainability)](https://codeclimate.com/github/dooptha/nuwm-frontend/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/470fde4b1b8945fba5f0/test_coverage)](https://codeclimate.com/github/dooptha/nuwm-frontend/test_coverage)
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

## Dependencies
 * Node.js _(v11.14.0)_ and NPM _(v6.7.0)_
 * XCode _(v10.3)_

### Build

###### IOS

>TBD

###### Android
>RIP

To build *.apk use this command:
```console
$ cd android && ./gradlew assembleRelease
```

### Configuration

You can configure app by using configuration files in `/config` directory.
In development environment `production.js` will be overwritten by `development.js`.

Also you can create `override.js` file in `/config` directory.
It will override configuration in `development.js`.

`override.js` is ignored by git, so it is perfect for local changes, like **CUSTOM_INITIAL_ROUTE**, and you won't
accidentally push your custom config to remote repository.


In production environment `override.js` and `development.js` will be ignored.

If you have any error related to `override.js`, restarting metro bundler, or creating `override.js` file (if you haven't done this yet) can solve that error.


### Debugging

RN have a lot of tools for development purposes, more info you can find [_here_](https://facebook.github.io/react-native/docs/debugging).

Below, are some basic things.

##### Developer Menu
###### IOS

- **Physical:** Shake your device
- **Simulator:** Press `⌘ + D`
- **Additional:** All is working out of the box

###### Android

- **Physical:**
```console
$ adb shell input keyevent 82
```
- **Simulator:** Press `⌘ + M` / `Ctrl + M`

- **Additional:**

After RN version `>=0.60`, there is automatic `:8081` port forwarding for Metro Project Bundler _(sometimes it doesn't work :sweat_smile:)_,
but for our backend you should forward additional port by default it's `:3000`

```console
$ adb -s <device name from "adb devices"> reverse tcp:3000 tcp:3000
```

 **IMPORTANT:** For connecting to a local server from Emulator device use `http://10.0.2.2:3000` <a href="https://developer.android.com/studio/run/emulator-networking" target="_blank">_(More info)_</a>

___
