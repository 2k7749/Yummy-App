import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native';
import { FoodModel } from '../redux';
import { ButtonAddRemove } from './ButtonAddRemove';

const screenWidth = Dimensions.get('screen').width;

interface FoodCardInfoProps{ 

    item: FoodModel;
    onTap: Function;
    onUpdateCart: Function;

 }

const FoodCardInfo: React.FC<FoodCardInfoProps> = ({ item, onTap, onUpdateCart }) => {

    const didUpdateCart = (unit: number) => {

       item.unit = unit;
       onUpdateCart(item);
       //function update cart 

    }

return (

<View style={styles.container}>
    <View style={{ display:'flex', flex:1, flexDirection: 'row', justifyContent: 'space-around' }}>
        <View style={{ display: 'flex', flex: 8, padding: 10, marginTop: 10, paddingLeft: 20 }}>
            <Text style={{ fontSize: 15 , fontWeight: '600' }}>{item.name}</Text>
            <Text style={{ fontSize: 13 , fontWeight: '600' }}>{item.category}</Text>
        </View>
        <View style={{ display: 'flex', flex: 4, padding: 10, justifyContent: 'space-around', alignItems: 'center', marginRight:  15}}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#7C7C7C' }}>{item.price}₫</Text>
            <ButtonAddRemove onAdd={() => {
                let unit = isNaN(item.unit) ? 0 : item.unit;
                didUpdateCart(unit + 1);
            }} 
            onRemove={() => {
                let unit = isNaN(item.unit) ? 0 : item.unit;
                didUpdateCart(unit > 0 ? unit -1 : unit);
            }} 
            unit={item.unit}/>
        </View>
    </View>
</View>

)}


const styles = StyleSheet.create({

container: { 
    flex: 1, 
    width: screenWidth - 20, 
    margin: 10, 
    borderRadius: 20, 
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
}

})

export { FoodCardInfo }