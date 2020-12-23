import { LocationGeocodedAddress } from 'expo-location';
import { UserAction } from '../actions';
import { UserModel, FoodModel, UserState } from '../models';

const initialState: UserState = {

    user: {} as UserModel,
    location: {} as LocationGeocodedAddress,
    error: undefined,
    Cart: {} as [FoodModel]

}

const UserReducer = (state: UserState = initialState, action: UserAction) => {

    switch (action.type) {
        case 'ON_UPDATE_LOCATION':
            return{
                ...state,location:action.payload
            }
        case 'ON_UPDATE_CART':
            //Check co phai sp dau tien trong gio hang khong
            if(!Array.isArray(state.Cart)){
                return{ 
                    ...state, Cart: [action.payload]
                }
            }
            //Add 
            const existingFoods = state.Cart.filter(item => item._id === action.payload._id)

            if(existingFoods.length > 0){ // Check sp hien tai de + them
                let updateCart = state.Cart.map((food) => {
                    if(food._id === action.payload._id){
                        food.unit = action.payload.unit
                    }
                    return food;
                })

                return{
                    ...state, Cart: updateCart.filter(item => item.unit > 0) // add them
                }

            }else{
                return{
                    ...state, Cart: [...state.Cart, action.payload] // them sp vao gio hang neu chua co
                }

            }

        case "ON_USER_LOGIN":
            return{
                ...state, user: action.payload
            } ;

        default:
            return state;
    }
    
}

export { UserReducer }