/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Switch, ListItem, Button, Right, Body, Left, Icon } from 'native-base';

export default class HomeAutomation extends Component {
  constructor() {
    super();
    var self = this;
    this.state = {
      switches: []
    }
    this.getAllSwitches();
    setInterval(function(){
      self.getAllSwitches();
    }, 3000);
  }
  getAllSwitches() {
    fetch("http://testsmarthome.azurewebsites.net/api/status/getswitches")
      .then(res => {
        return res.json();
      }).then(res => {
        this.setState({ switches: res })
      });
  }
  toggleSwitch(sw) {
    fetch("http://testsmarthome.azurewebsites.net/api/status/ToggleSwitch", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sw)
    });
  }
  changeSwitch(sw, value) {
    var switches = this.state.switches;
    var sw = switches.find((s) => s.switchId == sw.switchId);
    sw.isOn = value;
    this.setState({ switches: switches })
    this.toggleSwitch(sw);

  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Home Automation!
        </Text>
        {this.state.switches.map((sw, i) => {
          return (
            <ListItem key={i}>
              <Body>
                <Text>{sw.switchName}</Text>
              </Body>
              <Right>
                <Switch
                  onValueChange={(value) => this.changeSwitch(sw, value)}
                  value={sw.isOn}
                  onTintColor="#50B948" />
              </Right>
            </ListItem>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('HomeAutomation', () => HomeAutomation);
