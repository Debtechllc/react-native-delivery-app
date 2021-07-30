import React, { Component } from 'react';
import styled from 'styled-components/native';
import { BackIcon, HamburgerIcon } from './../components/icons';
import { SafeAreaView, View, Text, Image, Dimensions, ImageBackground, TouchableOpacity, TextInput } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
import Header from './../components/Elements/Header'
import { StyleSheet, KeyboardAvoidingView, Keyboard } from 'react-native'
import TopBar from './../components/Elements/TopBar';
import HomeCategory from './../components/Elements/HomeCategory';
import HomeOffers from './../components/Elements/HomeOffers';
import HomeBrands from './../components/Elements/HomeBrands';
import ImageSlider from 'react-native-image-slider';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { Button } from '../components';
import HomeLatestProducts from './../components/Elements/HomeLatestProducts';
import { fetchHomeDataIfNeeded } from '../actions'
import { connect } from 'react-redux';
import Back from '../components/icons/Back';
import { Input } from 'native-base';
import { fetchSignupIfNeeded } from '../actions'


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
        margin: 20,
        backgroundColor: '#ddd',
        top: 1
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
    }

})

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formData: { first_name: "Akshoy", last_name: "Adak", name: "", email: "", password: "", phone: "" },
            formError: { name: "", email: "", password: "", conf_password: "", phone: "" }
        };

    }
    validateEmail(text) {
        console.warn(text);
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(text) === false) {
            alert("Email is Not Correct");
            this.state.formError.email = "error"
            //return false;
        }
        else {
            // this.setState({email:text})
            this.state.formError.email = ""
            console.warn("Email is Correct");
        }
    }

    validatePhone(text) {
        console.warn(text);
        var re = /^[0-9]{10}$/;
        if (re.test(text) === false) {
            alert("Phone is Not Correct");
            this.state.formError.phone = "error"
            //return false;
        }
        else {
            // this.setState({email:text})
            this.state.formError.phone = ""
            console.warn("Phone is Correct");
        }
    }
    validatePassword(text, type) {
        console.warn(text);
        var re = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if (re.test(text) === false) {
            if (type == "password") {
                alert("Password is Not Correct");
                this.state.formError.password = "error"
            } else {
                alert("Conf Password is Not Correct");
                this.state.formError.conf_password = "error"
            }
            //return false;
        }
        else {
            // this.setState({email:text})
            if (type == "password") {
                this.state.formError.password = ""
                console.warn("Password is Correct");
            } else {
                this.state.formError.conf_password = ""
                console.warn("Password is Correct");
            }
        }
    }


    componentDidMount(prevProps, prevState, snapshot) {
        // let data = {param1:'reactjs'}
        // this.props.fetchHomeDataIfNeeded(data);
        console.log('GrandChild did mount.');
    }

    componentWillUnmount(){
       this.state.formData=null
       this.state.formError=null
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'SignUp',
        drawerTitle: 'SignUp',
        drawerIcon: ({ tintcolor }) => (
            <Image source={require('./../images/signup.png')}
                style={{ height: 25, width: 25 }} />
            // <Icon name='ios-menu' size={30} />
        ),
    });
    updateValues(text, filed) {
        //console.warn(text)
        if (filed == 'first_name') {

            this.state.formData.first_name = text

        }else if (filed == 'last_name') {

            this.state.formData.last_name = text

        } else if (filed == 'email') {

            this.state.formData.email = text

        } else if (filed == 'password') {

            this.state.formData.password = text

        } else if (filed == 'conf_password') {

            this.state.formData.conf_password = text

        } else if (filed == 'phone') {

            this.state.formData.phone = text

        }
    }

    signUp() {
        if (this.state.formData.first_name == "") {
            alert("Please enter your first name.")
            return
        }
        if (this.state.formData.last_name == "") {
            alert("Please enter your last name.")
            return
        }
        if (this.state.formData.email == "") {
            alert("Please enter your email.")
            return
        }
        if (this.state.formError.email == "error") {
            alert("Email is not valid.")
            return
        }
        if (this.state.formData.password == "") {
            alert("Please enter your password.")
            return
        }
        if (this.state.formError.password == "error") {
            alert("Password should contain one capital letter, one special character, one number and atleast 8 characters long.")
            return
        }
        if (this.state.formData.password == "") {
            alert("Please enter your password.")
            return
        }
        if (this.state.formError.password == "error") {
            alert("Password should contain one capital letter, one special character, one number and atleast 8 characters long.")
            return
        }
        if (this.state.formData.phone == "") {
            alert("Please enter your phone.")
            return
        }
        if (this.state.formError.phone == "error") {
            alert("Phone number is not valid.")
            return
        }
        console.warn(this.state.formData)
        this.first_name.clear()
        this.last_name.clear()
        this.email.clear()
        this.password.clear()
        this.conf_password.clear()
        this.phone.clear()
        this.props.fetchSignupIfNeeded(this.state.formData);
        // console.log('GrandChild did mount.');
        // fetch('http://debtech.net:3333/api/v1/register_v3', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(this.state.formData),
        // })
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         console.warn(responseJson)
        //         console.warn(responseJson.encData.error)
        //         if (responseJson.encData.error == 0) {
        //             console.warn("Go to home")
        //         }
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    }


    render() {
        let arrData = ["Hello", "world", "Here I am"]
        let userData = []
        console.log(this.props.curState.Product)
        if (this.props.curState.SignUp.user && this.props.curState.SignUp.user.jsonresp) {
            userData = this.props.curState.SignUp.user.jsonresp
            console.log("signup response")
            console.log(this.props.curState.SignUp.user.jsonresp)
            alert(userData.message)
            if  (userData.error=="0"){
                this.props.navigation.navigate("Home")
            }
           
        }
        //console.log("printing " + {orders})
        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: '#fdfdfd' }}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
                    <View style={{ height: 50, flexDirection: 'row', backgroundColor: '#0084d3' }}>
                        <TouchableOpacity style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.goBack()}>
                            <Icon name="ios-arrow-back" size={25} color="white" />
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ flexDirection: 'row', backgroundColor: 'green' }}>
                        <View style={{ flex: 1, height: 50, flexDirection: 'row', backgroundColor: '#ddd', }}>
                            <View style={{ flex: 1, height: 50, backgroundColor: '#ddd' }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon name="ios-lock" color='#565656' size={24} style={{ marginLeft: 15 }} />
                                    <Text style={{ color: '#565656', fontSize: 16, fontWeight: '500', paddingLeft: 10 }}>15 day return</Text>
                                </View>
                            </View>

                            <View style={{ width: 1, height: 50, backgroundColor: 'white' }}></View>

                            <View style={{ flex: 1, height: 50, backgroundColor: '#ddd' }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon name="ios-lock" color='#565656' size={24} style={{ marginLeft: 15 }} />
                                    <Text style={{ color: '#565656', fontSize: 16, fontWeight: '500', paddingLeft: 10 }}>secured payment</Text>
                                </View>
                            </View>
                        </View>
                    </View> */}
                    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                        <View style={{ flex: 1}}>
                            <Text style={{ marginTop: 20, fontSize: 30, fontWeight: '600', color: '#565656', textAlign: 'center' }}>SIGNUP</Text>
                            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: '300', color: '#565656', textAlign: 'center' }}>Put your correct information now</Text>
                            <View style={{ flex: 1, }}>

                                <View style={styles.textcontainer}>
                                    <TextInput ref={input => { this.first_name = input }} underlineColorAndroid="#565656" placeholderTextColor="#565656" placeholder="First Name" style={styles.textInput}
                                        onChangeText={(text) => this.updateValues(text, 'first_name')}></TextInput>
                                </View>
                                <View style={styles.textcontainer}>
                                    <TextInput ref={input => { this.last_name = input }} underlineColorAndroid="#565656" placeholderTextColor="#565656" placeholder="Last Name" style={styles.textInput}
                                        onChangeText={(text) => this.updateValues(text, 'last_name')}></TextInput>
                                </View>
                                <View style={styles.textcontainer}>
                                    <TextInput ref={input => { this.email = input }} underlineColorAndroid="#565656" placeholderTextColor="#565656" keyboardType={'email-address'}
                                        placeholder="Email address" style={styles.textInput} onChangeText={(text) => this.updateValues(text, 'email')}
                                        value={this.state.email} onEndEditing={() => this.validateEmail(this.state.formData.email)}></TextInput>
                                </View>
                                <View style={styles.textcontainer}>
                                    <TextInput ref={input => { this.password = input }} underlineColorAndroid="#565656" placeholderTextColor="#565656" secureTextEntry={true} placeholder="Password"
                                        style={styles.textInput} onChangeText={(text) => this.updateValues(text, 'password')}
                                        onEndEditing={() => this.validatePassword(this.state.formData.password)}></TextInput>
                                </View>
                                <View style={styles.textcontainer}>
                                    <TextInput ref={input => { this.conf_password = input }} underlineColorAndroid="#565656" placeholderTextColor="#565656" secureTextEntry={true} placeholder="Confirm Password"
                                        style={styles.textInput} onChangeText={(text) => this.updateValues(text, 'conf_password')}
                                        onEndEditing={() => this.validatePassword(this.state.formData.conf_password)}></TextInput>
                                </View>
                                <View style={styles.textcontainer}>
                                    <TextInput ref={input => { this.phone = input }} underlineColorAndroid="#565656" placeholderTextColor="#565656" keyboardType={'phone-pad'}
                                        placeholder="Phone number" style={styles.textInput} onChangeText={(text) => this.updateValues(text, 'phone')}
                                        onEndEditing={() => this.validatePhone(this.state.formData.phone)}></TextInput>
                                </View>

                            </View>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                        {/* <View><Text style={{ fontSize: 14, fontWeight: '400', textAlign: 'center' }}>I have a refferal registration code</Text></View> */}
                        <TouchableOpacity onPress={() => this.signUp()}><View style={{ margin: 20, backgroundColor: '#FFA700', height: 50, justifyContent: 'center', alignContent: 'center' }}><Text style={{ fontSize: 17, fontWeight: '600', color: 'white', textAlign: 'center' }}>CREATE ACCOUNT</Text></View></TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>

        );
    }
};


//export default HomeScreen;

const mapStateToProps = (state) => ({
    curState: state
});


export default connect(mapStateToProps, {
    fetchSignupIfNeeded,
})(SignUp);

