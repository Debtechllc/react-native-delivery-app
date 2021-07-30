import React, { Component } from 'react';
import { View, Text, Image , TouchableOpacity} from 'react-native'
import ProductWiDetails from './../../screens/ProductDetails'
import {withNavigation} from 'react-navigation'

class HomeCategory extends Component {
  constructor(props){
    super(props)
    imageLink: "";
    title: "";
}

show_alert(){
  alert(
    'You need to...'
 )
}

  render() {
    return (
      <TouchableOpacity onPress = {() => this.props.navigation.navigate('ProductDetails',{ product_slug : this.props.itemSlug })}>
        <View style={{ height: 220, width: 220, borderColor: '#dddddd', backgroundColor: '#fff', marginLeft:2, padding:5 }}>
          <Image source={{uri: this.props.imageLink}}  style={{height: 160, width: null, resizeMode: 'contain', padding:10 }} />
            {/* paddingTop: 80, paddingLeft: 5, */}
            <View style={{backgroundColor:'cdcdcd'}}>
              <Text style={{ color: 'black', fontSize: 14, fontWeight: '500', backgroundColor:'cdcdcd'}}>{this.props.title}</Text>
            </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(HomeCategory);