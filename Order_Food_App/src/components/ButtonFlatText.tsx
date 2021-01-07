import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ImageSourcePropType } from 'react-native';
import { FlatText } from './../components';

interface ButtonFlatProps{ 

    onTap: Function;
    size: number;
    color: string;
    title: string;
    disable?: boolean;

}
const ButtonFlatText: React.FC<ButtonFlatProps> = ({ onTap, title, size, color }) => {

        return (
            <View>
                <TouchableOpacity style={styles.btn} onPress={() => onTap()}>
                <FlatText text={ title } font="q_semibold" sizeText={ size } color={ color } />
                </TouchableOpacity>
            </View>

            // <TouchableOpacity style={[styles.btn, { width, height }]} onPress={() => onTap()}>
            //    <Text style={{ fontSize: 18, color: '#FFF'}}> {title} </Text>
            // </TouchableOpacity>

        )

}


const styles = StyleSheet.create({

    btn: {
        alignItems: 'center',
        backgroundColor: '#C01C27',
        paddingVertical: 20,
        borderRadius: 5
    },


})

export { ButtonFlatText }