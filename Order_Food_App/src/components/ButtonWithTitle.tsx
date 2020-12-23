import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ImageSourcePropType } from 'react-native';

interface ButtonProps{ 

    onTap: Function;
    width: number;
    height: number;
    title: string;
    isNoBg?: boolean;
    disable?: boolean;

}
const ButtonWithTitle: React.FC<ButtonProps> = ({ onTap, title, width, height, isNoBg = false, disable = false }) => {

    if(isNoBg){

        return (

            <TouchableOpacity disabled={disable} style={[styles.btn, { width, height, backgroundColor: 'transparent' }]} onPress={() => onTap()}>
               <Text style={{ fontSize: 18, color: disable ? '#6F6F6F' : '#3980D9'}}> {title} </Text>
            </TouchableOpacity>

        )

    }else{

        return (

            <TouchableOpacity style={[styles.btn, { width, height }]} onPress={() => onTap()}>
               <Text style={{ fontSize: 18, color: '#FFF'}}> {title} </Text>
            </TouchableOpacity>

        )

    }

}


const styles = StyleSheet.create({

btn: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f14b5d' , 
    width: 69, 
    height: 40, 
    marginTop: 5, 
    borderRadius: 30, 
    alignSelf: 'center' 
},

})

export { ButtonWithTitle }