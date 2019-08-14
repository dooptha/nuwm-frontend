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