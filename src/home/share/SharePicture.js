// @flow
import moment from "moment";
import autobind from "autobind-decorator";
import * as React from "react";
import {
    StyleSheet, TextInput, Image, Dimensions, KeyboardAvoidingView, ScrollView, View
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";

import {Container, NavHeader, Button, Theme, APIStore, RefreshIndicator} from "../../components";

import type {Picture} from "./Picture";
import type {ScreenParams} from "../../components/Types";

const id = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

type SharePictureState = {
    loading: boolean,
    caption: string
};

const getCrop = (width: number, height: number) => ({
    crop: {
        originX: 0,
        originY: 0,
        width,
        height: height / 2
    }
});

export default class SharePicture extends React.Component<ScreenParams<Picture>, SharePictureState> {

    state = {
        loading: false,
        caption: ""
    };

    /*
    readAsStringAsync(filepath, 'base64')
    */
    static async buildPreview({ uri, width, height }: Picture): Promise<string> {
        const crop = getCrop(width, height);
        const { uri: newURI } = await ImageManipulator.manipulateAsync(uri, [crop]);
        const data = await FileSystem.readAsStringAsync(newURI, { encoding: FileSystem.EncodingType.Base64 });
        return `data:image/jpeg;base64,${data}`;
    }

    @autobind
    async onPress(): Promise<void> {
        const {navigation} = this.props;
        const {caption} = this.state;
        const picture = navigation.state.params;
        this.setState({ loading: true });
        const preview = await SharePicture.buildPreview(picture);
        const uid = APIStore.me();
        APIStore.addPost({
            id: id(),
            uid,
            timestamp: parseInt(moment().format("X"), 10),
            likes: [],
            comments: 0,
            text: caption,
            picture: {
                uri: picture.uri,
                preview
            }
        });
        navigation.pop();
        navigation.navigate("Explore");
    }

    @autobind
    onChangeText(caption: string) {
        this.setState({ caption });
    }

    render(): React.Node {
        const {onPress, onChangeText} = this;
        const {navigation} = this.props;
        const {loading} = this.state;
        const source = navigation.state.params;
        if (loading) {
            return (
                <View style={styles.loading}>
                    <RefreshIndicator />
                </View>
            );
        }
        return (
            <Container>
                <ScrollView>
                    <KeyboardAvoidingView behavior="position">
                        <NavHeader title="Share" {...{navigation}} back />
                        <Image {...{ source }} style={styles.picture} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Write Caption"
                            underlineColorAndroid="transparent"
                            onSubmitEditing={onPress}
                            {...{ onChangeText }}
                        />
                        <Button label="Share Picture" {...{onPress}} style={styles.btn} primary full />
                    </KeyboardAvoidingView>
                </ScrollView>
            </Container>
        );
    }
}

const {width} = Dimensions.get("window");
const styles = StyleSheet.create({
    loading: {
        flexGrow: 1,
        justifyContent: "center"
    },
    picture: {
        width,
        height: width
    },
    textInput: {
        flexGrow: 1,
        padding: Theme.spacing.base,
        ...Theme.typography.regular
    },
    btn: {
        margin: Theme.spacing.base
    }
});
