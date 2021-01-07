import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FoodModel,Restaurant } from '../redux';
import { BASE_URL } from '../utils';
import { FlatText } from './../components'
import { Entypo } from '@expo/vector-icons';

const screenWidth = Dimensions.get('screen').width;

interface RestaurantProps{ 

    item: Restaurant | FoodModel;
    onTap: Function

 }
const RestaurantCard: React.FC<RestaurantProps> = ({ item, onTap }) => {
    return (


        <TouchableOpacity style={ styles.renderfeaureds } onPress={() => onTap(item)}>
            <View>
                <Image style={ styles.imageWidth } source={{ uri: `${BASE_URL}images/${item.images[0]}` }} />
                <View style={ styles.badge}>
                    <FlatText text="Mở cửa" color="#333" font="q_semibold" textalign="center" />
                    <FlatText text="NOW" color="#333" font="q_semibold" textalign="center" />
                </View>

                <View>
                    <View style={ styles.productTitle }>
                        <FlatText text={ item.name } sizeText={16} font="q_semibold" color="#333" />
                        <View>
                            <View style={ styles.productContentFlex }>
                                <Entypo style={ styles.paddingHorizontal5 } name="star" sizeText={15} color="#C01C27" />
                                <FlatText text={ "5 sao" } sizeText={15} font="q_semibold" />
                                <FlatText text={ '( 5 )' } sizeText={15} font="q_regular" />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        
    )}


const styles = StyleSheet.create({

    renderfeaureds: {
        justifyContent: 'space-around', 
        margin: 10, 
        marginTop: 10,
        paddingBottom: 10,
        marginBottom: 10
    },
    imageWidth: {
        width: screenWidth - 20, 
        height: 220
    },
    badge: {
        position: 'absolute', 
        right: 0, 
        top: 0, 
        backgroundColor: '#fff', 
        paddingHorizontal: 15, 
        paddingVertical: 5
    },
    productTitle: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingTop: 5
    },
    productContentFlex: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    paddingHorizontal5: {
        paddingHorizontal: 5
    },
    
})

export { RestaurantCard }