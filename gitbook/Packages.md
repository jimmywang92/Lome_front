# Packages Used


## With Firebase

```json
{
    "name": "react-native-fiber-firebase",
    "version": "1.1.6",
    "private": true,
    "devDependencies": {
        "babel-eslint": "^8.2.1",
        "babel-preset-expo": "^5.0.0",
        "eslint": "^4.9.0",
        "eslint-config-airbnb": "^16.1.0",
        "eslint-plugin-flowtype": "^2.41.0",
        "eslint-plugin-import": "^2.7.0",
        "eslint-plugin-jsx-a11y": "^6.0.2",
        "eslint-plugin-react": "^7.4.0",
        "eslint-plugin-react-native": "^3.2.1",
        "exp": "53.1.0",
        "expo-cli": "^2.6.14",
        "firebase-tools": "^3.16.0",
        "flow-bin": "0.63.1",
        "flow-result-checker": "^0.3.0",
        "jest-expo": "^33.0.0",
        "react-test-renderer": "16.0.0-alpha.12"
    },
    "main": "node_modules/expo/AppEntry.js",
    "scripts": {
        "start": "expo start",
        "android": "expo start --android",
        "ios": "expo start --ios",
        "eject": "expo eject",
        "test": "jest",
        "test:watch": "jest --watch",
        "flow": "flow check --show-all-errors | flow-result-checker",
        "lint": "eslint App.js App.test.js src/",
        "deploy:expo": "exp publish",
        "deploy": "firebase deploy --token \"$FIREBASE_TOKEN\" && yarn deploy:expo"
    },
    "jest": {
        "preset": "jest-expo"
    },
    "dependencies": {
        "@expo/vector-icons": "10.0.1",
        "autobind-decorator": "^1.4.0",
        "crypto-js": "^3.1.9-1",
        "expo": "^33.0.0",
        "expo-asset": "^5.0.1",
        "expo-blur": "~5.0.1",
        "expo-constants": "~5.0.1",
        "expo-file-system": "~5.0.1",
        "expo-font": "~5.0.1",
        "expo-linear-gradient": "~5.0.1",
        "firebase": "5.8.0",
        "jest-junit-reporter": "^1.1.0",
        "lodash": "^4.17.4",
        "mobx": "^3.4.1",
        "mobx-react": "^4.3.5",
        "moment": "^2.18.1",
        "native-base": "2.12.1",
        "react": "16.8.3",
        "react-native": "https://github.com/expo/react-native/archive/sdk-33.0.0.tar.gz",
        "react-native-swiper": "^1.5.13",
        "react-navigation": "^3.11.0"
    }
}
```

## Without Firebase

```json
{
    "name": "react-native-fiber",
    "version": "1.1.6",
    "private": true,
    "devDependencies": {
        "babel-eslint": "^8.2.1",
        "babel-preset-expo": "^5.0.0",
        "eslint": "^4.9.0",
        "eslint-config-airbnb": "^16.1.0",
        "eslint-plugin-flowtype": "^2.41.0",
        "eslint-plugin-import": "^2.7.0",
        "eslint-plugin-jsx-a11y": "^6.0.2",
        "eslint-plugin-react": "^7.4.0",
        "eslint-plugin-react-native": "^3.2.1",
        "exp": "56.0.0",
        "expo-cli": "^2.6.14",
        "flow-bin": "0.63.1",
        "flow-result-checker": "^0.3.0",
        "jest-expo": "^33.0.0",
        "react-test-renderer": "16.0.0-alpha.12"
    },
    "main": "node_modules/expo/AppEntry.js",
    "scripts": {
        "start": "expo start",
        "eject": "expo eject",
        "android": "expo android",
        "ios": "expo ios",
        "test": "jest",
        "test:watch": "jest--watch",
        "flow": "flow check --show-all-errors | flow-result-checker",
        "lint": "eslint App.js App.test.js src/",
        "deploy": "exp publish"
    },
    "jest": {
        "preset": "jest-expo"
    },
    "dependencies": {
        "@expo/vector-icons": "10.0.1",
        "autobind-decorator": "^1.4.0",
        "crypto-js": "^3.1.9-1",
        "expo": "^33.0.0",
        "expo-asset": "^5.0.1",
        "expo-blur": "~5.0.1",
        "expo-camera": "~5.0.1",
        "expo-constants": "~5.0.1",
        "expo-file-system": "~5.0.1",
        "expo-font": "~5.0.1",
        "expo-image-manipulator": "~5.0.1",
        "expo-linear-gradient": "~5.0.1",
        "expo-permissions": "~5.0.1",
        "jest-junit-reporter": "^1.1.0",
        "lodash": "^4.17.4",
        "moment": "^2.18.1",
        "native-base": "2.12.1",
        "react": "16.8.3",
        "react-native": "https://github.com/expo/react-native/archive/sdk-33.0.0.tar.gz",
        "react-native-svg": "~9.4.0",
        "react-native-swiper": "^1.5.13",
        "react-navigation": "^3.11.0"
    }
}
```