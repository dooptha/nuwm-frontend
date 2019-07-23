# nuwm-frontend
This is React Native Android/IOS application designed for students by students of NATIONAL UNIVERSITY OF WATER AND ENVIRONMENTAL ENGINEERING.

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)


### Build

###### IOS

--

###### Android
>F

### Debugging

>JS Debugger

Press `⌘ + D` / `Ctrl + D` on iOS simulator and `⌘ + M` / `Ctrl + M` on Android emulator to open JS Debugger.

###### IOS

--

###### Android
After RN version `>=0.60`, there is automatic `:8081` port forwarding for Metro Project Bundler, 
but for our backend you should forward additional port by default it's `:3000`

```console
$ adb forward tcp:3000 tcp:3000
```

 **IMPORTANT:** For connecting to a local server from Emulator device use `http://10.0.2.2:3000` <a href="https://developer.android.com/studio/run/emulator-networking" target="_blank">_(More info)_</a>