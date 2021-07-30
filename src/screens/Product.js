import React, { Component } from 'react';
import styled from 'styled-components/native';
import {SafeAreaView,View,Text, Image,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Alert } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';

import TopBar from './../components/Elements/TopBar';
import ProductItem from './../components/Elements/ProductItem';

import { connect } from 'react-redux';
import { fetchProductPostsIfNeeded } from '../actions'
import { fetchAddToWishListIfNeeded, fetchBrandPostsIfNeeded } from '../actions'


const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;
const TitleText = styled.Text`
  fontSize: 30;
  color: ${props => props.theme.WHITE};
`;
class ProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      wish_price: '',
      max_price: '',
      date:'2019-02-04',
      user_id: '808',
      product_id: '',
      immediately: '1',
      category_id: '',
      formData: {  product_id: "",wish_price: "",max_price: "", date: "", user_id: "", immediately: "" },
      formError: { product_id: "",wish_price: "",max_price: "", date: "", user_id: "", immediately: ""},
      data: [
        {
            label: 'Yes',
            value: "1",
        },
        {
            label: 'No',
            color: '0',
        },
    ],
    };
    this.showAlert = this.showAlert.bind(this);
    this.openModal = this.openModal.bind(this);
    if(this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.category_id)
    {
          console.warn('catId',this.props.navigation.state.params.category_id)
          let data = {'category_id':this.props.navigation.state.params.category_id}
          this.setState({category_id:this.props.navigation.state.params.category_id})
          this.props.fetchProductPostsIfNeeded(data);
    }
    else
    {
      let data = {'category_id':''}
      this.props.fetchProductPostsIfNeeded(data);
    }

  }
  openModal(productid) {
    console.warn('productId',productid)
    // this.setState({product_id:productid})
    // this.setState({modalVisible:true});
    // const { navigate } = this.props.navigation;
    // navigate('AddWishListModal', {
    //   Clicked_Item: productid,
    // })
  // <AddWishListModal></AddWishListModal>
  }
  componentDidMount(prevProps, prevState, snapshot){
    // if(this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.category_id)
    // {
    //       console.warn('catId',this.props.navigation.state.params.category_id)
    //       let data = {'category_id':this.props.navigation.state.params.category_id}
    //       this.setState({category_id:this.props.navigation.state.params.category_id})
    //       this.props.fetchProductPostsIfNeeded(data);
    // }
    // else
    // {
    //   let data = {'category_id':''}
    //   this.props.fetchProductPostsIfNeeded(data);
    // }
    let data1 = {'param1':'reactjs'}
    this.props.fetchBrandPostsIfNeeded(data1);
  }
  static navigationOptions = {
    title: 'Profile',
    tabBarIcon: ({tintColor}) => (
      <Icon name ='ios-contact' size={23} color={tintColor}/>
    )
  };
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
   // console.warn('checkState',this.state.category_id)
    let brandlist = []
        if(this.props.curState.Brand_Reducer.brand_content_posts && this.props.curState.Brand_Reducer.brand_content_posts.data)
        {
          brandlist = this.props.curState.Brand_Reducer.brand_content_posts.data
        }
    let dataDrpdwn = [{
      value: 'Test1',
    }, {
      value: 'Test2',
    }, {
      value: 'Test3',
    }];
    let productlist = []
    if(this.props.curState.Product_Reducer.product_content_posts && this.props.curState.Product_Reducer.product_content_posts.data)
    {
       productlist = this.props.curState.Product_Reducer.product_content_posts.data.products
    }
    return (
      <SafeAreaView style={{flex: 1,backgroundColor: 'fff'}}>

      {/* </ContainerView> */}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => ({
	curState:state
});
export default connect(mapStateToProps, {
	fetchProductPostsIfNeeded,fetchBrandPostsIfNeeded
})(ProductScreen);
