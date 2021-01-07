import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions,Image, FlatList, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { useNavigation } from '../utils';

import { connect } from 'react-redux';
import { ButtonWithIcon, CategoryCard, SearchBar, FlatText } from '../components';
import { RestaurantCard } from '../components/restaurantCard'
import { AvailableFoodCard } from '../components/AvailableFoodCard';
import { onAvailability, UserState, ApplicationState, ShoppingState, Restaurant, FoodModel, onSearchFoods } from '../redux';
import { SimpleLineIcons } from "@expo/vector-icons";


import { LogBox } from 'react-native';

interface HomeProps{

    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onAvailability: Function,
    onSearchFoods: Function
    
}

const _HomeScreen: React.FC<HomeProps> = (props) => {

    const { navigate } = useNavigation()

    const { location, user } = props.userReducer;
    const { availability } = props.shoppingReducer 

    const { categories, foods, restaurants } = availability // Get DATA FROM REDUCER
    
    useEffect(() => {
        LogBox.ignoreLogs(["Require cycle"]);
        props.onAvailability(location.postalCode)
        // const localx = JSON.stringify(location)
        // console.log(`${localx}`);
        setTimeout(() => {
            props.onSearchFoods('700000') // PUSH POSTALCODE TO REDUCER
        }, 1000)
    }, [])

    const onTapRestaurant = (item: Restaurant) => {
        navigate('RestaurantPage', { restaurant: item })
    }

    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetailPage', { food: item })
    }

    return (
        <View style={styles.container}>
            <View style={ styles.headerContainer }>
                <View>
                    <FlatText
                        text="Địa chỉ nhận"
                        font="q_semibold"
                        color="#333"
                        sizeText={17}
                    />
                    <View style={ styles.dFlex }>
                        <SimpleLineIcons
                        style={ styles.locationIcon }
                        name="location-pin"
                        size={15}
                        color="#666"
                        />
                        <FlatText
                        text={`${location.name},${location.street},${location.city}`}
                        font="q_medium"
                        color="#666"
                        sizeText={14}
                        />
                    </View>
                </View>
                {(() => {
                    // console.log(user.verified)
                    if ( user.verified ) {
                        return (
                        <View>
                            <Image
                            style={ styles.profileImg }
                            source={{ uri: "https://ui-avatars.com/api/?background=random&size=100&name=" + user.email }}
                            />
                        </View>
                        )
                    }
                    return null;
                })()}
            </View>
            <View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}>
                <SearchBar 
                didTouch={() => {
                    navigate('SearchPage')
                }}
                onTextChange={() => { }} />
                {/* <ButtonWithIcon onTap={() => {}} icon={require('../images/hambar.png')} width={50} height={40} /> */}
            </View>
                
            <View style={styles.body}>
                <ScrollView>

                    {/* CateGory List */}
                    <View style={styles.marginBottomView}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={ categories }
                            renderItem={ ({ item }) => <CategoryCard item={item} onTap={() => { alert('Category Tapped') }} /> }
                            keyExtractor={ (item) => `${item.id}` }
                            />
                    </View>
                
                    <View>
                    <View style={styles.row}>
                        <FlatText text="Top Nhà Hàng" color="#f15b5d" sizeText={25} font="q_regular" marginLeft={20} />
                        <TouchableOpacity onPress={() => console.log('MORE RESTAURANT')} style={styles.paddingLeft}><FlatText text=" Làm mới" color="#333" sizeText={20} font="q_regular" /></TouchableOpacity>
                    </View>
                    <View>
                    
                    </View>

                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={ restaurants }
                        renderItem={({ item }) => <RestaurantCard item={item} onTap={ onTapRestaurant } />}
                        keyExtractor={(item) => `${item._id}`}
                    />
                    </View>

                    <View>
                    <FlatText text="Thức ăn nhanh" color="#f15b5d" sizeText={25} font="q_regular" marginLeft={20} />
                    </View>

                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={ foods }
                        renderItem={({ item }) =>  <AvailableFoodCard item={item} onTap={ onTapFood } /> }
                        keyExtractor={ (item) => `${item._id}` }
                    />

                </ScrollView>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor: '#FFF'
    },
    body:{
        flex:9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer:{
        flex: 1,
    },
    marginBottomView: {
        marginTop: 10,
        marginBottom: 10
    },
    row: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    paddingLeft: {
        marginBottom: 10
    },
    
    //Header
    headerContainer: {
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    profileImg: {
        width: 45,
        height: 45,
        borderRadius: 60,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    location: {
        fontSize: 14,
        color: "#666",
    },
    dFlex: {
        flexDirection: "row",
    },
    arrowIcon: {
        paddingLeft: 5,
        paddingTop: 1,
    },
    locationIcon: {
        marginTop: 4,
        marginRight: 5
    }

})

const mapStateToProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

const HomeScreen = connect(mapStateToProps, { onAvailability, onSearchFoods })(_HomeScreen)

export { HomeScreen }