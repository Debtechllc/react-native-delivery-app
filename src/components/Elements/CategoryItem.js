import React, { Component } from 'react';
import styled from 'styled-components/native';
import {SafeAreaView,View,Text,Image,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native'
import { Alert } from 'react-native'
import { withTheme } from 'styled-components';
import CartIcon from './../icons/Cart';
import {common_styles} from './../../css/style'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dialog, { SlideAnimation,DialogTitle,DialogContent } from 'react-native-popup-dialog';
const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const TitleText = styled.Text`
  fontSize: 30;
  color: ${props => props.theme.WHITE};
`;

const styles = StyleSheet.create({
  container:{
      flex:1,
      flexDirection: 'column',
      backgroundColor: '#FFFFFF'
  },
text:{
  fontWeight: 'bold',
  fontSize: 15,
  marginTop: 0,
  marginLeft: 5
  },
flex:{
  flex:1,
  flexDirection: 'row',
  justifyContent: 'space-around',
  flexWrap: 'wrap'
},
itemContainer: {
  justifyContent: 'flex-end',
  height: 300,
},
itemName: {
  fontSize: 16,
  color: '#000',
  fontWeight: '600',
  padding: 5,
},
cartSection: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'flex-end',
  flex: 1,
},
cartIcon: {
  backgroundColor: '#fff',
  // flex: 1,
},
itemCode: {
  fontWeight: '600',
  fontSize: 12,
  color: '#000',
  padding: 5,
},
})

class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.showAlert = this.showAlert.bind(this);
  }
  showAlert = (name) => {
    Alert.alert(
     'Alert Title',
     `The item name is: ${name}`,
     [
       {text: 'OK', onPress: () => console.log('OK Pressed')},
     ],
     { cancelable: false }
   )}
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ContainerView style={styles.container}>
      <TouchableOpacity style={{height: 150}} onPress={() => this.showAlert(this.props.item.name)}>
      <View style={{ height: 150, backgroundColor: 'white', margin: 10, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Image source={{uri: this.props.item.image}}
                                    style={{ height: 130, width: 130, resizeMode: 'cover', margin: 10 }} />
                                     <Image source={require('./../../images/cartnew.png')}
                                   style={{ flex: 1,width: 30, height: 30,position: 'absolute', top: 10, right: 10 }}/>
                                 <Image source={require('./../../images/love.png')}
                                  style={{ flex: 1,width: 30, height: 30,position: 'absolute', top: 65, right: 10 }}/>
                            </View>
                            <View style={{ flex: 1, backgroundColor: 'white', marginLeft: - 40 }}>
                                <Text style={{ marginTop: 10, color: '#565656', fontSize: 15, fontWeight: '500' }}>{this.props.item.name}</Text>
                                <Text style={{ marginTop: 5, color: '#565656', fontSize: 12, fontWeight: '400' }}>{this.props.item.price_text}</Text>
                                <View style={{ backgroundColor: 'white', flexDirection: 'row' }}>
                                    <Text style={{fontSize: 16,fontWeight: '600',color: '#FFBF00'}}> $120</Text>
                                    <Text style={{fontSize: 16,color: '#848484'}}> $180</Text>
                                    <Text style={{fontSize: 16,color: '#FF0000'}}>(30% off)</Text>
                                </View>
                            </View>
                        </View>
        </TouchableOpacity>
      </ContainerView>
      </SafeAreaView>
    );
  }
}
export default ProductItem;
