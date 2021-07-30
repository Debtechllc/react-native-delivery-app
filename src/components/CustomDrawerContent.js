import React from 'react';
import { DrawerItems } from 'react-navigation-drawer';
import styled from 'styled-components/native';
import {ScrollView,Container,Header,Body,Image,View,TouchableOpacity,Text,AsyncStorage, Alert} from 'react-native'
import Button from './Button';
import { withNavigation } from 'react-navigation';
import SignoutButton from './SignoutButton'
import LoginButton from './LoginButton'

const ContainerView = styled.View`
  flex: 1;
`;

const DrawerContainer = styled.View`
  flex: 1;
`;

const AvatarContainer = styled.View`
  flex: 4;
  top: 10;
  alignItems: center;
  justifyContent: center;
`;

const Avatar = styled.View`
  width: 80;
  height: 80;
  borderRadius: 0;
  backgroundColor: ${props => props.theme.PINK_100};

`;

const ItemContainer = styled.View`
  flex: 1;
`;

const ButtonContainer = styled.View`
  flex: 2;
  justifyContent: center;
  alignItems: center;
`;

const CustomDrawerContent = (props) => (
  

  <ContainerView>
  <ScrollView contentContainerStyle={{ paddingVertical: 0}}>
  <DrawerContainer>
    <View style={{height: 150,flexDirection: 'row',justifyContent: 'center'}}>
    <Image source={require('./../images/menuimg.png')}
                   style={{height: 150,resizeMode: 'stretch'}}/>
    <Image source={require('./../images/logo.png')}
                   style={{height: 70,resizeMode: 'contain',justifyContent: 'center',alignSelf: 'center',position: 'absolute'}}/>
    </View>
        <ItemContainer>
          
          <DrawerItems {...props}  activeTintColor='#ffffff' activeBackgroundColor='#086A87' inactiveTintColor='#000000' inactiveBackgroundColor='#ffffff' style={{backgroundColor: '#ffffff'}} />
          
        </ItemContainer>
      </DrawerContainer>
    </ScrollView>
    </ContainerView>
);

export default withNavigation(CustomDrawerContent);
