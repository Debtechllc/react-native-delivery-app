import React, { Component } from 'react';
import styled from 'styled-components/native';
import { BackIcon, HamburgerIcon } from '../components/icons';
import { SafeAreaView, View, Text, Image, Dimensions, TouchableOpacity, Picker } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Elements/Header'
import { StyleSheet } from 'react-native'
import TopBar from '../components/Elements/TopBar';
import HomeCategory from '../components/Elements/HomeCategory';
import HomeOffers from '../components/Elements/HomeOffers';
import HomeBrands from '../components/Elements/HomeBrands';
import ImageSlider from 'react-native-image-slider';
import { ScrollView, FlatList, TextInput } from 'react-native-gesture-handler';
import { Button } from '../components';
import HomeLatestProducts from '../components/Elements/HomeLatestProducts';
import { fetchCheckoutInfoIfNeeded ,fetchCountryListIfNeeded} from '../actions'
import { connect } from 'react-redux';
// import ModalPicker from 'react-native-modal-picker';
import ModalSelector from 'react-native-modal-selector'

class ChangeLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: { addr_1: "", addr_2: "", city: "", state: "", zip: "" },
            formError: { addr_1: "", addr_2: "", city: "", state: "", zip: "" },
            cityArray: [],
            textInputValue: ''
        };
    }

    componentDidMount(prevProps, prevState, snapshot) {
        let data = { user_id: this.props.curState.Login_Reducer.user.id }
        console.warn(data)
        this.props.fetchCountryListIfNeeded(data)
        
    }
    updateValues(text, filed) {
        //console.warn(text)
        if (filed == 'addr-1') {

            this.state.formData.addr_1 = text

        }else if (filed == 'addr-2') {

            this.state.formData.addr_2 = text

        } else if (filed == 'city') {

            this.state.formData.city = text

        } else if (filed == 'state') {

            this.state.formData.state = text

        } else if (filed == 'zip') {

            this.state.formData.zip = text

        } 
    }
    setValue(){
        if (this.state.formData.addr_1 == "" && this.state.formData.addr_2 == "") {
            alert("Please enter your address .")
            return
        }
        
        if (this.state.formData.city == "") {
            alert("Please enter your city.")
            return
        }
        if (this.state.formData.state == "") {
            alert("Please enter your state")
            return
        }
        if (this.state.formData.zip == "") {
            alert("Please enter your zip.")
            return
        }
        this.state.address=this.state.formData.addr_1
        console.warn(this.state.formData)
        this.props.curState.Checkout_Info_Reducer.address = this.state.formData.addr_1+","+this.state.formData.addr_2+","+this.state.formData.city+","+this.state.formData.state+","+this.state.formData.zip
        console.warn(this.props.curState.Checkout_Info_Reducer.address)
        this.props.navigation.goBack()
    }
    displayDeliveryAddress(){
        console.warn(this.state.address)
        if (this.state.address != ""){
        return(<View style={{flexDirection:'row'}}>
                <Text style={{fontWeight:'300', fontSize: 15, flex: 4, margin: 10}}>{this.formData.addr_1+","+this.formData.addr_2+","+this.formData.city+","+this.formData.state+","+this.formData.zip}</Text>
                <TouchableOpacity style={{flex:1, marginRight: 5}}>
                    <View style={{borderRadius:5, backgroundColor:'#e59a00', justifyContent:'center', height: 40}}>
                        <Text style={{color:'white', textAlign:'center', fontWeight: '500', fontSize: 18}}>Edit</Text>
                    </View>
                </TouchableOpacity>
            </View>)
        }else{
            return(
            <TouchableOpacity style={{flex:1}}>
                <View style={{borderRadius:5, backgroundColor:'#e59a00', justifyContent:'center', margin: 5 ,height: 40, width: 200}}>
                    <Text style={{color:'white', textAlign:'center', fontWeight: '500', fontSize: 18}}>ADD</Text>
                </View>
            </TouchableOpacity>)
        }
    }
    
    // update state
    onPress = data => this.setState({ data });
    
    setCountryName(text){
        this.setState({textInputValue:text})
        console.warn("Fetch state list now......")
    }
    
    
    render() {
        let info = []
        if(this.props.curState.Checkout_Info_Reducer.info_posts && this.props.curState.Checkout_Info_Reducer.info_posts.jsonresp
              && this.props.curState.Checkout_Info_Reducer.info_posts.jsonresp.data)
            {
                info = this.props.curState.Checkout_Info_Reducer.info_posts.jsonresp.data
                console.warn(info)
            }
            console.warn("country List......")
            if (this.props.curState.GetCountries.info_posts && this.props.curState.GetCountries.info_posts.jsonresp && this.props.curState.GetCountries.info_posts.jsonresp.data){
                console.warn("Printing......")
                var dict = this.props.curState.GetCountries.info_posts.jsonresp.data
                var i = 0
                for (var key in dict) {
                    
                        console.log(dict[key])
                        this.state.cityArray.push({key: i++, label: dict[key]})
                    }
                
                console.warn("Value = " + this.state.cityArray)
            }
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                 <TopBar notificationCount="9" cartCount="10" isTypeOfBack="back"></TopBar>
                    <View style={{flex:1, backgroundColor:'white', justifyContent: 'center', alignItems:'center'}}>
                    <Text style={{fontSize:20, padding: 10}}>Edit Address</Text>
                        <ScrollView style={{width: '90%', backgroundColor:'gray', borderRadius:10}}>
                            <View style={{ height: 55,marginTop: 20 , marginLeft: 8, marginRight: 8}}>
                                <TextInput
                                    style={{ height: 40, borderColor: '#fff', borderWidth: 0.5, color: '#fff' }}
                                    underlineColorAndroid="transparent"
                                    placeholder="First name"
                                    placeholderTextColor="#fff"
                                    autoCapitalize="none"
                                    onChangeText={(text) => this.updateValues(text, 'first name')}/>
                            </View>
                            <View style={{ height: 55,marginTop: 20 , marginLeft: 8, marginRight: 8}}>
                                <TextInput
                                    style={{ height: 40, borderColor: '#fff', borderWidth: 0.5, color: '#fff' }}
                                    underlineColorAndroid="transparent"
                                    placeholder="Last name"
                                    placeholderTextColor="#fff"
                                    autoCapitalize="none"
                                    onChangeText={(text) => this.updateValues(text, 'last name')}/>
                            </View>
                            <View style={{ height: 55,marginTop: 20 , marginLeft: 8, marginRight: 8}}>
                                <TextInput
                                    style={{ height: 40, borderColor: '#fff', borderWidth: 0.5, color: '#fff' }}
                                    underlineColorAndroid="transparent"
                                    placeholder="Email"
                                    placeholderTextColor="#fff"
                                    autoCapitalize="none"
                                    onChangeText={(text) => this.updateValues(text, 'email')}/>
                            </View>
                            <View style={{ height: 55,marginTop: 20 , marginLeft: 8, marginRight: 8}}>
                                <TextInput
                                    style={{ height: 40, borderColor: '#fff', borderWidth: 0.5, color: '#fff' }}
                                    underlineColorAndroid="transparent"
                                    placeholder="Phone number"
                                    placeholderTextColor="#fff"
                                    autoCapitalize="none"
                                    onChangeText={(text) => this.updateValues(text, 'Phone')}/>
                            </View>
                            <View style={{ height: 55,marginTop: 20 , marginLeft: 8, marginRight: 8}}>
                                <TextInput
                                    style={{ height: 40, borderColor: '#fff', borderWidth: 0.5, color: '#fff' }}
                                    underlineColorAndroid="transparent"
                                    placeholder="Address line 1"
                                    placeholderTextColor="#fff"
                                    autoCapitalize="none"
                                    onChangeText={(text) => this.updateValues(text, 'addr-1')}/>
                            </View>
                            <View style={{ height: 55,marginTop: 8 , marginLeft: 8, marginRight: 8}}>
                                <TextInput
                                    style={{ height: 40, borderColor: '#fff', borderWidth: 0.5, color: '#fff' }}
                                    underlineColorAndroid="transparent"
                                    placeholder="Address line 2"
                                    placeholderTextColor="#fff"
                                    autoCapitalize="none"
                                    onChangeText={(text) => this.updateValues(text, 'addr-2')}/>
                            </View>
                            <View style={{ height: 55,marginTop: 8 , marginLeft: 8, marginRight: 8,justifyContent: "center",
    margin :30}}>
                                {/* <Picker
                                    selectedValue={this.state.PickerSelectedVal}
                                    onValueChange={(itemValue, itemIndex) => this.setState({PickerSelectedVal: itemValue})} >
                                    
                                    {this.state.cityArray.map((item, index) => {
   return (< Picker.Item label={item} value={index} key={index} />);
})}   
                                </Picker> */}
                                {/* <ModalPicker
                    data={cityArray}
                    initValue="Select something yummy!"
                    onChange={(option)=>{ this.setState({textInputValue:option.label})}}>
                    
                    <TextInput
                        style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30}}
                        editable={false}
                        placeholder="Select something yummy!"
                        value={this.state.textInputValue} />
                        
                </ModalPicker> */}
                <ModalSelector
                    data={this.state.cityArray}
                    initValue="Select city!"
                    textColor={'white'}
                    onChange={(option)=>{ this.setCountryName(option.label)}}
                >
                {/* this.setState({textInputValue:option.label}) */}
                <TextInput
                        style={{borderWidth:1, borderColor:'#ccc', padding:1, height:50}}
                        editable={false}
                        placeholder="Select City"
                        value={this.state.textInputValue}
                        textColor={'white'} />
                        </ModalSelector>
                            </View>
                            <View style={{ height: 55,marginTop: 8 , marginLeft: 8, marginRight: 8}}>
                                <TextInput
                                    style={{ height: 40, borderColor: '#fff', borderWidth: 0.5, color: '#fff' }}
                                    underlineColorAndroid="transparent"
                                    placeholder="State"
                                    placeholderTextColor="#fff"
                                    autoCapitalize="none"
                                    onChangeText={(text) => this.updateValues(text, 'state')}/>
                            </View>
                            <View style={{ height: 55,marginTop: 8 , marginLeft: 8, marginRight: 8}}>
                                <TextInput
                                    style={{ height: 40, borderColor: '#fff', borderWidth: 0.5, color: '#fff' }}
                                    underlineColorAndroid="transparent"
                                    placeholder="Zip"
                                    placeholderTextColor="#fff"
                                    autoCapitalize="none"
                                    onChangeText={(text) => this.updateValues(text, 'zip')}/>
                            </View>
                            <TouchableOpacity onPress={() => this.setValue()}>
                            <View style={{marginLeft: 20, marginRight: 20, marginBottom: 8, height: 40, 
                                borderRadius: 10,
                                backgroundColor: 'white', justifyContent:'center',alignItems:'center'}}>
                                <Text style={{textAlign:'center', fontWeight:'bold', fontSize: 20}}>SAVE</Text>
                                </View></TouchableOpacity>
                        </ScrollView>
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
    fetchCountryListIfNeeded
})(ChangeLocation);