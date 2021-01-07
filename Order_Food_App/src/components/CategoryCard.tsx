import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Category } from '../redux';

interface CategoryProps{ 

    item: Category;
    onTap: Function;

 }
const CategoryCard: React.FC<CategoryProps> = ({ item, onTap }) => {

return (

    <TouchableOpacity onPress={() => onTap(item)} style={styles.renderCategory}>
                <View style={styles.renderBg}>
                    <ImageBackground style={styles.categoryBgImg} imageStyle={styles.categoryImageStyle} source={{uri: `${item.icon}`}}>
                        <View style={styles.overlay} />
                        <View style={styles.categoryNameStyle}>
                            <Text style={{ color: "#fff", fontSize: 14 }} >{item.title}</Text>
                        </View>
                    </ImageBackground>
                </View>
    </TouchableOpacity>

)}


const styles = StyleSheet.create({

    renderCategory: {
        marginRight: 15, 
        marginBottom: 15, 
        marginTop: 15
    },
    renderBg: {
        backgroundColor: '#fff', 
        borderRadius: 10
    },
    categoryBgImg: {
        width: 150, 
        height: 150,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryImageStyle: {
        borderRadius: 15
    },
    categoryNameStyle: {
        backgroundColor: '#C01C27', 
        borderRadius: 5, 
        paddingHorizontal: 10, 
        paddingVertical: 6
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 100
    },
})

export { CategoryCard }