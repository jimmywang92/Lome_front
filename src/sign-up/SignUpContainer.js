// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {View, StyleSheet, Dimensions} from "react-native";
import {Content} from "native-base";

import {Text, Container, Button, Theme} from "../components";
import type {NavigationProps} from "../components/Types";

type SignUpContainerProps = NavigationProps<*> & {
    title: string,
    subtitle: string,
    next: () => void,
    children?: React.ChildrenArray<React.Element<*>>,
    nextLabel: string,
    first?: boolean
};

export default class SignUpContainer extends React.Component<SignUpContainerProps> {

    static defaultProps = {
        nextLabel: "Next",
        first: false
    };

    @autobind
    back() {
        const {navigation, first} = this.props;
        if (first) {
            navigation.navigate("Welcome");
        } else {
            this.props.navigation.goBack();
        }
    }

    render(): React.Node {
        const {title, subtitle, next, children, nextLabel} = this.props;
        return (
            <Container gutter={1}>
                <Content style={styles.content}>
                    <View style={styles.innerContent}>
                        <Text type="large">{subtitle}</Text>
                        <Text type="header2" gutterBottom>{title}</Text>
                        <View>{children}</View>
                        <Button label={nextLabel} onPress={next} full primary />
                        <Button label="Back" onPress={this.back} full />
                    </View>
                </Content>
            </Container>
        );
    }
}

const {height} = Dimensions.get("window");
const styles = StyleSheet.create({
    content: {
        padding: Theme.spacing.base
    },
    innerContent: {
        height: height - (Theme.spacing.base * 4),
        justifyContent: "center"
    }
});
