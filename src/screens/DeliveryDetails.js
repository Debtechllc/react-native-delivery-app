import React, { Component } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { fetchPostsIfNeeded } from '../actions'
import GridView from 'react-native-super-grid';
import ProductItem from './../components/Elements/ProductItem';
import { StyleSheet, SafeAreaView, Animated } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import TopBar from './../components/Elements/TopBar';
import { common_styles as styles } from './../css/style'
import ProductDetailsImageGallery from './../components/Elements/ProductDetailsImageGallery';
import { View, Text, Image, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import { BackIcon } from '../components/icons';
import OrderDetails from './../components/Elements/OrderDetails';
import ShipmentDetails from './../components/Elements/ShipmentDetails';
import CouponCodeSec from './../components/Elements/CouponCodeSec';
import { Button, Title } from 'native-base';

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const TitleText = styled.Text`
  fontSize: 30;
  color: ${props => props.theme.WHITE};
`;

class DeliveryDetails extends Component {

    static navigationOptions = {
        title: 'Delivery Details'
    };
    render() {
        return (
            <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
                <TopBar notificationCount="9" cartCount="10" isTypeOfBack=""></TopBar>
                <View style={{ backgroundColor: '#00A3DF', flexDirection: 'row', height: 44, alignItems: 'flex-start' }}>
                    <Icon name="ios-arrow-back" size={25} color='white' style={{ margin: 10 }} onPress={() => this.props.navigation.goBack()} />
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: '500', textAlign: 'left', margin: 10 }}>Back</Text>
                </View>
                <ScrollView style={{ backgroundColor: '#ddd' }}>
                    <OrderDetails />
                    <ShipmentDetails />
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20 }}>
                        <Image source={require('./../images/right_sign.png')} style={{ height: 20, width: 20 }} />
                        <View style={{ flex: 2 }}><Text style={{ fontSize: 12, fontWeight: '400', }}>Your item has been successfully delivered on 16th January, 2019</Text></View>
                        <View style={{ flex: 1 }}>
                            <Button style={{ color: 'white', backgroundColor: 'red', height: 30, width: '100%', alignContent: 'center', borderRadius: 5 }}><Title style={{ color: 'white', fontSize: 13, fontWeight: '400', textAlign: 'center', flex: 1 }}>Tracking Details</Title></Button>
                        </View>
                    </View>
                    <CouponCodeSec />
                    <View style={{ height: 40, backgroundColor: 'white', marginLeft: 20, marginRight: 20, flexDirection: 'row', marginBottom: 20}}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems:'center' }}><Image source={require('./../images/invoice.png')} style={{ height: 30, width: 25, margin:7 }} />
                            <Text style={{ fontSize: 14, fontWeight: '600', color: '#565656' , margin: 7}}>INVOICE</Text>
                        </View>
                        <View style={{ flex: 1, alignItems:'flex-end', }}>
                        <Image source={require('./../images/arrow.png')} style={{ height: 30, width: 25, margin:7 }} />
                        </View>
                    </View>
                    <View style={{ height: 40, backgroundColor: 'white', marginLeft: 20, marginRight: 20, flexDirection: 'row', marginBottom: 20}}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems:'center' }}><Image source={require('./../images/return_policy.png')} style={{ height: 30, width: 30, marginLeft:5}} />
                            <Text style={{ fontSize: 14, fontWeight: '600', color: '#565656' , margin: 7}}>VIEW RETURN POLICY</Text>
                        </View>
                        <View style={{ flex: 1, alignItems:'flex-end', }}>
                        <Image source={require('./../images/arrow.png')} style={{ height: 30, width: 25, margin:7 }} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default DeliveryDetails;