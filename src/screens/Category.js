import React, { Component } from 'react';
import styled from 'styled-components/native';
import { BackIcon, HamburgerIcon } from './../components/icons';
import { SafeAreaView, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './../components/Elements/Header'
import { StyleSheet } from 'react-native'
import TopBar from './../components/Elements/TopBar';
import HomeCategory from './../components/Elements/HomeCategory';
import HomeOffers from './../components/Elements/HomeOffers';
import HomeBrands from './../components/Elements/HomeBrands';
import ImageSlider from 'react-native-image-slider';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from '../components';
import HomeLatestProducts from './../components/Elements/HomeLatestProducts';
import { fetchCategoryPostsIfNeeded, fetchBrandPostsIfNeeded } from '../actions'
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';


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
  categoryImage: {
     width: 80,
     height: 80,
  },
  brandTitle: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500'
 },
  categoryTitle: {
    top: 5,color: '#000000',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500'
 },
 categoryContener: {
  flexDirection: 'column',
  height: 100
}
})

class CategoryScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      position: 1,
      interval: null,
      category_id: '',
    };

  }
  componentDidMount(prevProps, prevState, snapshot){
    let data = {param1:'reactjs'}
    this.props.fetchCategoryPostsIfNeeded(data);
    this.props.fetchBrandPostsIfNeeded(data);
   // console.log('GrandChild did mount.');
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
  static navigationOptions = ({ navigation }) => ({
    // title: 'Category',
    // tabBarIcon: ({ tintColor }) => (
    //   <Icon name="ios-menu" size={23} color={tintColor} />
    // ),
    title: 'Category',
    drawerTitle: 'Category'
  });


  render() {
    const { navigate } = this.props.navigation;
    let categorylist = []
    let brandlist = []
    if(this.props.curState.Category_Reducer.category_content_posts && this.props.curState.Category_Reducer.category_content_posts.data)
    {
       categorylist = this.props.curState.Category_Reducer.category_content_posts.data
    }
    if(this.props.curState.Brand_Reducer.brand_content_posts && this.props.curState.Brand_Reducer.brand_content_posts.data)
    {
      brandlist = this.props.curState.Brand_Reducer.brand_content_posts.data
    }
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ContainerView style={styles.container}>
        <TopBar notificationCount="9" cartCount="10" isTypeOfBack="back"></TopBar>
          <ScrollView scrollEventThrottle={16} style={styles.container}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{ flex: 1, backgroundColor: 'green', height: 180 }}>
              <ImageSlider
                images={[
                  `http://placeimg.com/640/480/any`,
                  `http://placeimg.com/640/480/any`,
                  `http://placeimg.com/640/480/any`,
                ]}
                position={this.state.position}
                onPositionChanged={position => this.setState({ position })} />
            </View>
            <View style={{ flex: 1,marginTop: 10, backgroundColor: 'white', height: 40, flexDirection: 'row',justifyContent: 'center' }}>
              <Image source={require('./../images/logo.png')} style={{ width: 100, height: 50 }}
                paddingTop={10} /><Text style={{ top: 12, fontSize: 14, fontWeight: '700' }}>Flat 10% super cash upto rs 250</Text>
            </View>
            <View style={{ flex: 1,marginTop: 10, backgroundColor: 'white', height: 105, flexDirection: 'row',justifyContent:'space-between' }}>
            </View>
            <View style={{flex: 1,marginTop: 20, backgroundColor: 'white',flexDirection: 'row',justifyContent:'center'}}>
            <FlatList
                data={categorylist}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                <TouchableOpacity onPress={() =>  navigate('Product', {
                    category_id: item.id,
                  })}>
                    <Text style={styles.categoryTitle}>{item.name}</Text>
                    </TouchableOpacity>
                </View>
                 )}
                numColumns={4}
                keyExtractor={(item, index) => index}
                 />
            </View>
            <View style={{ flex: 1,marginTop: 10, backgroundColor: 'white', height: 40, flexDirection: 'row',justifyContent:'space-between' }}>
              <Text style={{paddingLeft: 20,color: '#000000', top: 12, fontSize: 14, fontWeight: '500' }}>BRANDS COLLECTION</Text>
              <Text style={{paddingRight: 20, top: 12, fontSize: 14, fontWeight: '500' , color:'#0084d1'}}>View all+</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'column',justifyContent: 'center' }}>
            <FlatList style={{marginBottom: 10}}
                data={brandlist}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={{ flex: 1, flexDirection: 'column', margin: 1, borderRadius: 4, borderWidth: 0.5, borderColor: '#d6d7da' }}>
                  <Image source={{uri: 'http://ecommerce-admin.webbuildable.com/storage/brands/' +item.image}}
                        style={{alignSelf: 'center', height: 100, width: 150, resizeMode: 'contain'}}/>
                  <Text style={styles.brandTitle}>{item.title}</Text>
              </View>
                 )}
                numColumns={2}
                keyExtractor={(item, index) => index}
                 />
            </View>
            </View>
          </ScrollView>
        </ContainerView>
      </SafeAreaView>
    );
  }
}

//export default HomeScreen;

const mapStateToProps = (state) => ({
	curState:state
});


export default connect(mapStateToProps, {
	fetchCategoryPostsIfNeeded,fetchBrandPostsIfNeeded,
})(CategoryScreen);
