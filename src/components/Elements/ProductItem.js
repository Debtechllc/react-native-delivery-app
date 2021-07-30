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
    let item = this.props.item
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetails',{product_slug: item.slug})}>
        <View style={{ backgroundColor: 'white', margin: 10,height: 150, flexDirection: 'row' }}>
            <View style={{ flex: 1, width: 130 }}>
                <Image source={{uri: item.images[0].image}}
                    style={{ height: 130, width: 130, resizeMode: 'cover', margin: 10 }} />
                  <Image source={require('./../../images/cartnew.png')}
                   style={{ width: 30, height: 30,position: 'absolute', top: 10, right: 15 }}/>
                   <TouchableOpacity style={{height:40,height: 30,bottom: 20, right: 15}}  onPress={() => this.openModal(item.id)}>
                   <Image source={require('./../../images/love.png')}
                   style={{ width: 30, height: 30,position: 'absolute', bottom: 20, right: 5 }}   />
                   </TouchableOpacity>    
            </View>
            <View style={{ flex: 1, backgroundColor: 'white', marginLeft: 10 }}>
                <Text style={{ marginTop: 5, color: '#565656', fontSize: 16, fontWeight: '500' }}>{item.name}</Text>
                <Text style={{ marginTop: 5, color: '#565656', fontSize: 16, fontWeight: '400' }}>{item.short_description}</Text>
                <View style={{ flex: 1, backgroundColor: 'white',marginTop: 5, flexDirection: 'row' }}>
                   <Text style={{fontSize: 16,fontWeight: '600',color: '#FFBF00'}}>${item.price}</Text>
                   <Text style={{fontSize: 16,color: '#848484'}}> $0 </Text>
                   <Text style={{fontSize: 16,color: '#FF0000'}}> (30% off)</Text> 
                </View>
                </View>
                </View>
    </TouchableOpacity>
    );
  }
}
export default ProductItem;
