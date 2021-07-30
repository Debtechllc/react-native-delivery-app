import React, {Component} from 'react';
import styled from 'styled-components/native';
import {BackIcon} from './../components/icons';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Header from './../components/Elements/Header'
import { StyleSheet } from 'react-native'
import TopBar from './../components/Elements/TopBar';
import HomeOffers from './../components/Elements/HomeOffers';
import HomeBrands from './../components/Elements/HomeBrands';
import ImageSlider from 'react-native-image-slider';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from '../components';
import HomeLatestProducts from './../components/Elements/HomeLatestProducts';
import { fetchHomeDataIfNeeded, assign_storage_user,fetchPostsForShoppingListIfNeeded } from '../actions'
import { connect } from 'react-redux';
import { AsyncStorage } from "react-native"
import { getUser } from './../actions/auth'


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

class HomeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      position: 1,
      interval: null,
    };

  }

  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({ position: this.state.position === 2 ? 0 : this.state.position + 1 });
      }, 2000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  componentDidMount(prevProps, prevState, snapshot) {
    let data = { param1: 'reactjs' }
    this.props.fetchHomeDataIfNeeded(data);
    getUser()
    // let UID123_object = {
    //   name: 'Chris',
    //   age: 30,
    //   traits: {hair: 'brown', eyes: 'brown'},
    // };
    // // You only need to define what will be added or updated
    // let UID123_delta = {
    //   age: 31,
    //   traits: {eyes: 'blue', shoe_size: 10},
    // };

    // // AsyncStorage.setItem('UID123', JSON.stringify(UID123_object), () => {
    // //   AsyncStorage.mergeItem('UID123', JSON.stringify(UID123_delta), () => {
    let user = null
    AsyncStorage.getItem('user', (err, result) => {
      user = result
    });
    // //   });
    // // });
    console.log("User ID-" + this.props.curState.Login_Reducer.user_id)
    console.log("Local Storage-" + user)
    if (user) {
      this.props.assign_storage_user(user)
    }
    if (this.props.curState.Login_Reducer && this.props.curState.Login_Reducer.user && this.props.curState.Login_Reducer.user.id) {
      let data = { userID: this.props.curState.Login_Reducer.user.id }
      this.props.fetchPostsForShoppingListIfNeeded(data);

  }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-menu" size={23} color={tintColor} />
    ),
    drawerIcon: ({ tintcolor }) => (
      <Icon name='ios-menu' size={30} />
    ),
  });


  render() {
    let productlist = []
    let cartCount = 0
    let notifCount = 0
    if (this.props.curState.ShoppingList.posts != null && this.props.curState.ShoppingList.posts.jsonresp != null){
      cartCount = this.props.curState.ShoppingList.posts.jsonresp.data.length
    }
    if (this.props.curState.Home.posts && this.props.curState.Home.posts.jsonresp && this.props.curState.Home.posts.jsonresp.data.products){
      console.log("Here is the product list.............")
      productlist = this.props.curState.Home.posts.jsonresp.data.products
      console.log(productlist)
      }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ContainerView style={styles.container}>
          <TopBar notificationCount={notifCount} cartCount={cartCount} isTypeOfBack=""></TopBar>
          <ScrollView scrollEventThrottle={16} style={styles.container}>

            <View style={{ flex: 1, backgroundColor: 'white', height: 40, flexDirection: 'row' }}>
              <Image source={require('./../images/logo.png')} style={{ width: 100, height: 50 }}
                paddingTop={10} /><Text style={{ top: 12, fontSize: 14, fontWeight: '700' }}>Flat 10% super cash upto rs 250</Text>
            </View>


          </ScrollView>

        </ContainerView>
      </SafeAreaView>
    );
  }
}

//export default HomeScreen;

const mapStateToProps = (state) => ({
  curState: state
});


export default connect(mapStateToProps, {
  fetchHomeDataIfNeeded,fetchPostsForShoppingListIfNeeded
})(HomeScreen);
