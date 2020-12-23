import React, { useState, useReducer, useEffect } from 'react';
import { View,Text,StyleSheet,Dimensions,Image } from 'react-native';
import * as Location from 'expo-location';

import { connect } from 'react-redux';
import { onUpdateLocation, UserState, ApplicationState } from '../redux';

import { useNavigation } from '../utils';

const screenWidth = Dimensions.get('screen').width // Get Screen Width

let apiKey = 'AIzaSyAhT7k4cRGhTfYJ_i2eGZNcyDBStBmlYYY';

interface LandingProps{

    userReducer: UserState,
    onUpdateLocation: Function
    
}


    const _LandingScreen: React.FC<LandingProps> = (props) => {

    const { userReducer, onUpdateLocation } = props;

    const { navigate } = useNavigation()

    const [errorMsg, setErrorMsg] = useState("")
    const [address, setAddress] = useState<Location.LocationGeocodedAddress>()
    
    const [displayAddress, setDisplayAddress] = useState("Waiting For Current Location")

    useEffect(() => {

        (async () => {
            let { status } = await Location.requestPermissionsAsync();
             if(status !== 'granted'){
                 setErrorMsg('Permission to access location is not granted')
             }

             Location.setGoogleApiKey(apiKey);

             let location: any = await Location.getCurrentPositionAsync({});

             const { coords } = location

             if(coords){
                 const { latitude, longitude } = coords;
                 let addressResponse: any = await Location.reverseGeocodeAsync({latitude, longitude})
                 for(let item of addressResponse){
                     setAddress(item)
                     onUpdateLocation(item)
                     let currentAddress = `${item.name}, ${item.street}, ${item.city}, ${item.postalCode}`
                     setDisplayAddress(currentAddress)

                    if(currentAddress.length > 0){
                        setTimeout(() => {
                            navigate('homeStack') // Move to Home Page
                        },2000)
                    }

                     return;
                 }
             }else{
                 //Notify user something went wrong with location
             }

        })(); //<= () call function


    },  [])

    return (
        <View style={styles.container}>
            <View style={styles.navigation}/>
            <View style={styles.body}>
                <Image source={require('../images/delivery_icon.png')} style={styles.deliveryIcon}/>
                <View style={styles.addressContainer}>
                    <Text style={styles.addressTitle}> Your Delivery Address </Text>
                </View>
                    <Text style={styles.addressText}>{displayAddress}</Text>
            </View>
            <View style={styles.footer}/>
        </View>
    )

}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: 'rgba(242,242,242,1)'
    },
    navigation:{
        flex: 2
    },
    body:{
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deliveryIcon:{
        width: 120,
        height: 120
    },
    addressContainer:{
        width: screenWidth - 100,
        borderBottomColor: 'red',
        borderBottomWidth: 0.5,
        padding: 5,
        marginBottom: 10,
        alignItems: 'center'
    },
    addressTitle:{
        fontSize: 24,
        fontWeight: '700',
        color: '#707070'
    },
    addressText:{
        fontSize: 20,
        fontWeight: '200',
        color: '#4F4F4F'
    },
    footer:{
        flex: 1
    }

})

const mapStateToProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
})

const LandingScreen = connect(mapStateToProps, { onUpdateLocation })(_LandingScreen)

export { LandingScreen }