import React, { Component } from 'react';
import styled from 'styled-components/native';
import { BackIcon, HamburgerIcon } from './../components/icons';
import { SafeAreaView, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
import Header from './../components/Elements/Header'
import { StyleSheet } from 'react-native'
import TopBar from './../components/Elements/TopBar';
import HomeCategory from './../components/Elements/HomeCategory';
import HomeOffers from './../components/Elements/HomeOffers';
import HomeBrands from './../components/Elements/HomeBrands';
import ImageSlider from 'react-native-image-slider';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { Button } from '../components';
import HomeLatestProducts from './../components/Elements/HomeLatestProducts';
import { fetchPostsForShoppingListIfNeeded } from '../actions'
import { connect } from 'react-redux';

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
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    body: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    banner: {
        justifyContent: 'space-around',
        flex: 1,
        backgroundColor: '#dcdbde'
    }
})

class ShoppingCart extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };

    }

    componentDidMount(prevProps, prevState, snapshot) {
        if (this.props.curState.Login_Reducer && this.props.curState.Login_Reducer.user && this.props.curState.Login_Reducer.user.id) {
            let data = { userID: this.props.curState.Login_Reducer.user.id }
            this.props.fetchPostsForShoppingListIfNeeded(data);

        }
        else{
            this.props.navigation.navigate('Login');
            this.props.navigation.replace('Home');
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'My Cart',
        drawerTitle: 'My Cart',
        drawerIcon: ({ tintcolor }) => (
            <Image source={require('./../images/mycart.png')}
                style={{ height: 25, width: 25 }} />
            // <Icon name='ios-menu' size={30} />
        ),
    });

    render() {
        let arrData = ["Hello", "world", "Here I am"]
        let productlist = []
        let productCount = 0
        if (this.props.curState.ShoppingList.posts.jsonresp) {
            productlist = this.props.curState.ShoppingList.posts.jsonresp.data
            console.warn(productlist)
            productCount =  productlist.length
            console.warn("product count "+productCount)
        }
        let quantityArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
        //console.log("printing " + {orders})

        if (this.props.curState.Login_Reducer && this.props.curState.Login_Reducer.user && this.props.curState.Login_Reducer.user.id) {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

                    <TopBar notificationCount="" cartCount={productCount} isTypeOfBack=""></TopBar>
                    <View style={{ height: 44, backgroundColor: '#0084d3', flexDirection: 'row' }}>
                        <TouchableOpacity style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.goBack()}>
                            <Icon name="ios-arrow-back" size={25} color="white" />
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: '400', color: 'white', top: 10 }}>Shopping Cart(Total: {productCount} items)</Text>
                    </View>
                    <FlatList
                        data={productlist}
                        renderItem={({ item }) => (
                            <View style={{ height: 160, backgroundColor: 'white', margin: 10, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Image source={{ uri: item.product.default_image.image }}
                                        style={{ height: 130, width: 130, resizeMode: 'cover', margin: 10 }} />
                                </View>
                                <View style={{ flex: 1, backgroundColor: 'white', marginLeft: - 40 }}>
                                    {/* <Text style={{ marginTop: 5, color: '#565656', fontSize: 14, fontWeight: '500' }}>ORDER NO-654321</Text> */}
                                    <Text style={{ marginTop: 10, color: '#565656', fontSize: 15, fontWeight: '500' }}>{item.product.name}</Text>
                                    <View style={{ backgroundColor: 'white', flexDirection: 'row' }}>
                                        <Text style={{ marginTop: 5, color: '#565656', fontSize: 12, fontWeight: '400' }}>Size: Medium</Text>
                                        <Text style={{ marginTop: 5, color: '#565656', fontSize: 12, fontWeight: '400', marginLeft: 5 }}>Color</Text>
                                        <View style={{ height: 10, width: 10, backgroundColor: 'red', marginLeft: 5, top: 8 }}></View>
                                        <Text style={{ margin: 5, color: '#565656', fontSize: 12, fontWeight: '400' }}>Quantity: {item.qty}</Text>
                                    </View>
                                    {/* <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <Text style={{ marginTop: 5, color: '#565656', fontSize: 12, fontWeight: '300' }}>Color</Text>
                                        <View style={{ height: 20, width: 20, backgroundColor: 'red', marginLeft: 5 }}></View>
                                    </View> */}
                                    <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Image source={{ uri: 'http://monksdrycleaning.co.uk/wp-content/uploads/2018/09/delivery-van-icon-blue.png' }}
                                            style={{ height: 20, width: 20, resizeMode: 'cover', marginTop: 5, marginRight: 5 }} />
                                        <Text style={{ marginTop: 5, color: '#565656', fontSize: 14, fontWeight: '300' }}>Free deivery in 4 days</Text>
                                    </View>
                                    <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Text style={{ marginTop: 5, color: '#565656', fontSize: 16, fontWeight: '600' }}>${item.product.price}</Text>
                                        <Text style={{ marginTop: 5, color: '#FF9300', fontSize: 12, fontWeight: '400', marginLeft: 5 }}>25% off</Text>
                                        <Text style={{ marginTop: 5, color: '#565656', fontSize: 16, fontWeight: '600', textDecorationLine: 'line-through', marginLeft: 5 }}>${item.product.price}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', height: 25, marginTop: 10 }}>
                                        <View style={{ height: 20, width: 80, backgroundColor: '#2BD4D0', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={require('./../images/save.png')} style={{ height: 10, width: 10, }}></Image>
                                            <Text style={{ color: 'white', marginLeft: 5, fontSize: 11, fontWeight: '500' }}>SAVE ITEM</Text>
                                        </View>
                                        <View style={{ height: 20, width: 80, backgroundColor: 'red', marginLeft: 10, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                                            <Image source={require('./../images/delete.png')} style={{ height: 15, width: 15, }}></Image>
                                            <Text style={{ color: 'white', marginLeft: 5, fontSize: 11, fontWeight: '500' }}>REMOVE</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            // <Text >{item}</Text>
                        )}
                        ItemSeparatorComponent={() => <View style={{ flex: 1, height: 1, backgroundColor: '#ddd' }} />}
                        keyExtractor={({ item, index }) => index}
                        style={{ backgroundColor: '#ddd' }} />
                        <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Checkout')} style={{ height: 50}}>
                            <View style={{marginLeft:10,marginRight:10, marginTop:5, flex:1, backgroundColor:'#e59a00',justifyContent: 'center'}} >
                                <Text style={{ color:'white', fontWeight:'bold', fontSize:20, textAlign: 'center'}}>PROCEED TO CHECKOUT</Text>
                            </View>
                        </TouchableOpacity>

                </SafeAreaView>
            );
        }
        else{
            this.props.navigation.navigate('Login')
            this.props.navigation.replace('Home')
            return null
        }
    }
};


//export default HomeScreen;

const mapStateToProps = (state) => ({
    curState: state
});


export default connect(mapStateToProps, {
    fetchPostsForShoppingListIfNeeded,
})(ShoppingCart);
