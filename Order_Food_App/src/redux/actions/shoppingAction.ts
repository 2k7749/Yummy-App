import axios from 'axios';
import { Dispatch } from 'react';
import { FoodAvailability, FoodModel } from './../models';
import { BASE_URL } from '../../utils';



//Availability Action
export interface AvailabilityAction{
    readonly type: 'ON_AVAILABILITY',
    payload: FoodAvailability
}

export interface FoodSearchAction{
    readonly type: 'ON_FOODS_SEARCH',
    payload: [FoodModel]
}

export interface ShoppingErrorAction{
    readonly type: 'ON_SHOPPING_ERROR',
    payload: any
}


// Any more Action Type
export type ShoppingAction = AvailabilityAction | ShoppingErrorAction | FoodSearchAction;

//Trigger actions from Components
export const onAvailability = (postCode: string) => {

         console.log(`Post Code with request ${postCode}`);
        // axios.get(`${BASE_URL}food/availability/700000`).then(function (response) {
        //     // handle success
        //     console.log(response.data);
        //   }).catch(function (error) {
        //     // handle error
        //     console.log(error);
        //   })
    
    
    //ECUX ACTION
    return async ( dispatch: Dispatch<ShoppingAction> ) => {
        try {
           // const response = await axios.get<FoodAvailability>(`${BASE_URL}food/availability/700000`)
           const response = await axios.get<FoodAvailability>(`${BASE_URL}food/availability/${postCode}`)
            if(!response){
                dispatch({
                    type:'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                })
            }else{
                dispatch({
                    type: 'ON_AVAILABILITY',
                    payload: response.data
                })
            }

        } catch(error){
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }
    }

}

export const onSearchFoods = (postCode: string) => {
    //ECUX ACTION
    return async ( dispatch: Dispatch<ShoppingAction> ) => {
        try {
            const response = await axios.get<[FoodModel]>(`${BASE_URL}food/search/${postCode}`)
            if(!response){
                dispatch({
                    type:'ON_SHOPPING_ERROR',
                    payload: 'Availability error'
                })
            }else{
                dispatch({
                    type: 'ON_FOODS_SEARCH',
                    payload: response.data
                })
            }

        } catch(error){
            dispatch({
                type: 'ON_SHOPPING_ERROR',
                payload: error
            })
        }
    }

}