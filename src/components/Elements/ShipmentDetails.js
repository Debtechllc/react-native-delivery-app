import React, { Component } from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components/native';
import { View, Text, Image } from 'react-native';
import { StyleSheet } from 'react-native';


class ShipmentDetails extends Component {
    render() {
        const { text, onPress, theme } = this.props;

        return (
            <View>
                <Text style={{ fontSize: 15, fontWeight: '500', marginLeft: 20, fontFamily: 'Verdana', color: '#565656' }}>SHIPMENT DETAILS</Text>
                <View style={{ backgroundColor: 'white', margin: 20, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}><Image source={require('./../../images/shopp1.jpg')} style={{ flex: 1, height: 150, width: 150, margin: 10 }} /></View>
                    <View style={{ alignContent: 'flex-start', marginLeft: -10, flex: 1 }}>
                        <Text style={{ marginTop: 10, fontSize: 13, fontWeight: '500', fontFamily: 'Verdana', color: '#565656' }}>PRINTED DRESS</Text>
                        <Text style={{ marginTop: 10, color: '#565656' }}>SHIPPED</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('./../../images/order_car.png')} style={{ height: 20, width: 35, marginTop: 10 }} />
                            <Text style={{ marginLeft: 5, marginTop: 10, fontSize: 13, fontWeight: '300', fontFamily: 'Verdana', color: '#565656' }}>18th January, 2019</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginTop: 10, fontSize: 13, fontWeight: '300', fontFamily: 'Verdana', color: '#565656' }}>Order Total: </Text>
                            <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 13, fontWeight: '500', fontFamily: 'Verdana', color: '#565656' }}>$120.00</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginTop: 10, fontSize: 13, fontWeight: '300', fontFamily: 'Verdana', color: '#565656' }}>Order Total: </Text>
                            <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 13, fontWeight: '500', fontFamily: 'Verdana', color: '#565656' }}>$120.00</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default withTheme(ShipmentDetails);

