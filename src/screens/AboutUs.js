import React, { Component } from 'react';
import styled from 'styled-components/native';
import { BackIcon, HamburgerIcon } from './../components/icons';
import { SafeAreaView, View, Text, Image, Dimensions, ImageBackground, TouchableOpacity, TextInput } from 'react-native'

import Icon from 'react-native';
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
import { fetchAboutUsIfNeeded } from '../actions'
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

class AboutUsScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };

    }



    componentDidMount(prevProps, prevState, snapshot) {
         let data = {param1:'null'}
         this.props.fetchAboutUsIfNeeded(data);
        console.log('GrandChild did mount.');
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'About us',
        drawerTitle: 'About us',
        drawerIcon: ({ tintcolor }) => (
            <Image source={require('./../images/aboutus.png')}
                style={{height: 25,width: 25}}/>
           // <Icon name='ios-menu' size={30} />
        ),
    });

    render() {
      let responseData = []
      let title = ''
      let content = ''
     // console.warn('checkResponse',this.props.curState.AboutUs)
      if(this.props.curState.AboutUs.about_us_content.jsonresp)
      {
        responseData = this.props.curState.AboutUs.about_us_content.jsonresp.data
        title=responseData[0].title
        content=responseData[0].content
      }
      return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fdfdfd' }}>
                <View style={{ height: 50, flexDirection: 'row', backgroundColor: '#0084d3' }}>
                    <TouchableOpacity style={{ height: 50, justifyContent: 'center',marginLeft: 10, alignItems: 'center' }} onPress={() => this.props.navigation.goBack()}>
                        <Icon name="ios-arrow-back" size={25} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'column' }}>
                <ScrollView contentContainerStyle={{paddingVertical: 10}}>
                <Image source={require('./../images/logo.png')}
                style={{marginTop: 20,height: 70,resizeMode: 'contain',alignSelf: 'center'}}/>
                <Text style={{textAlign: 'center',marginTop: 20,fontSize: 22,color: '#000000',fontWeight: 'bold'}}>{title}
                </Text>
                <Text style={{padding: 5,textAlign: 'center',marginTop: 10,fontSize: 16,color: '#000000'}}>{content}
                </Text>
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
    fetchAboutUsIfNeeded,
})(AboutUsScreen);

