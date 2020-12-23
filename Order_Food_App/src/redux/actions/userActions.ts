import axios from 'axios';
import { LocationGeocodedAddress } from 'expo-location';
import { Dispatch } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FoodModel, UserModel } from './../models';
import { BASE_URL } from '../../utils';

export interface UpdateLocationAction{
    readonly type: 'ON_UPDATE_LOCATION',
    payload: LocationGeocodedAddress
}

export interface UserErrorAction{
    readonly type: 'ON_USER_ERROR',
    payload: any
}

export interface UpdateCartAction{
    readonly type: 'ON_UPDATE_CART',
    payload: FoodModel
}

export interface UserLoginAction{
    readonly type: 'ON_USER_LOGIN',
    payload: UserModel
}


// Any more Action Type
export type UserAction = UpdateLocationAction | UserErrorAction | UpdateCartAction | UserLoginAction;

//User action trigger from Components

export const onUpdateLocation = (location: LocationGeocodedAddress) => {
    //EXECU ACTION
    return async ( dispatch: Dispatch<UserAction> ) => {
        try {
            const locationString = JSON.stringify(location)
            await AsyncStorage.setItem('user location', locationString)
            //Save our LOCATION in local storage
            dispatch({
                type: 'ON_UPDATE_LOCATION',
                payload: location
            })
        } catch(error){
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }

}


export const onUpdateCart = (item: FoodModel) => {
    //EXECU ACTION
    return async ( dispatch: Dispatch<UserAction> ) => {
            dispatch({
                type: 'ON_UPDATE_CART',
                payload: item
            })
    }

}

export const onUserLogin = (email: string, password: string) => {
    //EXECU ACTION
    return async ( dispatch: Dispatch<UserAction> ) => {
        try {
            const response = await axios.post<UserModel>(`${BASE_URL}user/login`, {
                email,
                password
            })

            console.log(response)

            if(!response){
                dispatch({
                    type:'ON_USER_ERROR',
                    payload: 'User Login error'
                })
            }else{
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
            }

        } catch(error){
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }

}

export const onUserSignup = (email: string, phone: string, password: string) => {
    //EXECU ACTION
    return async ( dispatch: Dispatch<UserAction> ) => {
        try {
            const response = await axios.post<UserModel>(`${BASE_URL}user/create-account`, {
                email,
                phone,
                password
            })

            console.log(response)

            if(!response){
                dispatch({
                    type:'ON_USER_ERROR',
                    payload: 'User Login error'
                })
            }else{
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
            }

        } catch(error){
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }

}

export const onVerifyOTP = (otp: string, user: UserModel) => {
    //EXECU ACTION
    return async ( dispatch: Dispatch<UserAction> ) => {
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

            const response = await axios.patch<UserModel>(`${BASE_URL}user/verify`, {
                otp
            })

            console.log(response)

            if(!response){
                dispatch({
                    type:'ON_USER_ERROR',
                    payload: 'User Verification error'
                })
            }else{
                //Save our data to local store
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
            }

        } catch(error){
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }

}

export const onOTPRequest = (user: UserModel) => {
    //EXECU ACTION
    return async ( dispatch: Dispatch<UserAction> ) => {
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

            const response = await axios.get<UserModel>(`${BASE_URL}user/otp`)

            console.log(response)

            if(!response){
                dispatch({
                    type:'ON_USER_ERROR',
                    payload: 'User Verification error'
                })
            }else{
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
            }

        } catch(error){
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }

}