**Capacitor-React App**

Welcome to our Capacitor React app! This README will guide you through setting up the project, running the app locally, and deploying it to various devices.

## Setup

1. Clone this repository to your local machine:

```
git clone https://github.com/justinjoyn/payslips.git
```

2. Navigate into the project directory:

```
cd payslips
```

3. Install dependencies:

```
npm install
```

## Local Development

To run the app locally on your development machine:

```
npm start
```

This command will start the development server and open the app in your default web browser.

## Running on Devices

### iOS

To run the app on iOS devices or simulator:
```
npx cap run ios
```
OR
```
npx cap open ios
```

This command will open the project in Xcode. From Xcode, you can choose a simulator or connect your iOS device and run the app.

### Android

To run the app on Android devices or emulator:
```
npx cap run android
```
OR
```
npx cap open android
```

This command will open the project in Android Studio. From Android Studio, you can choose an emulator or connect your Android device and run the app.

## Build

To build the app for production:

```
npm run build
```

This command will create a production build of your app in the `build` directory.

## Capacitor Commands

### Syncing Changes

After making any changes to your web code, you need to sync those changes with the native projects:

```
npx cap sync
```

This command copies the web assets to each native project.

### Updating Capacitor

To update Capacitor to the latest version:

```
npm install @capacitor/core@latest
npx cap update
```

This command updates Capacitor to the latest version and syncs native changes.

For more information on Capacitor commands and configurations, refer to the official [Capacitor documentation](https://capacitorjs.com/docs). 

Happy coding! 🚀