import React, { Component } from 'react';
import styled from 'styled-components/native';
import { BackIcon, HamburgerIcon } from './../components/icons';
import { SafeAreaView, View, Text, Image, Dimensions, ImageBackground, TouchableOpacity, TextInput } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
import Header from './../components/Elements/Header'
import { StyleSheet, ActivityIndicator } from 'react-native'
import TopBar from './../components/Elements/TopBar';
import HomeCategory from './../components/Elements/HomeCategory';
import HomeOffers from './../components/Elements/HomeOffers';
import HomeBrands from './../components/Elements/HomeBrands';
import ImageSlider from 'react-native-image-slider';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { Button } from '../components';
import HomeLatestProducts from './../components/Elements/HomeLatestProducts';
import { fetchContactUsIfNeeded } from '../actions'
import { connect } from 'react-redux';
import Back from '../components/icons/Back';
import { Input } from 'native-base';

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
    },
    textcontainer:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        top: 1
    },
    textMessagecontainer:
    {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        top: 1,
        height: 150
    },
    textInput:
    {
        width: '100%',
        paddingVertical: 0,
        paddingHorizontal: 15,
        height: 40,
        margin: 0,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
        backgroundColor: '#ddd'
    },
    textMessageInput:
    {
        width: '100%',
        height: 150,
        paddingVertical: 0,
        paddingHorizontal: 15,
        height: 40,
        margin: 0,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
        backgroundColor: '#ddd'
    }
})

class ContactUsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
            formData: {  name: "",email: "", message: ""},
            formError: { name: "",email: "", message: ""}
        };
    }
     handleName = (text) => {
        this.state.formData.name = text
      }
      handleEmail = (text) => {
        this.state.formData.email = text
      }
      handleMessage = (text) => {
        this.state.formData.message = text
      }
    validateEmail(text) {
        console.warn(text);
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(text) === false) {
            alert("Email is Not Valid");
            this.state.formError.email = "error"
            //return false;
        }
        else {
            // this.setState({email:text})
            this.state.formError.email = ""
            console.warn("Email is Valid");
        }
    }
    updateValues(text, filed) {
        //console.warn(text)
        if (filed == 'name') {

            this.state.formData.name = text

        } else if (filed == 'email') {

            this.state.formData.email = text

        } else if (filed == 'message') {

            this.state.formData.message = text

        }
    }
    contactUs = (name, email, message, prop) => {
        //alert('email: ' + email + ' password: ' + pass)
        if (this.state.formData.name == "") {
            alert("Please enter your name.")
            return
        }
      else  if (this.state.formData.email == "") {
          alert("Please enter your email.")
          return
      }
     else if (this.state.formError.email == "error") {
          alert("Email is not valid.")
          return
      }
     else if (this.state.formData.message == "") {
          alert("Please enter your message.")
          return
      }
      else{
       // console.warn(this.state.formData.email,this.state.formData.message)
        let data = {email: this.state.formData.email, message: this.state.formData.message}
        prop.fetchContactUsIfNeeded(data);
        return
      }
      }
   // componentDidMount() {
        // let data = {param1:'reactjs'}
        // this.props.fetchHomeDataIfNeeded(data);
       // console.log('GrandChild did mount.');
   // }

    static navigationOptions = ({ navigation }) => ({
        title: 'Contact us',
        drawerTitle: 'Contact us',
        drawerIcon: ({ tintcolor }) => (
            <Image source={require('./../images/contactus.png')}
                style={{height: 25,width: 25}}/>
           // <Icon name='ios-menu' size={30} />
        ),
    });

    render() {
        //let arrData = ["Hello", "world", "Here I am"]
        //console.log("printing " + {orders})
        let responseErrorCheck = ''
        let responseMessage = ''
        //console.warn('checkResponse',this.props.curState.ContactUs_Reducer)
        
        
        if(this.props.curState.ContactUs_Reducer.contact_us_content.jsonresp)
        {
            responseErrorCheck = this.props.curState.ContactUs_Reducer.contact_us_content.jsonresp.error
           if (responseErrorCheck == 0) {
            responseMessage = this.props.curState.ContactUs_Reducer.contact_us_content.jsonresp.message
               alert(responseMessage)
               
           } else {
               alert("Sending failed")
               
           }
        }
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fdfdfd' }}>
                <View style={{ height: 50, flexDirection: 'row', backgroundColor: '#0084d3' }}>
                    <TouchableOpacity style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.goBack()}>
                        <Icon name="ios-arrow-back" size={25} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{ marginTop: 30, fontSize: 30,marginLeft: 20,marginRight: 20, fontWeight: '600', color: '#565656', textAlign: 'center' }}>Contact us</Text>
                    <Text style={{ marginTop: 10, fontSize: 16,marginLeft: 20,marginRight: 20, fontWeight: '300', color: '#565656', textAlign: 'center' }}>Got a questions?We'd love to hear from you.Send us a message and we'll respond as soon as possible.</Text>
                    <View style={{height: 50,marginLeft: 20,marginRight: 20,marginTop: 20}}>
                    <TextInput
                        style={{height: 50,padding: 10,textAlignVertical: 'top',fontSize: 16, borderColor: '#000000', borderWidth: 1,color: '#000000'}}
                        underlineColorAndroid = "transparent"
                        placeholder = "Name"
                        placeholderTextColor = "#000000"
                        autoCapitalize = "none"
                        onChangeText = {this.handleName}
                        />
                    </View>
                    <View style={{height: 50,marginLeft: 20,marginRight: 20,marginTop: 10}}>
                    <TextInput
                        style={{height: 50,padding: 10,textAlignVertical: 'top',fontSize: 16, borderColor: '#000000', borderWidth: 1,color: '#000000'}}
                        underlineColorAndroid = "transparent"
                        placeholder = "Email address"
                        placeholderTextColor = "#000000"
                        autoCapitalize = "none"
                        onChangeText = {this.handleEmail}
                        />
                    </View>
                    <View style={{height: 100,marginLeft: 20,marginRight: 20,marginTop: 10}}>
                    <TextInput
                        style={{height: 100,padding: 10,textAlignVertical: 'top',fontSize: 16, borderColor: '#000000', borderWidth: 1,color: '#000000'}}
                        underlineColorAndroid = "transparent"
                        placeholder = "Message"
                        placeholderTextColor = "#000000"
                        autoCapitalize = "none"
                        onChangeText = {this.handleMessage}
                        />
                    </View>
                </View>
                <View style={{flex: 1, backgroundColor:'white'}}>
                <View style={{margin: 20, backgroundColor: '#FFA700', height: 50, justifyContent: 'center', alignContent:'center'}}>
                <TouchableOpacity onPress={() => this.contactUs(this.props.name, this.props.email, this.props.message, this.props)}><View style={{ margin: 20, backgroundColor: '#FFA700', height: 50, justifyContent: 'center', alignContent: 'center' }}><Text style={{ fontSize: 17, fontWeight:'600', color:'white', textAlign:'center' }}>SEND</Text></View></TouchableOpacity>
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
     fetchContactUsIfNeeded,
})(ContactUsScreen);

