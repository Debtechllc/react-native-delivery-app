import React, { Component } from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components/native';
import { HamburgerIcon, BackIcon } from './../components/icons';
import { AppRegistry, View, Text, Image, SafeAreaView } from 'react-native'
import { StyleSheet } from 'react-native'
import SearchIcon from './../components/icons/Search';
import NotificationIcon from './../components/icons/Notification';
import CartIcon from './../components/icons/Cart';
import { withNavigation } from 'react-navigation';
import TopBar from './../components/Elements/TopBar';
import { connect } from 'react-redux';

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

class Myaccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentWillMount() {
    if (!this.props.curState.Login_Reducer.user_id) {
      this.props.navigation.navigate('App');
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Myaccount',
    drawerTitle: 'Myaccount',
    drawerIcon: ({ tintcolor }) => (
      <Image source={require('./../images/login.png')}
        style={{ height: 25, width: 25 }} />
    ),
  });

  render() {
    //  const { text, onPress, theme } = this.props;
    
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ContainerView style={{ flex: 1 }}>
          <TopBar notificationCount="9" cartCount="10" isTypeOfBack="back"  ></TopBar>
          <View style={{flex:1, backgroundColor:'white'}}></View>
        </ContainerView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  curState: state
});


export default connect(mapStateToProps, {
  
})(withNavigation(Myaccount));