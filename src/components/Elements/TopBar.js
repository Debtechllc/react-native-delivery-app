import React, { Component } from 'react';
import { withTheme } from 'styled-components';
import { HamburgerIcon, BackIcon } from './../icons';
import { AppRegistry, View, Text, Image, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import SearchIcon from './../icons/Search';
import NotificationIcon from './../icons/Notification';
import CartIcon from './../icons/Cart';
import { withNavigation } from 'react-navigation';
import {constants} from './../../utils/constants';
import Back from '../icons/Back';

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    flex: 2,
    padding: 5,
  },
  menuSection: {
    flexDirection: 'row',
    flex: 3
  },
  cartIcon: {
    backgroundColor: '#fff',
    paddingRight: 10
    // flex: 1,
  },
  notificationBadge: {
    backgroundColor: 'red',
    flex: 1,
    borderRadius: 30,
    position: 'absolute',
    height: 20,
    width: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    left: 27,
    top: 5
  },
  cartBadge: {
    backgroundColor: 'red',
    flex: 1,
    borderRadius: 30,
    position: 'absolute',
    height: 20,
    width: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    left: 30,
    top: 5
  },
  badgeCount: {
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 66,
    backgroundColor: '#669927',
  },
})


class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationCount: "0",
      cartCount: "0",
      isTypeOfBack: ""
    };
  }

  componentDidMount(){

  }

  displayMenuIcon() {
    if (this.props.isTypeOfBack == "back") {
        return (<BackIcon onPress={() => this.props.navigation.goBack()} />)
    } else {
        return (<HamburgerIcon onPress={() => this.props.navigation.openDrawer()} /> )
    }
}
  render() {
    //  const { text, onPress, theme } = this.props;

    return (
      <View style={styles.header}>
        <View style={styles.menuSection}>
        {this.displayMenuIcon()}
          <Image
            style={{ width: 100, height: 50 }}
            paddingTop={10}
            source={require('./../../images/logo.png')}
          />
        </View>

      </View>
    );
  }
}

//export default withTheme(TopBar);
export default withNavigation(TopBar);
