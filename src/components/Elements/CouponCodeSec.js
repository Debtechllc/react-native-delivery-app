import React, { Component } from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components/native';
import { View, Text, Image, Button } from 'react-native';
import { StyleSheet } from 'react-native';


class CouponCodeSec extends Component {
    render() {
        const { text, onPress, theme } = this.props;

        return (
            <View>
                <View style={{ marginLeft: 20, marginRight: 20, backgroundColor: 'white', marginTop: 10, marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#565656', margin: 10, fontWeight: '600' }}>COUP123</Text>
                        <Text style={{ color: '#0073B7', margin: 10, fontWeight: '600' }}>$50 CASH BACK</Text>
                    </View>
                    <Text style={{ color: '#565656', margin: 10, }}>Use the color picker by clicking and dragging your cursor inside the picker area to highlight a color on the right. Input Hex, RGB, HSL or CMYK values to search for a particular color in the fields below the color swatch; click the swatch to add it to your palette. After selecting a color, experiment with different harmonies by using the dropdown below the color picker.</Text>
                </View>
            </View>
        );
    }
}

export default withTheme(CouponCodeSec);
