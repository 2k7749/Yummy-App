import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

interface SearchBarProps{ 

    onEndEditing?: any | undefined;
    didTouch?: any | undefined;
    autoFocus?: boolean | undefined;
    onTextChange: Function;

}

const { width, height } = Dimensions.get('screen');


const SearchBar: React.FC<SearchBarProps> = ({ onEndEditing, didTouch, autoFocus = false, onTextChange }) => {
return (


    <View style={styles.searchContent}>
        <TextInput 
            style={styles.searchInput} 
            placeholder="Tìm kiếm món ăn" 
            placeholderTextColor="#a6a6a6" 
            autoFocus={autoFocus}
            onTouchStart={didTouch}
            onChangeText={(text) => onTextChange(text)}
            onEndEditing={onEndEditing}>
            </TextInput>
                        <View style={ styles.currenLocation }>
                            <MaterialIcons name="shopping-basket" size={24} color="#C01C27" />
                        </View>

    </View>

    // <View style={styles.container}>
    // <View style={styles.searchBar}>
    //     <Image style={{ width: 25, height: 25 }} source={require('../images/search.png')}/>
    //     <TextInput
    //         style={{ marginLeft: 5, flex: 9, display: 'flex', fontSize: 20, height: 42 }}
    //         placeholder={"Search Foods"}
    //         autoFocus={autoFocus}
    //         onTouchStart={didTouch}
    //         onChangeText={(text) => onTextChange(text)}
    //         onEndEditing={onEndEditing}
    //     />
    // </View>
    // </View>

)}


const styles = StyleSheet.create({
    searchContent: {
        position:'absolute',
        top:2,
        left:0,
        right: 0
    },
    searchInput: {
        backgroundColor: '#EFEFEF',
        width: width,
        height:60,
        marginLeft:'auto',
        marginRight:'auto',
        paddingLeft: 20,
        paddingRight: 60,
        color:'#222',
        fontWeight: '600',
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    currenLocation: {
        position: 'absolute', 
        right: 35,
        top: 18
    },

})

export { SearchBar }