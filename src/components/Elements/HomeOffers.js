import React, { Component } from 'react';
import { View, Text, Image } from 'react-native'

class HomeOffers extends Component {
   constructor(props){
       super(props)
       width: 0
       height: 0
   }
  render() {
   
    return (
        <View style={{ height: this.props.height, width: this.props.width, borderColor: '#dddddd', backgroundColor: '#fff', marginLeft:2 }}>
        <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-BXIFFbCWyJ67tUUHs-2NmBKKA1Xb7OMhFjJXPN6JCWcE9vbo'}}  style={{ flex: 1, height: null, width: null, resizeMode: 'cover' }} />
        <View style={{ position: 'absolute', flex: 1, top: 0, left: 0, right: 0, bottom: 0,}}>
          <Text style={{paddingTop: 110, paddingLeft: 5, color: 'white', fontSize: 17, fontWeight: '600'}}>Women's Fashion</Text>
        </View>
      </View>
    );
  }
}

export default HomeOffers;