import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ImageBackground, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ButtonWithIcon, FoodCard, FlatText } from '../components';
import { connect } from 'react-redux';
import { FoodModel, ApplicationState, onUpdateCart, UserState } from '../redux';
import { checkExistence } from '../utils';
import { useNavigation } from '../utils/useNavigation';
import { BASE_URL } from '../utils';

interface FoodDetailProps{ 
    
    userReducer: UserState,
    onUpdateCart: Function,
    navigation: { getParam: Function, goBack: Function }

 }
const _FoodDetailScreen: React.FC<FoodDetailProps> = (props) => {
    
    const { getParam, goBack } = props.navigation;

    const food = getParam('food') as FoodModel

    const { Cart } = props.userReducer;

    const { navigate } = useNavigation() 

return (

    <View style={styles.container}>
           <View style={styles.navigation}>
                 <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={30} height={30} />
                 <Text style={{ fontSize: 22, fontWeight: '600', marginLeft: 60 }}> {food.name} </Text>
           </View>
           <View style={styles.body}>
                <ImageBackground source={{ uri: `${BASE_URL}images/${food.images[0]}`}}
                 style={{ width: Dimensions.get('screen').width, height:250, justifyContent: 'flex-end' }}
                 >
                    <View style={{ height: 120, backgroundColor: 'rgba(0,0,0,0.6)', padding: 10 }}>
                        <Text style={{ color: '#fff', fontSize: 30, fontWeight: '700' }}>{food.name}</Text>
                        <Text style={{ color: '#fff', fontSize: 25, fontWeight: '500' }}>Loại: {food.category}</Text>
                    </View>
                </ImageBackground>
                <View style={{ display: 'flex', height: 150, padding: 20 }}>
                    <FlatText text={'Thức ăn được ra lò trong vòng' + food.readyTime +' Phút(s)'} color="#000" sizeText={14} font="q_regular"/>
                    <FlatText text={food.description} color="#f15b5d" sizeText={25} font="q_regular"/>
                </View>
                <View style={{ height: 120 }}>
                <FoodCard item={checkExistence(food, Cart)} onTap={() => {}} onUpdateCart={props.onUpdateCart}/>
                </View>
           </View>
</View>

)}


const styles = StyleSheet.create({
    
container: { 
    flex:1, 
    backgroundColor: '#F2F2F2' 
},
navigation: { 
    flex:1, 
    marginTop: 43, 
    paddingLeft: 10, 
    flexDirection: 'row', 
    alignItems: 'center' 
},
body: { 
    flex:11, 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    paddingBottom: 160 
},
footer: { 
    flex:1, 
    backgroundColor: 'cyan' 
}

})

const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
 })
 
 const FoodDetailScreen = connect(mapStateToProps, { onUpdateCart })(_FoodDetailScreen)
 
 export { FoodDetailScreen }