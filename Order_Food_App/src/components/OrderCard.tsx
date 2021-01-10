import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native';
import { FoodModel, OrderModel } from '../redux';
import { ButtonAddRemove } from './ButtonAddRemove';

import { BASE_URL } from '../utils';

const screenWidth = Dimensions.get('screen').width;

interface OrderCardProps{ 

    item: FoodModel;
    onTap: Function;

 }

const OrderCard: React.FC<OrderCardProps> = ({ item, onTap }) => {

    const formatCurrency = (amount: number) => {
        return Number(amount)
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+$)/g, '$&,');
    }

return (

    <View style={styles.container}>
    <Image source={{ uri: `${BASE_URL}images/${item.images[0]}`}} style={{ width: 100, height: 100, borderRadius: 20, backgroundColor: '#EAEAEA' }}/>
    <TouchableOpacity onPress={() => onTap(item)} style={{ display:'flex', flex:1, flexDirection: 'row', justifyContent: 'space-around'}}>
        <View style={{ display: 'flex', flex: 7, padding: 10 }}>
            <Text>{item.name}</Text>
            <Text>Loại: {item.category}</Text>
        </View>
        <View style={{ display: 'flex', flex: 5, padding: 2, justifyContent: 'space-around', alignItems: 'center', marginRight: 10, alignContent:'flex-start', alignSelf: 'flex-start'}}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#7C7C7C' }}>Giá: {formatCurrency(item.price)} ₫</Text>
            {/* BUTTON */}
        </View>
    </TouchableOpacity>
</View>

)}


const styles = StyleSheet.create({

container: { 
    flex: 1, 
    width: screenWidth - 20, 
    margin: 10, 
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20, 
    backgroundColor: '#FFF', 
    height: 100, 
    justifyContent: 'flex-start', 
    borderWidth: 1, 
    borderColor: '#E5E5E5', 
    flexDirection: 'row'
},
navigation: { 
    flex: 2, 
    backgroundColor: 'red' 
},
body: { 
    flex: 10, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'yellow' 
},
footer: { 
    flex: 1, 
    backgroundColor: 'cyan' 
},

})

export { OrderCard }