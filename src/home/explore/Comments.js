// @flow
import autobind from "autobind-decorator";
import moment from "moment";
import * as React from "react";
import {
    StyleSheet, FlatList, KeyboardAvoidingView, TextInput, View, Platform, TouchableOpacity
} from "react-native";

import CommentComp from "./Comment";

import {Text, NavHeader, APIStore, Theme} from "../../components";
import type {ScreenParams} from "../../components/Types";
import type {Comment} from "../../components/APIStore";

type CommentsState = {
    comments: Comment[],
    text: string
};

export default class Comments extends React.Component<ScreenParams<{ post: string }>, CommentsState> {

    state = {
        text: "",
        comments: []
    };

    componentDidMount() {
        const {post} = this.props.navigation.state.params;
        const comments = APIStore.comments(post);
        this.setState({ comments, text: "" });
    }

    @autobind
    send() {
        const {post} = this.props.navigation.state.params;
        const {text} = this.state;
        const comments = this.state.comments.slice();
        const uid = APIStore.me();
        const comment = {
            text,
            id: Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
            uid,
            timestamp: parseInt(moment().format("X"), 10)
        };
        if (text.trim() === "") {
            return;
        }
        comments.unshift(comment);
        this.setState({ comments, text: "" });
        APIStore.addComment(post, comment);
    }

    @autobind
    onChangeText(text: string) {
        this.setState({ text });
    }

    @autobind
    backFn() {
        this.props.navigation.pop();
    }

    render(): React.Node {
        const {onChangeText, backFn} = this;
        const {navigation} = this.props;
        const {comments, text} = this.state;
        return (
            <View style={styles.container}>
                <NavHeader title="Comments" back {...{navigation, backFn}} />
                <FlatList
                    inverted
                    data={comments}
                    keyExtractor={message => message.id}
                    renderItem={({ item }) => <CommentComp key={item.id} comment={item} />}
                />
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View style={styles.footer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Write a comment"
                            value={text}
                            autoFocus
                            returnKeyType="send"
                            onSubmitEditing={this.send}
                            underlineColorAndroid="transparent"
                            {...{onChangeText}}
                        />
                        <TouchableOpacity primary transparent onPress={this.send}>
                            <Text style={styles.btnText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    footer: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.14,
        shadowRadius: 6,
        borderTopWidth: Platform.OS === "ios" ? 0 : 1,
        borderColor: Theme.palette.borderColor,
        paddingLeft: Theme.spacing.small,
        paddingRight: Theme.spacing.small,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white"
    },
    input: {
        height: Theme.typography.regular.lineHeight + (Theme.spacing.base * 2),
        flex: 1
    },
    btnText: {
        color: Theme.palette.primary
    }
});
