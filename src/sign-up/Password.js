// @flow
import autobind from "autobind-decorator";
import * as React from "react";

import {TextField} from "../components";
import type {NavigationProps} from "../components/Types";

import SignUpContainer from "./SignUpContainer";

export default class Password extends React.Component<NavigationProps<*>> {

    @autobind
    next() {
        const {navigation} = this.props;
        navigation.navigate("Home");
    }

    render(): React.Node {
        const {navigation} = this.props;
        return (
            <SignUpContainer
                title="Your Password"
                subtitle="Stay Safe"
                nextLabel="Sign-Up"
                next={this.next}
                {...{ navigation }}
            >
                <TextField
                    placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="go"
                    onSubmitEditing={this.next}
                    secureTextEntry
                    contrast
                />
            </SignUpContainer>
        );
    }
}
