import React, {Component} from 'react';
import styled from 'styled-components/native';
import {SafeAreaView, View, Text, Image, TextInput} from 'react-native';

import {connect} from 'react-redux';
import {fetchLoginIfNeeded} from '../actions';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {AsyncStorage} from 'react-native';
import {withNavigation} from 'react-navigation';

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
    flexDirection: 'column',
    backgroundColor: '#FFFFFF'
  },
  underline: {
    textDecorationLine: 'underline',
    color: 'white',
    fontSize: 18,
    marginLeft: 5,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#DBA901',
    padding: 10,
    height: 45,
    top: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  },
  backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
})

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formData: { email: "", password: "" },
      formError: { email: "", password: "", }
    };
  }
  handleEmail = (text) => {
    this.state.formData.email = text
  }
  handlePassword = (text) => {
    this.state.formData.password = text
  }
  login = (email, pass, prop) => {
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
    let data = { "email": this.state.formData.email, "password": this.state.formData.password}
    prop.fetchLoginIfNeeded(data);

  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Login',
    drawerTitle: 'Login',
    drawerIcon: ({ tintcolor }) => (
      <Image source={require('./../images/login.png')}
        style={{ height: 25, width: 25 }} />
    ),
  });

  validatePassword(text) {
    var re = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (re.test(text) === false) {
      alert("Password is Not Correct");
      this.state.formError.password = "error"
      //return false;
    }
    else {
      // this.setState({email:text})
      this.state.formError.password = ""
      console.warn("Password is Correct");
    }
  }

  validateEmail(text) {
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
  componentDidMount() {

  }
  componentWillUnmount() {
    this.state = {
      email: '',
      password: '',
      formData: { email: "", password: "" },
      formError: { email: "", password: "", }
    };
  }


  render() {
    let userLoginData = []
    let UID_object = null
    if (this.props.curState.Login_Reducer && this.props.curState.Login_Reducer.error == 1 ){
      alert(this.props.curState.Login_Reducer.message);
      AsyncStorage.setItem('User', JSON.stringify(UID_object), () => {

      });
    }
    else if (this.props.curState.Login_Reducer.user && this.props.curState.Login_Reducer.user.id) {
      userLoginData = this.props.curState.Login_Reducer.user
        UID_object = {
          user: userLoginData,
          user_id: userLoginData.id
        };
          AsyncStorage.setItem('User', JSON.stringify(UID_object), () => {
            console.log("Local storage data - " + UID_object);
        });
        this.props.navigation.navigate('Auth');
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ContainerView style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'column', position: 'absolute' }}>
                <Image source={require('./../images/loginbg.jpg')} style={styles.backgroundImage} />


            <View style={{ height: 80 }}>
              <Text style={{ top: 10, fontSize: 20, color: '#fff', fontWeight: '100', textAlign: 'center' }}>
                Login to get personolized experience {'\n'} & quick check out</Text>
            </View>
            <View style={{ height: 55 }}>
              <TextInput
                style={{ height: 40, borderColor: '#fff', borderWidth: 0.5, color: '#fff' }}
                underlineColorAndroid="transparent"
                placeholder="Enter  Email"
                placeholderTextColor="#fff"
                autoCapitalize="none"
                keyboardType={'email-address'}
                onChangeText={this.handleEmail}
                onEndEditing={() => this.validateEmail(this.state.formData.email)}
              />
            </View>
            <View style={{ height: 55 }}>
              <TextInput
                style={{ height: 40, borderColor: '#fff', borderWidth: 0.5, color: '#fff', paddingLeft: 5 }}
                underlineColorAndroid="transparent"
                placeholder="Enter  Password"
                placeholderTextColor="#fff"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={this.handlePassword}
                onEndEditing={() => this.validatePassword(this.state.formData.password)}
              />
            </View>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={
                () => this.login(this.state.email, this.state.password, this.props)
              }>
              <Text style={styles.loginButtonText}> LOG IN </Text>
            </TouchableOpacity>
            <View style={{ height: 40 }}>
              <Text style={{ top: 20, fontSize: 18, color: '#fff', fontWeight: '100', textAlign: 'center' }}>
                Forgot password?</Text>
            </View>



          </View>
        </ContainerView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => ({
  curState: state
});


export default connect(mapStateToProps, {
  fetchLoginIfNeeded,
})(withNavigation(LoginScreen));
