import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FoodModel,Restaurant } from '../redux';
import { BASE_URL } from '../utils';
import { FlatText } from './../components';

interface AvailableFoodCardProps{ 

    item: Restaurant | FoodModel;
    onTap: Function

 }

 const AvailableFoodCard: React.FC<AvailableFoodCardProps> = ({ item, onTap }) => {
    return (
    
        <View>
        <TouchableOpacity style={ styles.renderItemStyle } onPress={() => onTap(item)}>
        <View style={ styles.renderItemContent }>
            <Image style={ styles.renderItemImg } source={{ uri: `${BASE_URL}images/${item.images[0]}` }} />
            <View style={ styles.renderItemBadge }>
                <FlatText color="#fff" font="q_semibold" text={item.name} sizeText={12} />
            </View>
        </View>
        </TouchableOpacity>
        </View>
    
        
        
    )}
    
    
    const styles = StyleSheet.create({
        
        renderItemStyle: {
            marginRight: 15, 
            marginBottom: 15, 
            marginTop: 15
        },
        renderItemContent: {
            backgroundColor: '#fff', 
            borderRadius: 10
        },
        renderItemImg: {
            width: 190, 
            height: 150, 
            borderRadius: 5
        },
        renderItemBadge: {
            position: 'absolute', 
            bottom: 15, 
            color: '#fff', 
            left: 15, 
            backgroundColor: '#C01C27', 
            borderRadius: 5, 
            paddingHorizontal: 10, 
            paddingVertical: 6
        }
        
    })
    
    export { AvailableFoodCard }