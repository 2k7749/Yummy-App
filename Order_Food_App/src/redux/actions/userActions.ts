import axios from 'axios';
import { LocationGeocodedAddress } from 'expo-location';
import { Dispatch } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FoodModel, UserModel, OrderState } from './../models';
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

export interface UserLogOutAction{
    readonly type: 'ON_USER_LOGOUT',
    payload: any
}

export interface UserOrderAction{
    readonly type: 'ON_USER_ORDER',
    payload: UserModel
}

export interface UserHistoryOrderAction{
    readonly type: 'ON_USER_GET_ORDER_HISTORY',
    payload: OrderState
}



// Any more Action Type
export type UserAction = UpdateLocationAction | UserErrorAction | UpdateCartAction | UserLoginAction | UserLogOutAction | UserOrderAction | UserHistoryOrderAction;

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
            const response = await axios.post<UserModel>(`${BASE_URL}customer/login`, {
                email,
                password
            })

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
            const response = await axios.post<UserModel>(`${BASE_URL}customer/signup`, {
                email,
                phone,
                password
            })

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

export const onUserLogout = () => {
    //EXECU ACTION
    return async ( dispatch: Dispatch<UserAction> ) => {
        try {
            const user = {
                email: '',
                signature: '',
                verified: false,
            };
            dispatch({
                type:'ON_USER_LOGOUT',
                payload: {},
            })
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

            axios.defaults.headers.common['Authorization'] = `Bearer ${user.signature}`;

            const response = await axios.patch<UserModel>(`${BASE_URL}customer/verify`, {
                otp
            })

            if(!response){
                dispatch({
                    type:'ON_USER_ERROR',
                    payload: 'User Verification error'
                })
            }else{
                //Save our data to local store
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data //=< save to USERMODEL
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

            axios.defaults.headers.common['Authorization'] = `Bearer ${user.signature}`;

            const response = await axios.get<UserModel>(`${BASE_URL}customer/otp`)

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

export const onUserOrder = (arrayListOrder: any, user: UserModel) => {
    //ECUX ACTION
    return async ( dispatch: Dispatch<UserAction> ) => {
        try {
            //console.log(arrayListOrder);

            axios.defaults.headers.common['Authorization'] = `Bearer ${user.signature}`;

            const response = await axios.post<UserModel>(`${BASE_URL}customer/create-order`, arrayListOrder)

            if(!response){
                dispatch({
                    type:'ON_USER_ERROR',
                    payload: 'Availability error'
                })
            }else{
                dispatch({
                    type: 'ON_USER_ORDER',
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

export const onOrderHistory = (user: UserModel) => {
    //ECUX ACTION
    return async ( dispatch: Dispatch<UserAction> ) => {
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${user.signature}`;

            const response = await axios.get<OrderState>(`${BASE_URL}customer/orders`)

            if(!response){
                dispatch({
                    type:'ON_USER_ERROR',
                    payload: 'Availability error'
                })
            }else{
                dispatch({
                    type: 'ON_USER_GET_ORDER_HISTORY',
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