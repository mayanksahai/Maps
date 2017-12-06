/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ClientOrdersList from './app/screens/restaurant/ClientOrdersList';
import {Tabs} from './app/screens/config';

export default class Tasks extends Component {
  render() {
    return (
      <Tabs />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

AppRegistry.registerComponent('Tasks', () => Tasks);
