// @flow
import * as React from "react";
import {StatusBar, Platform} from "react-native";
import {StyleProvider} from "native-base";
import {
    createAppContainer, createStackNavigator, createBottomTabNavigator, createSwitchNavigator
} from "react-navigation";
import {AppLoading} from "expo";
import * as Font from "expo-font";
import { Feather } from "@expo/vector-icons";

import {Images} from "./src/components";
import {Welcome} from "./src/welcome";
import {Walkthrough} from "./src/walkthrough";
import {SignUpName, SignUpEmail, SignUpPassword, Login} from "./src/sign-up";
import {Profile, Explore, Share, SharePicture, HomeTab, Comments} from "./src/home";
import {Map} from "./src/home/Map/Map"
import getTheme from "./native-base-theme/components";
import variables from "./native-base-theme/variables/commonColor";

// $FlowFixMe
const SFProTextMedium = require("./assets/fonts/SF-Pro-Text-Medium.otf");
// $FlowFixMe
const SFProTextHeavy = require("./assets/fonts/SF-Pro-Text-Heavy.otf");
// $FlowFixMe
const SFProTextBold = require("./assets/fonts/SF-Pro-Text-Bold.otf");
// $FlowFixMe
const SFProTextSemibold = require("./assets/fonts/SF-Pro-Text-Semibold.otf");
// $FlowFixMe
const SFProTextRegular = require("./assets/fonts/SF-Pro-Text-Regular.otf");
// $FlowFixMe
const SFProTextLight = require("./assets/fonts/SF-Pro-Text-Light.otf");

interface AppState {
    ready: boolean
}

export default class App extends React.Component<{}, AppState> {

    state: AppState = {
        ready: false
    };

    componentDidMount() {
        StatusBar.setBarStyle("dark-content");
        if (Platform.OS === "android") {
            StatusBar.setBackgroundColor("white");
        }
        this.loadStaticResources();
    }

    async loadStaticResources(): Promise<void> {
        try {
            const images = Images.downloadAsync();
            const fonts = Font.loadAsync({
                "SFProText-Medium": SFProTextMedium,
                "SFProText-Heavy": SFProTextHeavy,
                "SFProText-Bold": SFProTextBold,
                "SFProText-Semibold": SFProTextSemibold,
                "SFProText-Regular": SFProTextRegular,
                "SFProText-Light": SFProTextLight
            });
            const icons = Font.loadAsync(Feather.font);
            await Promise.all([...images, fonts, icons]);
            this.setState({ ready: true });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    }

    render(): React.Node {
        const {ready} = this.state;
        return (
            <StyleProvider style={getTheme(variables)}>
                {
                    ready ?
                        <AppNavigator onNavigationStateChange={() => undefined} />
                        :
                        <AppLoading />
                }
            </StyleProvider>
        );
    }
}

const StackNavigatorOptions = {
    headerMode: "none",
    cardStyle: {
        backgroundColor: "white"
    }
};

const ExploreNavigator = createStackNavigator({
    Explore: { screen: Explore },
    Comments: { screen: Comments }
}, StackNavigatorOptions);

const ProfileNavigator = createStackNavigator({
    Profile: { screen: Profile }
}, StackNavigatorOptions);

const ShareNavigator = createStackNavigator({
    Share: { screen: Share },
    SharePicture: { screen: SharePicture }
}, StackNavigatorOptions);

const MapNavigator = createStackNavigator({
    Map: { screen: Map }
}, StackNavigatorOptions);

const Home = createBottomTabNavigator({
    Explore: { screen: ExploreNavigator },
    Share: { screen: ShareNavigator },
    Profile: { screen: ProfileNavigator },
    Map: { screen: Map }
}, {
    animationEnabled: true,
    tabBarComponent: HomeTab,
    tabBarPosition: "bottom"
});

const SignUpNavigator = createStackNavigator({
    SignUp: { screen: SignUpName },
    SignUpEmail: { screen: SignUpEmail },
    SignUpPassword: { screen: SignUpPassword }
}, StackNavigatorOptions);

const AppNavigator = createAppContainer(createSwitchNavigator({
    Welcome: { screen: Welcome },
    Walkthrough: { screen: Walkthrough },
    Login: { screen: Login },
    SignUp: { screen: SignUpNavigator },
    Home: { screen: Home }
}, StackNavigatorOptions));

export {AppNavigator};
