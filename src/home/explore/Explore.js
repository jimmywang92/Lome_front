// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import moment from "moment";
import {
    FlatList, StyleSheet, View, Animated, SafeAreaView, RefreshControl, Platform, TouchableWithoutFeedback
} from "react-native";
import Constants from "expo-constants";

import {Text, APIStore, Theme, Avatar, RefreshIndicator, Post} from "../../components";

import type {ScreenProps} from "../../components/Types";
import type {Post as PostModel} from "../../components/APIStore";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

type ExploreState = {
    scrollAnimation: Animated.Value,
    refreshing: boolean,
    posts: PostModel[]
};

export default class Explore extends React.Component<ScreenProps<>, ExploreState> {

    state = {
        scrollAnimation: new Animated.Value(0),
        refreshing: false,
        posts: APIStore.posts()
    }

    @autobind
    profile() {
        this.props.navigation.navigate("Profile");
    }

    @autobind
    onRefresh() {
        this.setState({ refreshing: true });
        setTimeout(() => this.setState({ refreshing: false }), 3000);
    }

    render(): React.Node {
        const {onRefresh} = this;
        const {navigation} = this.props;
        const {scrollAnimation, refreshing, posts} = this.state;
        const profile = APIStore.profile(APIStore.me());
        const start = 30;
        const opacity = scrollAnimation.interpolate({
            inputRange: [start, 60],
            outputRange: [1, 0]
        });
        const translateY = scrollAnimation.interpolate({
            inputRange: [start, 60],
            outputRange: [0, -60],
            extrapolate: "clamp"
        });
        const fontSize = scrollAnimation.interpolate({
            inputRange: [start, 60],
            outputRange: [36, 24],
            extrapolate: "clamp"
        });
        const height = scrollAnimation.interpolate({
            inputRange: [start, 60],
            outputRange: Platform.OS === "android" ? [70, 70] : [100, 60],
            extrapolate: "clamp"
        });
        const marginTop = scrollAnimation.interpolate({
            inputRange: [start, 60],
            outputRange: [24, 0],
            extrapolate: "clamp"
        });
        const shadowOpacity = scrollAnimation.interpolate({
            inputRange: [start, 60],
            outputRange: [0, 0.25],
            extrapolate: "clamp"
        });
        return (
            <View style={styles.container}>
                <RefreshIndicator
                    style={styles.RefreshIndicator}
                    {...{refreshing}}
                />
                <AnimatedSafeAreaView style={[styles.header, { shadowOpacity }]}>
                    <Animated.View style={[styles.innerHeader, { height }]}>
                        <View>
                            <AnimatedText
                                type="large"
                                style={{ position: "absolute", top: 0, opacity, transform: [{ translateY }] }}
                            >
                            New posts
                            </AnimatedText>
                            <AnimatedText
                                type="header2"
                                style={{ fontSize, marginTop }}
                            >
                                {moment().format("dddd")}
                            </AnimatedText>
                        </View>
                        <TouchableWithoutFeedback onPress={this.profile}>
                            <View>
                                <Avatar {...profile.picture} />
                            </View>
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </AnimatedSafeAreaView>
                <AnimatedFlatList
                    contentContainerStyle={{ paddingTop: 12 }}
                    showsVerticalScrollIndicator={false}
                    style={styles.list}
                    data={posts}
                    keyExtractor={post => post.id}
                    renderItem={({ item }) => <Post post={item} {...{navigation}} />}
                    scrollEventThrottle={1}
                    onScroll={Animated.event(
                        [{
                            nativeEvent: {
                                contentOffset: {
                                    y: scrollAnimation
                                }
                            }
                        }],
                        {
                            useNativeDriver: false
                        }
                    )}
                    refreshControl={((Platform.OS === "ios" && (
                        <RefreshControl
                            tintColor="transparent"
                            colors={["transparent"]}
                            style={{ backgroundColor: "transparent" }}
                            {...{onRefresh, refreshing}}
                        />
                    )) || undefined)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    RefreshIndicator: {
        ...StyleSheet.absoluteFillObject,
        paddingTop: Constants.statusBarHeight + 100 + Theme.spacing.base
    },
    header: {
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 8,
        zIndex: 10000
    },
    innerHeader: {
        marginHorizontal: Theme.spacing.base,
        marginVertical: Theme.spacing.tiny,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    list: {
        paddingHorizontal: Theme.spacing.small
    }
});
