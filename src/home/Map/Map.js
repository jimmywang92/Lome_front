// @flow
import React from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';

import { MapView, Permissions } from 'expo';
import type {ScreenProps} from "../../components/Types";

export class Map extends React.Component<ScreenProps<>> {

  render(){
    const {navigation} = this.props;
    return(
      <MapView
        style={{flex:1}}
      >

      </MapView>
    );
  }
}
