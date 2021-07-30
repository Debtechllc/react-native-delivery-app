import React, { Component } from 'react';
import { View, Text, Image } from 'react-native'

class HomeBrands extends Component {
    constructor(props){
        super(props)
        width: 0
        height: 0
    }
   
  render() {
   
    return (
        <View style={{ height: this.props.height, width: this.props.width, borderColor: '#dddddd', backgroundColor: '#fff', marginLeft:2, marginRight: 2 }}>
        <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-BXIFFbCWyJ67tUUHs-2NmBKKA1Xb7OMhFjJXPN6JCWcE9vbo'}} style={{ flex: 1, height: null, width: null, resizeMode: 'cover' }} />
        <View style={{ position: 'absolute', flex: 1, top: 70, left: 5, right: 5, bottom: 10, backgroundColor: 'white', shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.4, elevation: 1, justifyContent:'center', alignItems: 'center'}}>
          <Image source={{uri: 'https://www.logosdatabase.com/logoimages/78182292.jpg'}} style={{ flex: 1, height: 30, width: 60, resizeMode: 'cover', alignContent:'center' }} />
          <Text style={{textAlign: 'center', paddingTop: 0, color: 'black', fontSize: 12, fontWeight: '500'}}>LATEST JACKET</Text>
          <Text style={{textAlign: 'center', paddingTop: 0, color: 'black', fontSize: 11, fontWeight: '200'}}>Makes you feel it</Text>
        </View>
      </View>
    );
  }
}

export default HomeBrands;