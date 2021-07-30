import React, { Component } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { fetchProductDetailsIfNeeded } from '../actions'
import GridView from 'react-native-super-grid';
import productDe from './../components/Elements/ProductItem';
import { StyleSheet, SafeAreaView, Animated, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import TopBar from './../components/Elements/TopBar';
import { common_styles as styles } from './../css/style'
import ProductDetailsImageGallery from './../components/Elements/ProductDetailsImageGallery';
import { View, Text, Image, Dimensions, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { fetchAddToCartIfNeeded, fetchPostsForShoppingListIfNeeded } from '../actions';
import Modal from "react-native-modal";

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;
var {height, width} = Dimensions.get('window');

const TitleText = styled.Text`
  fontSize: 30;
  color: ${props => props.theme.WHITE};
`;

class ProductDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productdetails:{"name":"Loading..."},
            productCount : 0,
            product_slug: "",
            isModalVisible: false
        }
      }
    componentDidMount(prevProps, prevState, snapshot) {
        console.log("Item slug - " + this.props.navigation.getParam('product_slug'))
        const product_slug = this.props.navigation.getParam('product_slug');
        let data = { "slug": product_slug };
       // console.warn(data);
        this.props.fetchProductDetailsIfNeeded(data);
        //console.warn("started fetching.....")
        
        
    }

    showAlert() {
        this.addToCart(this.props)
    }
    
    addToWishList = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
      };

    addToCart = (prop) => {
        if (this.props.curState.Login_Reducer && this.props.curState.Login_Reducer.user && this.props.curState.Login_Reducer.user.id) {
            let data = { "product_id": productdetails.id, "user_id": this.props.curState.Login_Reducer.user.id }
            this.props.fetchAddToCartIfNeeded(data);
                let data2 = { userID: this.props.curState.Login_Reducer.user.id }
                this.props.fetchPostsForShoppingListIfNeeded(data2);

        }
        else{
            this.props.navigation.navigate('Login');
        }

    }


    static navigationOptions = {
        title: 'ProductDetails'
    };

    checkAttribute = () => {
        if (productdetails && productdetails.attrs && productdetails.attrs.length > 0) {
            //  alert(productdetails.attrs[0].name)
                return(
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', margin:5 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 10, marginRight: 10, color: 'gray', padding: 10 }}>
                            {productdetails.attrs[0].name}:
                        </Text>
                        <FlatList
                                horizontal={true}
                                data={productdetails.attrs[0].attr_values}
                                renderItem={({ item }) => <View>
                                                            <Image style={{width: 50, height: 50}}
                                                            source={{uri: item.image}}/>
                                                        </View>}
                                keyExtractor={item => item.id}
                            />
                    </View>
                )
               
        }
        
    } 
    render() {
        let productName = "Latest Leather Suits"
        let productDescription = "Wow the product is amazing...weighing so light just 2 kg and spacious i giftted to my mom dad Omg! Their reaction was lovely ...loved it completely Excellent purchase in 2075/- worth the price as well as superfast delivery by Flipkart order it today receive it next day"
        let productPrice = "200"
        let productOriginalPrice = "300"
        let additionalCharges = 'Additional charges applicable, will be charged at checkout.'
        let arrSizes = ["XS", "S", "M", "L", "XL", "XXL"]
        let sizeViewArray = arrSizes.map(size => (
            <View style={{ height: 40, width: 40, backgroundColor: '#ddd', justifyContent: 'space-around' }}><Text style={{ textAlign: 'center', alignContent: 'center' }}>{size}</Text></View>
        ))
        let addToCartData = []
        if (this.props.curState.AddToCart.isFetching==true){
            return(   
                 <View style={{flex: 1, backgroundColor:'#FFF', justifyContent:'center', alignContent:'center'}}><ActivityIndicator size="large" color="#0000ff" /></View>
            )
        }

        if (this.props.curState.AddToCart.posts.jsonresp ) {
             addToCartData = this.props.curState.AddToCart.posts.jsonresp
            // console.log("Error for the responce " + addToCartData.error);
                alert(addToCartData.message)
        }
        
        //console.warn(this.props.curState)
        productdetails={"id":0,"name":"Loading...","price":"Loading...","description":"Loading...","default_image":{"image":"data:image/png;base64,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"}}
        if (this.props.curState.Product_Details_Reducer.product_detais && this.props.curState.Product_Details_Reducer.product_detais.data) {
            productdetails = this.props.curState.Product_Details_Reducer.product_detais.data             
            //console.warn(productdetails.name)
       }
       let productCount = 0
        if (this.props.curState.ShoppingList.posts.jsonresp) {
            let productlist = this.props.curState.ShoppingList.posts.jsonresp.data
            console.warn(productlist)
            productCount =  productlist.length
            console.warn("product count "+productCount)
        }
        var productImages = productdetails.images
        
        var gallery = []
        if (productImages != null){
                for (let i = 0; i < productImages.length; i++) {
                    gallery.push(
                        <View key={i}>
                        <ProductDetailsImageGallery height={300} width={Dimensions.get('window').width} imageUrl={productImages[i].image}/>
                        </View>
                    );
                }
            }
                var stars = []
                for (let i = 0; i < 5; i++) {
                    stars.push(
                        <View key={i}>
                        <Image style={{height:25, width:25}} source={require('../images/star.png')}/>
                        </View>
                    );
                }
                var productReviewCount = productdetails.reviews
                if  (productReviewCount == null){
                    productReviewCount = 0
                }
       
       
        return (
            <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
                <TopBar notificationCount="" cartCount={productCount} isTypeOfBack="back"></TopBar>
                <ScrollView scrollEventThrottle={16}>
                <View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled={true}>
                       {gallery}
                    </ScrollView>
                    <View style={{position: 'absolute',  flex: 1, top: 0,  right: 10, bottom: 10}}>
                        {/* <Image source={{uri: 'https://www.parentpower.com.au/grace2_files/pp/images/cart.png'}}  style={{ height: 30, width: 30, resizeMode: 'cover' ,padding: 20, top: 5}} /> */}
                        <TouchableOpacity onPress={()=>alert("Like!")}><Image source={{uri: 'https://www.freeiconspng.com/minicovers/heart-icon-14.png'}}  style={{ height: 30, width: 30, resizeMode: 'cover' ,padding: 20, top: 15}} /></TouchableOpacity>
                    </View>
                </View>
                    
                    <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: 10, marginRight: 10, color: 'gray', padding: 10 }}>{productdetails.name}</Text>
                    <View style={{ marginLeft:20, justifyContent:'center'}}>
                         <View flexDirection='row'>{stars}
                            <Text style={{marginTop:2, paddingLeft:10, color:'gray'}}>({productReviewCount.length} reviews)</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginLeft:20, marginTop:10, marginBottom:10, fontSize: 20, fontWeight: '600', color: 'orange' }}>Price: ${productdetails.calculated_price}</Text>
                        {/* <Text style={{ fontSize: 20, fontWeight: '600', margin: 10, color: 'gray', textDecorationLine: 'line-through' }}>${productdetails.price}</Text>
                        <Text style={{ fontSize: 20, fontWeight: '600', margin: 10, color: 'red' }}>(30% off)</Text>
                        <Image source={{ uri: 'https://first.dentist/wp-content/uploads/2017/03/free-offer-icon-photos-31.jpg' }} style={{ height: 40, width: 40, resizeMode: 'cover' }} /> */}
                    </View>
                    
                    <Text style={{ fontSize: 14, fontWeight: '300', marginLeft: 20, marginRight: 20, color: 'gray' }}>{productdetails.description}</Text>
                    
                    {this.checkAttribute()}
                        
                    
                    {/* <Text style={{ fontSize: 11, fontWeight: '300', margin: 10, color: 'gray' }}>{additionalCharges}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#f5f5f5', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', margin: 10, color: 'gray' }}>TAP FOR BEST PRICE</Text>
                        <Icon name="ios-arrow-down" size={25} color="#565656" style={{ marginRight: 20 }} />
                    </View>
                    <View>
                        <View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Text style={{ fontSize: 14, fontWeight: '300', margin: 10, color: 'gray' }}>Flat $20 cash back on Phone pa</Text>
                                <Text style={{ fontSize: 14, fontWeight: '500', margin: 10, color: '#0080ff' }}>T&C</Text>
                            </View>
                            <Text style={{ fontSize: 12, fontWeight: '300', marginLeft: 10, marginRight: 10, marginTop: 0, marginBottom: 5, color: 'gray' }}>I want to display a marker if the points is greater than or equal than the cost of the marker. If it is lower than that, it should not render on the view.</Text>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#f5f5f5' }}></View>
                        </View>
                        <View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Text style={{ fontSize: 14, fontWeight: '300', margin: 10, color: 'gray' }}>Flat $20 cash back on Phone pa</Text>
                                <Text style={{ fontSize: 14, fontWeight: '500', margin: 10, color: '#0080ff' }}>T&C</Text>
                            </View>
                            <Text style={{ fontSize: 12, fontWeight: '300', marginLeft: 10, marginRight: 10, marginTop: 0, marginBottom: 5, color: 'gray' }}>I want to display a marker if the points is greater than or equal than the cost of the marker. If it is lower than that, it should not render on the view.</Text>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#f5f5f5' }}></View>
                        </View>
                    </View> */}

                    {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ fontSize: 14, fontWeight: '300', margin: 10, color: 'gray' }}>SELECT SIZE</Text>
                        <Text style={{ fontSize: 14, fontWeight: '500', margin: 10, color: '#ffa800' }}>Size Chart</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', height: 50, justifyContent: 'space-around', margin: 10, alignContent: 'flex-start' }}>{sizeViewArray}</View> */}

                </ScrollView>
                <View style={{ marginBottom: 5, backgroundColor: '#ddd', height: 50, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity onPress={() => this.addToWishList()} style={{ alignItems: 'center', justifyContent: 'center', }}>
                        <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ddd' }} width={Dimensions.get('window').width / 2 - 0.5}>
                            <Icon name="ios-heart" size={25} color="#565656" />
                            <Text style={{ color: '#565656', marginLeft: 20 }}>ADD TO WISHLIST</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.addToCart()} style={{ alignItems: 'center', justifyContent: 'center', }}>
                        <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffa800' }} width={Dimensions.get('window').width / 2 - 0.5}>
                            <Icon name="md-basket" size={25} color="white" />
                            <Text style={{ color: 'white', marginLeft: 20 }}>ADD TO BAG</Text>
                        </View></TouchableOpacity>
                </View> 
                <View>
                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={{ flex: 1, backgroundColor:'white', marginTop:50, marginBottom:50 }}>
                            <Text style={{fontSize:20, fontWeight:'600', color:'gray', padding:20}}>{productdetails.name} (${productdetails.price})</Text>
                            <Image style={{width: 100, height: 100, marginLeft:20}}
                             source={{uri: productdetails.default_image.image200}}/>
                        </View>
                    </Modal>
                 </View>  
            </SafeAreaView>
            
        );
    }
}

//export default ProductDetails;
const mapStateToProps = (state) => ({
    curState: state
});


export default connect(mapStateToProps, {
    fetchAddToCartIfNeeded,
    fetchProductDetailsIfNeeded,
    fetchPostsForShoppingListIfNeeded,
})(ProductDetails);