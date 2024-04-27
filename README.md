# React Native Application

## Introduction

This is a React Native application that [briefly describe the purpose or features of your app].

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine. You can download and install them from [here](https://nodejs.org/).
- Expo CLI. Install it globally using npm:
  ```bash
  npm install -g expo-cli
  ```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SujeethSR/Connect_app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Connect_app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Running the Application

#### Using Expo

- Start the Expo development server:

  ```bash
  npx expo start
  ```

- Open the Expo Go app on your iOS or Android device.
- Scan the QR code with the Expo Go app to run the app on your device.

#### Using React Native CLI

- **iOS**: Run the following command to start the iOS simulator:

  ```bash
  npx react-native run-ios
  ```

- **Android**: Make sure you have an Android emulator running or a device connected via USB debugging. Then run:

  ```bash
  npx react-native run-android
  ```

### Development

- Make changes to the code in the `src` directory.
- The app will automatically reload if you make changes to the code.

# Folder Structure

This project is structured to facilitate ease of navigation and development. Below is a brief overview of the primary directories and files:

- **`.expo/`**: Configuration files for the Expo SDK.
- **`.idea/`**: IDE-specific configurations for JetBrains products.
- **`.vscode/`**: Configuration files for Visual Studio Code.
- **`android/`**: Native Android project files.
- **`app/`**: Custom application code.
- **`assets/`**: Static assets (images, fonts, etc.).
- **`components/`**: Reusable React components.
- **`constants/`**: Constant values used throughout the app.
- **`context/`**: Context API files for state management.
- **`firebase/`**: Firebase configuration and utilities.
- **`node_modules/`**: Installed npm package dependencies.
- **`.gitignore`**: Specifies intentionally untracked files to ignore.
- **`app.json`**: Metadata about the app.
- **`babel.config.js`**: Babel compiler configuration.
- **`eas.json`**: Configuration for EAS Build.
- **`LICENSE.md`**: The license agreement for the project.
- **`package-lock.json`**: Automatically generated file for any operations where npm modifies the node_modules tree or package.json.
- **`package.json`**: A manifest file for defining project properties and dependencies.
- **`README.md`**: Documentation about the project.
- **`yarn-error.log`**: Log file for yarn errors (usually included in `.gitignore`).
- **`yarn.lock`**: Yarn dependency lock file.

Each folder is crafted to contain specific types of code:

- The `android` and `ios` folders contain platform-specific native code.
- The `src` folder houses all the React Native JavaScript code, organized into subdirectories like `components`, `constants`, and `context`.
- Configuration files such as `babel.config.js` and `app.json` are placed at the root, setting up the essentials for our project.
- Dependency management is handled through `npm`, with `node_modules` storing all the necessary packages.

We maintain a clean repository by utilizing `.gitignore` to exclude temporary files and dependencies from our git history.

# EAS Build Configuration

EAS builds are configured in `eas.json`. This file defines your build profiles for different environments (e.g., development, staging, production).

# Create your first build

Check the Document [Expo.dev](https://docs.expo.dev/build/introduction/)


## Install the latest EAS CLI

```
npm install -g eas-cli
```

## Log in to your Expo account

To start a build, run:

```
eas login
```

## Configure the project

```
eas build:configure
```

## Run a build 

## Android

```
eas build --platform android
```

## iOS

```
eas build --platform ios
```

## All Platforms

```
eas build --platform all
```
## License

This project is licensed under the [MIT License](LICENSE.md).
