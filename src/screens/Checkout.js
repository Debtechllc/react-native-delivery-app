import React, { Component } from 'react';
import styled from 'styled-components/native';
import { BackIcon, HamburgerIcon } from './../components/icons';
import { SafeAreaView, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from './../components/Elements/Header'
import { StyleSheet } from 'react-native'
import TopBar from './../components/Elements/TopBar';
import HomeCategory from './../components/Elements/HomeCategory';
import HomeOffers from './../components/Elements/HomeOffers';
import HomeBrands from './../components/Elements/HomeBrands';
import ImageSlider from 'react-native-image-slider';
import { ScrollView, FlatList, TextInput } from 'react-native-gesture-handler';
import { Button } from '../components';
import HomeLatestProducts from './../components/Elements/HomeLatestProducts';
import { fetchCheckoutInfoIfNeeded,fetchCountryListIfNeeded } from '../actions'
import { connect } from 'react-redux';
import RadioGroup from 'react-native-radio-buttons-group';

class Checkout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            address: "",
            data: [
                {
                    label: 'Net Banking',
                },
                {
                    label: 'Cash On Delivery',
                    value: "",
                    selected: true
                },
                // {
                //     label: 'Color',
                //     color: 'green',
                // },
                {
                    disabled: true,
                    label: 'EMI (Easy Installments)',
                },
                // {
                //     label: 'Size',
                //     size: 32,
                // },
            ],
        };
    }

    componentDidMount(prevProps, prevState, snapshot) {

        if (this.props.curState.Login_Reducer && this.props.curState.Login_Reducer.user && this.props.curState.Login_Reducer.user.id) {
            let data = { user_id: this.props.curState.Login_Reducer.user.id }
            console.warn(data)
            this.props.fetchCheckoutInfoIfNeeded(data)
        }
        else{
            this.props.navigation.navigate('Login');
            this.props.navigation.replace('Home');
        }
    }


    displayDeliveryAddress(){
        console.warn(this.props.curState.Checkout_Info_Reducer.address)
        if (this.props.curState.Checkout_Info_Reducer.address != ""){
        return(<View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'300', fontSize: 15, flex: 4, margin: 10}}>{this.props.curState.Checkout_Info_Reducer.address}</Text>
                <TouchableOpacity style={{flex:1, marginRight: 5}} onPress={() => this.props.navigation.navigate('ChangeLocation')}>
                    <View style={{borderRadius:5, backgroundColor:'#e59a00', justifyContent:'center', height: 40}}>
                        <Text style={{color:'white', textAlign:'center', fontWeight: '500', fontSize: 18}}>Edit</Text>
                    </View>
                </TouchableOpacity>
            </View>)
        }else{
            return(
            <TouchableOpacity style={{flex:1}}>
                <View style={{borderRadius:5, backgroundColor:'#e59a00', justifyContent:'center', margin: 5 ,height: 40, width: 200, alignContent:'center'}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChangeLocation')}><Text style={{color:'white', textAlign:'center', fontWeight: '500', fontSize: 18}}>ADD</Text></TouchableOpacity>
                </View>
            </TouchableOpacity>)
        }
    }

    // update state
    onPress = data => this.setState({ data });

    render() {
        let info = []
        if(this.props.curState.Checkout_Info_Reducer.info_posts && this.props.curState.Checkout_Info_Reducer.info_posts.jsonresp
              && this.props.curState.Checkout_Info_Reducer.info_posts.jsonresp.data)
            {
                info = this.props.curState.Checkout_Info_Reducer.info_posts.jsonresp.data
                console.warn(info)
            }
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

                    <TopBar notificationCount="9" cartCount="10" isTypeOfBack=""></TopBar>
                    <View style={{ height: 44, backgroundColor: '#0084d3', flexDirection: 'row' }}>
                        <TouchableOpacity style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.goBack()}>
                            <Icon name="ios-arrow-back" size={25} color="white" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 17, fontWeight: '400', color: 'white', top: 10 }}>Payments</Text>
                    </View>
                    <View style={{flex:1, backgroundColor:'#cdcdcd'}}>
                        <ScrollView style={{flex:1}}>
                            <View style={{backgroundColor:'white', margin: 8, flexDirection: 'column'}}>
                                <View style={{backgroundColor:'#cdcdcd', height: 50, justifyContent:'center', margin: 8}}>
                                    <Text style={{textAlign:'center', fontWeight:'400', fontSize: 18}}>Delivery Address</Text>
                                </View>
                                <View style={{backgroundColor:'white', height: 50, alignContent:'center'}}>
                                    {this.displayDeliveryAddress()}
                                </View>

                            </View>

                            <View style={{margin: 8, backgroundColor:'white', justifyContent:'flex-start',alignItems: 'flex-start',}}>
                                <RadioGroup radioButtons={this.state.data} onPress={this.onPress} />
                            </View>

                            <View style={{margin: 8, backgroundColor: 'white', height: 40, justifyContent:'flex-start', flexDirection:'row'}}>
                                <View style={{marginLeft: 8, marginTop: 5}}><Ionicons name="ios-add" size={30} color='black'/></View>
                                <Text style={{fontSize: 18, fontWeight:'500', textAlignVertical:'center', marginLeft: 10, marginTop: 10}}>Gift Card</Text>
                            </View>

                            <View style={{backgroundColor:'white', margin: 8, flexDirection: 'column'}}>
                                <View style={{backgroundColor:'#cdcdcd', height: 50, justifyContent:'center', margin: 8}}>
                                    <Text style={{textAlign:'center', fontWeight:'400', fontSize: 18}}>Price details</Text>
                                </View>
                                <View style={{backgroundColor:'white', alignContent:'center'}}>

                                    <View style={{ height: 20, justifyContent:'space-between', margin: 8, flexDirection:'row'}}>
                                        <Text style={{textAlign:'left', fontWeight:'300', fontSize: 15}}>Price(2 Item)</Text>
                                        <Text style={{textAlign:'right', fontWeight:'300', fontSize: 15}}>$300</Text>
                                    </View>

                                    <View style={{ height: 20, justifyContent:'space-between', margin: 8, flexDirection:'row'}}>
                                        <Text style={{textAlign:'left', fontWeight:'300', fontSize: 15}}>Delivery Charges</Text>
                                        <Text style={{textAlign:'right', fontWeight:'300', fontSize: 15}}>Free</Text>
                                    </View>

                                    <View style={{ height: 20, justifyContent:'space-between', margin: 8, flexDirection:'row'}}>
                                        <Text style={{textAlign:'left', fontWeight:'300', fontSize: 15, color:'#00a4df'}}>Amount Payable</Text>
                                        <Text style={{textAlign:'right', fontWeight:'300', fontSize: 15, color:'#00a4df'}}>$300</Text>
                                    </View>
                                </View>
                            </View>

                                <View style={{flexDirection:'row', margin: 8, height: 100, flex:1}}>
                                <FlatList
                                horizontal
                                data={info}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <View style={{backgroundColor:'white', borderRadius: 5, height: 80, flex:1, margin: 8, alignContent:'center', flexDirection:'column', justifyContent:'center'}}>
                                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}><Image source={{ uri:item.image}} style={{height: 40, width: 40,}}/></View>
                                    <Text style={{width: 120, textAlign: 'center'}}>{item.name}</Text>
                                    </View>
                                )}
                                ItemSeparatorComponent={() => <View style={{ flex: 1, height: 1, backgroundColor: '#F6F6F6' }} />}
                                keyExtractor={({ item, index }) => index}
                                style={{height:'100%', width: '30%',}} />
                                </View>

                        </ScrollView>
                    </View>



                    <View style={{height: 60, backgroundColor:'white',flexDirection:'row' }}>
                        <View style={{flexDirection:'column', flex:1}}>
                            <Text style={{color:'#484948', fontWeight:'bold', fontSize:20, marginLeft: 20, marginTop: 10}}>$1400</Text>
                            <Text style={{color:'#1faee3', marginLeft: 20}}>View price details</Text>
                        </View>
                    <View style={{flex:1}}>
                        <TouchableOpacity style={{flex:1}}>
                            <View style={{borderRadius:5, backgroundColor:'#e59a00', justifyContent:'center', height: 50, marginTop: 5, marginRight: 5}}>
                                <Text style={{color:'white', textAlign:'center', fontWeight: 'bold', fontSize: 20}}>Continue</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    </View>
                </SafeAreaView>
            );
    }
};


//export default HomeScreen;

const mapStateToProps = (state) => ({
    curState: state
});


export default connect(mapStateToProps, {
    fetchCheckoutInfoIfNeeded,
    fetchCountryListIfNeeded
})(Checkout);
