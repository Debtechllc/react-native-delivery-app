import React, { Component } from 'react';
import styled from 'styled-components/native';
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

class FavoritesScreen extends Component {
  static navigationOptions = {
    title: 'Favorites',
    tabBarIcon: ({tintColor}) => (
      <Icon name ='ios-heart' size={23} color={tintColor}/>
    )
  };
  render() {
    return (
      <ContainerView>
        <TitleText>Favorites</TitleText>
      </ContainerView>
    );
  }
}

export default FavoritesScreen;
