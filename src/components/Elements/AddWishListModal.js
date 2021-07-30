import React, { Component } from 'react';
import { View, Text, Image } from 'react-native'
import { Alert, Modal, TouchableHighlight, Button, TextInput } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { fetchAddToWishListIfNeeded} from './../../actions'
import RadioGroup from 'react-native-radio-buttons-group';
import { connect } from 'react-redux';
class AddWishListModal extends Component {
    constructor(props){
        super(props)
        this.state = {
          modalVisible: true,
          wish_price: '',
          max_price: '',
          date:'2019-02-04',
          user_id: '808',
          product_id: '',
          immediately: '1',
          formData: {  product_id: "",wish_price: "",max_price: "", date: "", user_id: "", immediately: "" },
          formError: { product_id: "",wish_price: "",max_price: "", date: "", user_id: "", immediately: ""},
          data: [
            {
                label: 'Yes',
                value: "1",
            },
            {
                label: 'No',
                color: '0',
            },
        ],
        };
        const { navigate } = this.props.navigation;
        let productid =  this.props.navigation.state.params.JSON_ListView_Clicked_Item
        this.state.product_id = productid
      }
    closeModal() {
      this.setState({modalVisible:false});
    }
    handleWishPrice = (text) => {
      this.state.formData.wish_price = text
    }
    handleMaxPrice = (text) => {
      this.state.formData.max_price = text
    }
    updateValues(text, filed) {
      //console.warn(text)
      if (filed == 'wish_price') {
  
          this.state.formData.wish_price = text
  
      } else if (filed == 'max_price') {
  
          this.state.formData.max_price = text
  
      }
  }
  addToWishList = (product_id, wish_price, max_price, date, user_id, immediately, prop) => {
    alert('wish_price: ' + wish_price + ' max_price: ' + max_price)
    if (this.state.formData.wish_price == "") {
        alert("Please enter wish price.")
        return
    }
  else  if (this.state.formData.max_price == "") {
      alert("Please enter max price.")
      return
  }
 else if (this.state.formData.date == "") {
      alert("Please select date.")
      return
  }
  else{
   // console.warn(this.state.formData.email,this.state.formData.message)
    let data = {product_id: this.state.formData.product_id,wish_price: this.state.formData.wish_price, max_price: this.state.formData.max_price, date: this.state.formData.date, user_id: this.state.formData.user_id, immediately: this.state.formData.immediately}
    prop.fetchAddToWishListIfNeeded(data);
    return
  }
  }
  onPress = data => this.setState({ data });
  render() {
    let selectedButton = this.state.data.find(e => e.selected == true);
        selectedButton = selectedButton ? selectedButton.value : this.state.data[0].label;
        let responseErrorCheck = ''
        let responseMessage = 'Successfully saved to wish list'
        //console.warn('checkResponse',this.props.curState.AddToWish_Reducer.add_to_wish_list_content)
        if(this.props.curState.AddToWish_Reducer.add_to_wish_list_content.jsonresp)
        {
            responseErrorCheck = this.props.curState.AddToWish_Reducer.add_to_wish_list_content.jsonresp.UserWishlist.id
           if (responseErrorCheck == '') {
               alert(responseMessage)
               
           } else {
               alert("Sending failed")
               
           }
        }
    return (
         <Modal
                   visible={this.state.modalVisible}
                   transparent={false}
                  // animationType={'slide'}
                   onRequestClose={() => this.closeModal()} >
               <View style={{flexDirection: 'column'}}>
                 <View >
                    <Text style={{ marginTop: 30, fontSize: 18,marginLeft: 20,marginRight: 20, fontWeight: '600', color: '#565656', textAlign: 'center' }}>{item.name}</Text>
                    <Text style={{ marginTop: 10, fontSize: 16,marginLeft: 20,marginRight: 20, fontWeight: 'bold', color: '#565656', textAlign: 'center' }}>{item.price_text}</Text>
                    <Text style={{ marginTop: 20, fontSize: 16,marginLeft: 20,marginRight: 20, fontWeight: 'bold', color: '#0080FF'}}>Enter wish price:</Text>
                   <View style={{height: 50,marginLeft: 20,marginRight: 20,marginTop: 5}}>
                    <TextInput
                        style={{height: 50,padding: 10,textAlignVertical: 'top',fontSize: 16, borderColor: '#000000', borderWidth: 1,color: '#000000'}}
                       underlineColorAndroid = "transparent"
                       placeholder = "$ 20.00"
                       keyboardType='numeric'
                       placeholderTextColor = "#000000"
                       autoCapitalize = "none"
                       onChangeText = {this.handleWishPrice}
                       />
                   </View>
                   <Text style={{ marginTop: 10, fontSize: 16,marginLeft: 20,marginRight: 20, fontWeight: 'bold', color: '#0080FF'}}>Enter max price:</Text>
                     <View style={{height: 50,marginLeft: 20,marginRight: 20,marginTop: 5}}>
                     <TextInput
                       style={{height: 50,padding: 10,textAlignVertical: 'top',fontSize: 16, borderColor: '#000000', borderWidth: 1,color: '#000000'}}
                       underlineColorAndroid = "transparent"
                       placeholder = "$ 25.00"
                       placeholderTextColor = "#000000"
                       autoCapitalize = "none"
                       keyboardType='numeric'
                       onChangeText = {this.handleMaxPrice}
                       />
                       </View>
                       <Text style={{ marginBottom: 10,marginTop: 20, fontSize: 16,marginLeft: 20,marginRight: 20, fontWeight: 'bold', color: '#0080FF'}}>Notify me:</Text>
                       <View >
                           <Text style={{fontSize: 18, marginBottom: 5,}}>
                                 Value = {selectedButton}
                           </Text>
                           <RadioGroup radioButtons={this.state.data} onPress={this.onPress} flexDirection='row' alignItems= 'left' />
                      </View>
                       <Text style={{ marginBottom: 10,marginTop: 20, fontSize: 16,marginLeft: 20,marginRight: 20, fontWeight: 'bold', color: '#0080FF'}}>Select Date:</Text>
                      <View style={{marginLeft: 20,marginRight: 20}}>
                      <DatePicker
                            style={{width: 200}}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate={new Date()}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            ref="datepicker"
                            customStyles={{
                            dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                                    },
                            dateInput: {
                            marginLeft: 36
                                      }
                           }}
                            onDateChange={(date) => {this.props.onDateChange && this.props.onDateChange(date);this.setState({date: date})}} />
                      </View>
                       <View style={{ marginLeft: 20, marginRight:20,marginTop: 20,height: 50, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ marginTop: 40,marginRight: 10, height: 50, flex: 1.2 }}>
                       <View style={{backgroundColor: '#FFA700', height: 50, justifyContent: 'center', alignContent:'center'}}>
                        <TouchableOpacity onPress={() => this.addToWishList(this.state.product_id,this.props.wish_price, this.props.max_price, this.props.date, this.props.user_id, this.props.immediately, this.props)}><View style={{ margin: 20, backgroundColor: '#FFA700', height: 50, justifyContent: 'center', alignContent: 'center' }}><Text style={{ fontSize: 17, fontWeight:'600', color:'white', textAlign:'center' }}>Add to wish list</Text></View></TouchableOpacity>
                        </View>
                        </View>
                     <View style={{ marginTop: 40,height: 50, flex: 0.8 }}>
                        <View style={{backgroundColor: '#FFA700', height: 50, justifyContent: 'center', alignContent:'center'}}>
                        <TouchableOpacity onPress={() => this.closeModal()}><View style={{ margin: 20, backgroundColor: '#FFA700', height: 50, justifyContent: 'center', alignContent: 'center' }}><Text style={{ fontSize: 17, fontWeight:'600', color:'white', textAlign:'center' }}>Cancel</Text></View></TouchableOpacity>
                        </View>
                     </View>
                   </View>
                   </View>
           </View>
         </Modal>
    );
  }
}
const mapStateToProps = (state) => ({
	curState:state
});
export default connect(mapStateToProps, {
	fetchAddToWishListIfNeeded,
})(AddWishListModal);