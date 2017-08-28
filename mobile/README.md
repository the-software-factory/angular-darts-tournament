Mobile App
==============

The project runs with ionic version 1 and cordova, so make sure to install those in your system:

```bash
$ npm install -g ionic cordova
```

Please run following commands to install all `dev-dependencies`:

```sh
$ npm install
```

and

```sh
$ bower install
```

Then run `gulp`, this will create a `www` directory that is the one containing the code that ionic will effectively run.

## Run app in browser

Simply run `ionic serve`, this will open your default browser with the app running.

## Run app in mobile device

### Prerequisites

- Install Gradle if you haven't.
- Set your ANDROID_HOME variable to point at your android-sdk directory
 (https://cordova.apache.org/docs/en/latest/guide/platforms/android/), if you install Android Studio as described in
  the official guide you will have the directory in your home at path Android/Sdk.

### Procedure

1) plug your device with USB.
2) run `ionic cordova run android` if your device is an android device (for ios is the same procedure).
3) wait for the app to open in your device

## Issues

### White screen on mobile

It is possible that when you run the app on mobile device you simply get white screen and no error, in this case
open Chrome browser and type `chrome://inspect/` on your address bar and select your device, this will open a browser 
window with debug tools.

### Permission error

At the end of `ionic run` it is possible that you get an error for not having accepted terms of service, in this case
go to your android-sdk directory then navigate to `tools/bin/` and on terminal run `./sdkmanager --licenses`, 
follow the procedure and you will be fine.
