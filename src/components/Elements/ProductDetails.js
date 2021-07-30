import React, { Component } from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components/native';
import { View, Text, Image } from 'react-native';
import { StyleSheet } from 'react-native';


class ProductDetails extends Component {
    render() {
        const { text, onPress, theme } = this.props;

        return (
        <View>
            <Text style={{ marginTop: 20, fontSize: 15, fontWeight: '500', marginLeft: 20, fontFamily: 'Verdana', color: '#565656' }}>VIEW PRODUCT DETAILS</Text>
            <View style={{ backgroundColor: 'white', margin: 20, height: 100 }}>
                <Text style={{ marginTop: 10, fontSize: 13, fontWeight: '500', marginLeft: 20, fontFamily: 'Verdana', color: '#565656' }}>ORDER NUMBER-123456</Text>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Image source={require('./../../images/order_car.png')} style={{ height: 20, width: 35, margin: 10 }} />
                    <Text style={{ marginTop: 10, fontSize: 13, fontWeight: '300', fontFamily: 'Verdana', color: '#565656' }}>18th January, 2019</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Text style={{ marginLeft: 10, fontSize: 13, fontWeight: '300', fontFamily: 'Verdana', color: '#565656' }}>Order Total: </Text>
                    <Text style={{ marginLeft: 10, fontSize: 13, fontWeight: '500', fontFamily: 'Verdana', color: '#565656' }}>$120.00</Text>
                </View>
            </View>
        </View>
        );
    }
}

export default withTheme(ProductDetails);




