import React, { Component } from 'react';
import styled from 'styled-components/native';
import {SafeAreaView,View,Text, Image,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import TopBar from './../components/Elements/TopBar';
import GridView from 'react-native-super-grid';
import ProductItem from './../components/Elements/ProductItem';
import { connect } from 'react-redux';
import { fetchMyWishListIfNeeded } from '../actions'
import {common_styles as styles} from './../css/style'
import { Alert } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;
const TitleText = styled.Text`
  fontSize: 30;
  color: ${props => props.theme.WHITE};
`;

/*const styles = StyleSheet.create({
  container:{
      flex:1,
      flexDirection: 'column',
      backgroundColor: '#FFFFFF'
  },
menuSection:{
  flexDirection: 'row',
  flex:3
},
body:{
  flex:1,
  flexDirection: 'row',
  justifyContent: 'space-around',
},
text:{
  fontWeight: 'bold',
  fontSize: 15,
  marginTop: 0,
  marginLeft: 5
  },
  Dropdown:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    color: 'red'
  },
flex:{
  flex:1,
  flexDirection: 'row',
  justifyContent: 'space-around',
  flexWrap: 'wrap'
},
gridView: {
  paddingTop: 25,
  flex: 1,
},
itemContainer: {
  justifyContent: 'flex-end',
  borderRadius: 5,
  padding: 10,
  height: 150,
}
})
*/

class MyWishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: '808',
  };
    this.showAlert = this.showAlert.bind(this);
  }

  componentDidMount(prevProps, prevState, snapshot) {
      if (this.props.curState.Login_Reducer && this.props.curState.Login_Reducer.user && this.props.curState.Login_Reducer.user.id) {
        let data = {user_id: this.props.curState.Login_Reducer.user.id}
        this.props.fetchMyWishListIfNeeded(data);
      }
      else{
          this.props.navigation.navigate('Login');
          this.props.navigation.replace('Home');
      }

  }

  static navigationOptions = ({ navigation }) => ({
    title: 'My Wishlist',
    drawerTitle: 'My Wishlist',
    drawerIcon: ({ tintcolor }) => (
        <Image source={require('./../images/mywishlist.png')}
            style={{height: 25,width: 25}}/>
       // <Icon name='ios-menu' size={30} />
    ),
});
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
    //console.warn('jsonCheck',this.props.curState.MyWishlist_Reducer.mywishlist_content.jsonresp)
    let productlist = []
    if(this.props.curState.MyWishlist_Reducer.mywishlist_content.jsonresp)
    {
      productlist = this.props.curState.MyWishlist_Reducer.mywishlist_content.jsonresp
    }
    if (this.props.curState.Login_Reducer && this.props.curState.Login_Reducer.user && this.props.curState.Login_Reducer.user.id) {
      return (
        <SafeAreaView style={{flex: 1,backgroundColor: '#fdfdfd'}}>
                <View style={{ height: 50,flexDirection: 'row', backgroundColor: '#0084d3' }}>
                      <TouchableOpacity style={{ height: 50, marginLeft: 20, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.goBack()}>
                          <Icon name="ios-arrow-back" size={25} color="white" />
                      </TouchableOpacity>
                      <Text style={{marginLeft: 15,fontSize: 18,color: '#fff',fontWeight: 'bold',alignSelf:'center'}}>
                          My Wish List</Text>
                  </View>
      <FlatList
        data={productlist}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
              <TouchableOpacity style={{height: 150,marginTop: 5,marginLeft: 5,marginEnd: 5}} onPress={() => this.showAlert(item.product_name)}>
              <View style={{ height: 150, backgroundColor: 'white', flexDirection: 'row' }}>
                <View style={{ width: 130,backgroundColor: 'white' }}>
                  <Image source={{uri: item.product_image}}
                  style={{ height: 130, width: 130, resizeMode: 'cover',marginTop: 5 }} />
                    style={{ width: 30, height: 30,position: 'absolute', top: 10, right: 5 }}/>
                    <Image source={require('./../images/love.png')}
                    style={{ width: 30, height: 30,position: 'absolute', bottom: 20, right: 5 }}/>
                  </View>
                  <View style={{ flex: 1, backgroundColor: 'white',marginLeft: 10}}>
                    <Text style={{ marginTop: 5, color: '#565656', fontSize: 15, fontWeight: '500' }}>{item.product_name}</Text>
                    <Text style={{ marginTop: 5, color: '#565656', fontSize: 12, fontWeight: '400' }}>{item.price_text}</Text>
                    <Text style={{fontSize: 16,fontWeight: '600',color: '#FFBF00'}}> Wish price: ${item.wish_price}</Text>
                    <Text style={{fontSize: 16,color: '#848484'}}> Max price: ${item.max_price}</Text>
                    <Text style={{fontSize: 16,color: '#FF0000'}}> Date till: {item.date_till}</Text>
                    </View>
                    </View>
              </TouchableOpacity>
                      )}
        ItemSeparatorComponent={() => <View style={{ flex: 1, height: 1, backgroundColor: '#ddd' }} />}
        keyExtractor={({ item, index }) => index}
        style={{ backgroundColor: '#ddd' }} />
        </SafeAreaView>
      );
    }
    else{
      this.props.navigation.navigate('Login')
      this.props.navigation.replace('Home')
      return null
    }
  }
}
const mapStateToProps = (state) => ({
	curState:state
});


export default connect(mapStateToProps, {
	fetchMyWishListIfNeeded,
})(MyWishList);
