import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { FlatText } from '.';
import { UserState } from '../redux';
import { ButtonWithIcon } from '../components';
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from '../utils';

interface HeaderProps{ 

    userReducer: UserState; //<= NOT OR YES
    isBackBtn?: boolean;
    navigationTo?: string;

 }
const AppHeader: React.FC<HeaderProps> = ({ userReducer, isBackBtn = false, navigationTo = '' }) => {

    const { location, user } = userReducer;
    const { navigate } = useNavigation()

    const ShowBackButton = () => {
        return(
        <View style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', marginLeft: 0 }}>
        <ButtonWithIcon icon={ require('../images/back_arrow.png')} onTap={() => navigate(navigationTo) } width={30} height={30}  />
        </View>
        )
    }

return (
        <View style={ styles.headerContainer }>
           {isBackBtn == true ? ShowBackButton() : false}
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
                text={`${location.name}, ${location.street}, ${location.subregion}`}
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

)}


const styles = StyleSheet.create({

    // navigation: { 
    //     flex:1
    // },
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

export { AppHeader }