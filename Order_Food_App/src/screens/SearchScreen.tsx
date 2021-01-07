import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { ApplicationState, ShoppingState, FoodModel, onUpdateCart, UserState } from '../redux';
import { connect } from 'react-redux';
import { SearchBar, ButtonWithIcon, FoodCard } from '../components';
import { FlatList } from 'react-native-gesture-handler';
import { checkExistence, useNavigation } from '../utils';

interface SearchScreenProps{ 

    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onUpdateCart: Function

}

const _SearchScreen: React.FC<SearchScreenProps> = (props) => {

    const { navigate } = useNavigation()

    const [isEditing, setIsEditing] = useState(false)
    const [keyword, setKeyWord] = useState('')

    const { availableFoods } = props.shoppingReducer

    const { Cart } = props.userReducer // check cart
    

    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetailPage', { food: item })
    }
    

return (<View style={styles.container}>

        <View style={styles.navigation}>
            <View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}>
                <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => navigate("HomePage")} width={50} height={50}  />
                <SearchBar onTextChange={ setKeyWord } onEndEditing={() => setIsEditing(false)} didTouch={() => setIsEditing(true)} />
            </View>
        </View>

        <View style={styles.body}>
            <FlatList
                showsVerticalScrollIndicator = {false}
                data={
                    isEditing
                    ?
                    availableFoods.filter((item) => {
                        return item.name.includes(keyword)
                    })
                    : 
                    availableFoods
                }
                renderItem= {({ item }) => <FoodCard onTap={onTapFood} item={checkExistence(item, Cart)} onUpdateCart={props.onUpdateCart} />}
                keyExtractor = { (item) => `${item._id}` }
            />
        </View>
</View>)}


const styles = StyleSheet.create({
    
container: { 
    flex:1, 
    backgroundColor: '#F2F2F2' 
},
navigation: { 
    flex:1, 
    marginTop:50 
},
body: { 
    paddingTop: 15,
    flex:10, 
    justifyContent: 'center', 
    alignItems: 'center' 
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

const SearchScreen = connect(mapStateToProps, { onUpdateCart })(_SearchScreen)

export { SearchScreen }