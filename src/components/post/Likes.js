// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, TouchableWithoutFeedback, View, Animated, Easing} from "react-native";
import {Feather as Icon} from "@expo/vector-icons";

import Odometer from "./Odometer";

import {Theme} from "../Theme";
import APIStore from "../APIStore";

type LikesProps = {
    color: string,
    likes: string[],
    post: string
};

type LikesState = {
    likes: string[],
    animation: Animated.Value
};

export default class Likes extends React.Component<LikesProps, LikesState> {

    counter: Odometer;

    state = {
        animation: new Animated.Value(0),
        likes: []
    };

    static getDerivedStateFromProps({ likes }: LikesProps): { likes: string[] } {
        return { likes };
    }

    @autobind
    toggle() {
        const {post} = this.props;
        const uid = APIStore.me();
        const likes = APIStore.like(post, uid);
        this.setState({ likes });
        if (likes.indexOf(uid) !== -1) {
            this.counter.increment();
            const animation = new Animated.Value(0);
            this.setState({ animation });
            Animated.timing(
                animation,
                {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.ease
                }
            ).start();
        } else {
            this.counter.decrement();
        }
    }

    render(): React.Node {
        const {color} = this.props;
        const {likes, animation} = this.state;
        const uid = APIStore.me();
        const computedStyle = [styles.icon];
        if (animation) {
            const fontSize = animation.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [iconSize, bigIconSize, iconSize]
            });
            computedStyle.push({ fontSize });
        }
        if (likes.indexOf(uid) !== -1) {
            computedStyle.push(styles.likedIcon);
        }
        return (
            <TouchableWithoutFeedback onPress={this.toggle}>
                <View style={styles.container}>
                    <View style={styles.iconContainer}>
                        <AnimatedIcon name="thumbs-up" color={color} style={computedStyle} />
                    </View>
                    <Odometer ref={ref => (ref ? this.counter = ref : undefined)} count={likes.length} {...{ color }} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const iconSize = 18;
const bigIconSize = 24;
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center"
    },
    iconContainer: {
        width: bigIconSize,
        height: bigIconSize,
        justifyContent: "center"
    },
    icon: {
        fontSize: iconSize
    },
    likedIcon: {
        color: Theme.palette.primary
    }
});
