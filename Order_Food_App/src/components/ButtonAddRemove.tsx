import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native';

interface ButtonProps{ 

    onAdd: Function;
    unit: number;
    onRemove: Function;
    //isAdded: Boolean // for later use

 }

const ButtonAddRemove: React.FC<ButtonProps> = ({ onAdd, unit, onRemove }) => {

        if(unit > 0){
            return (

                <View style={ styles.optionsView }>
                    <TouchableOpacity style={ styles.btnPlusMinus } onPress={() => onRemove()}>
                    <Text style={{ fontSize: 20, color: '#f14b5d' }}> -</Text>
                    </TouchableOpacity>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 40 }}>
                            <Text style={{ fontSize: 25, fontWeight: '600', textAlign: 'center', color: '#f14b5d' }}>{unit}</Text>
                        </View>
                    <TouchableOpacity style={ styles.btnPlusMinus } onPress={() => onAdd()}>
                    <Text style={{ fontSize: 20, color: '#f14b5d' }}> +</Text>
                    </TouchableOpacity>
                </View>

            )
        }else{
            return (

                <TouchableOpacity style={ styles.btn } onPress={() => onAdd()}>
                    <Text style={{ fontSize: 20, color: '#FFF' }}> Add </Text>
                </TouchableOpacity>
                
            )
        }

}


const styles = StyleSheet.create({

    btn: { 
        flex:1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 80, height: 40, 
        alignSelf: 'center', 
        borderRadius: 30, 
        backgroundColor: '#f15b5b' 
    },
    optionsView: { 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    btnPlusMinus: { 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderColor: '#f14b5d', 
        borderRadius: 10, 
        borderWidth: 0.5, 
        height: 58, 
        width: 38 
    },

})

export { ButtonAddRemove }