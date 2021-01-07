import React, { useState, useReducer, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

import { connect } from 'react-redux';
import { onUpdateLocation, UserState, ApplicationState } from '../redux';

import { useNavigation } from '../utils';

const { width, height } = Dimensions.get("screen"); // Get Screen Width

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
    
    const [displayAddress, setDisplayAddress] = useState("Đang lấy thông tin vị trí của bạn")

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
        
        <View style={ styles.container }>
             <Image
            style={ styles.bannerImage }
            source={ require('./../images/bannerImg.png' ) }
            />
            <View style={styles.marginBottom}>
                <View>
                <Text style={{ fontSize: 17, textAlign: 'center' }}>Chúng tôi sử dụng vị trí của bạn để giúp bạn tìm kiếm nhà hàng gần bạn nhất</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity
                style={styles.currenLocationBtn}
                >
                    <Text style={{ fontSize: 18, color: '#fff' }}>{ displayAddress }</Text>
                </TouchableOpacity>
            </View>
        </View>

    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
        backgroundColor: "#fff",
      },
      bannerImage: {
        width: width,
        height: height / 2,
      },
      marginBottom: {
        marginBottom: 25
      },
      currenLocationBtn: {
        backgroundColor: '#C01C27',
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: width - 50,
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 5,
      }

})

const mapStateToProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
})

const LandingScreen = connect(mapStateToProps, { onUpdateLocation })(_LandingScreen)

export { LandingScreen }