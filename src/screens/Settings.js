import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { FormattedProvider, FormattedMessage } from 'react-native-globalize';
import { changeLanguage } from '../actions'
import { Button } from '../components';
import messages from '../Messages';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const TitleText = styled.Text`
  fontSize: 30;
  color: ${props => props.theme.WHITE};
`;

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-settings" size={23} color = {tintColor}/>
   ),
   title: 'Settings',
   drawerTitle: 'Settings',
   drawerIcon: ({ tintcolor }) => (
    <Image source={require('./../images/setting.png')}
    style={{height: 25,width: 25}}/>
       //<Icon name='ios-menu' size={30} />
   ),
  };
  render() {
    console.log(this.props.curState)
    let change_lang = this.props.curState.Language.language && this.props.curState.Language.language == 'en' ? 'es' : 'en';
    return (
			<FormattedProvider locale={this.props.curState.Language.language} messages={messages}>
        <ContainerView>
          <TitleText><FormattedMessage
            message="Settings"
          /></TitleText>
				  <Button text="Change language to es" onPress={() => {this.props.changeLanguage(change_lang)}} />
        </ContainerView>
			</FormattedProvider>
    );
  }
}

const mapStateToProps = (state) => ({
	curState:state
});

export default connect(mapStateToProps, {
	changeLanguage,
})(SettingsScreen);
