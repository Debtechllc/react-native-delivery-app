import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native'

class ProductDetailsImageGallery extends Component {
   constructor(props){
       super(props)
       width: 0
       height: 0
       imageurl:''
   }
  render() {
   let width = Dimensions.get('window').width
    return (
        <View style={{ height: this.props.height, width: this.props.width, borderColor: '#dddddd', backgroundColor: '#fff',}}>
        <Image source={{uri: this.props.imageUrl}}  style={{ flex: 1, height: null, width: this.props.width, resizeMode: 'contain' }} />
      </View>
    );
  }
}

export default ProductDetailsImageGallery;