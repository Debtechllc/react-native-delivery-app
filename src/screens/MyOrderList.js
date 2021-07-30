import React, { Component } from 'react';
import styled from 'styled-components/native';
import { BackIcon, HamburgerIcon } from './../components/icons';
import { SafeAreaView, View, Text, Image, Dimensions,TouchableOpacity } from 'react-native'

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
import { connect } from 'react-redux';
import {withNavigation, NavigationActions, StackActions} from 'react-navigation'

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

class MyOrderList extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };


    }



    componentDidMount(prevProps, prevState, snapshot) {
        if (this.props.curState.Login_Reducer && this.props.curState.Login_Reducer.user && this.props.curState.Login_Reducer.user.id) {
        }

        else{
            this.props.navigation.navigate('Login');
            this.props.navigation.replace('Home');
        }

    }

    static navigationOptions = ({ navigation }) => ({
        title: 'My Orders',
        drawerTitle: 'My Orders',
        drawerIcon: ({ tintcolor }) => (
            <Image source={require('./../images/order.png')}
            style={{height: 25,width: 25}}/>
           // <Icon name='ios-menu' size={30} />
        ),
    });

    render() {

        let arrData = ["Hello", "world", "Here I am"]



        if (this.props.curState.Login_Reducer && this.props.curState.Login_Reducer.user && this.props.curState.Login_Reducer.user.id) {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

                    <TopBar notificationCount="9" cartCount="10" isTypeOfBack=""></TopBar>
                    <FlatList
                        data={arrData}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderDetails')}>
                                <View style={{ height: 150, backgroundColor: 'white', margin: 10, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }}>
                                        <Image source={{ uri: 'https://image.dhgate.com/0x0/f2/albu/g2/M00/75/A1/rBVaG1oBLzuAFq5JAAFjDCE0jSo659.jpg' }}
                                            style={{ height: 130, width: 130, resizeMode: 'cover', margin: 10 }} />
                                    </View>
                                    <View style={{ flex: 1, backgroundColor: 'white', marginLeft: - 20 }}>
                                        <Text style={{ marginTop: 5, color: '#565656', fontSize: 14, fontWeight: '500' }}>ORDER NO-654321</Text>
                                        <Text style={{ marginTop: 5, color: '#565656', fontSize: 14, fontWeight: '400' }}>Women printed dress</Text>
                                        <View style={{ backgroundColor: 'white', flexDirection: 'row' }}>
                                            <Text style={{ marginTop: 5, color: '#565656', fontSize: 14, fontWeight: '300' }}>Size: Medium</Text>
                                            <Text style={{ margin: 5, color: '#565656', fontSize: 14, fontWeight: '300' }}>Quantity: 2</Text>
                                        </View>
                                        <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                            <Text style={{ marginTop: 5, color: '#565656', fontSize: 14, fontWeight: '300' }}>Color</Text>
                                            <View style={{ height: 20, width: 20, backgroundColor: 'red', marginLeft: 5 }}></View>
                                        </View>
                                        <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                            <Image source={{ uri: 'http://monksdrycleaning.co.uk/wp-content/uploads/2018/09/delivery-van-icon-blue.png' }}
                                                style={{ height: 20, width: 20, resizeMode: 'cover', marginTop: 5, marginRight: 5 }} />
                                            <Text style={{ marginTop: 5, color: '#565656', fontSize: 13, fontWeight: '200' }}>26th August(Saturday)</Text>
                                        </View>
                                        <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                            <Text style={{ marginTop: 5, color: '#565656', fontSize: 16, fontWeight: '600' }}>$80.00</Text>
                                            <Image source={{ uri: 'http://monksdrycleaning.co.uk/wp-content/uploads/2018/09/delivery-van-icon-blue.png' }}
                                                style={{ height: 20, width: 20, resizeMode: 'cover', marginTop: 5, marginRight: 5, marginLeft: 10 }} />
                                            <Text style={{ marginTop: 5, color: '#565656', fontSize: 13, fontWeight: '200' }}>Delivered</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            // <Text >{item}</Text>
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
};


//export default HomeScreen;

const mapStateToProps = (state) => ({
    curState: state
});


export default connect(mapStateToProps, {
})(withNavigation(MyOrderList));
