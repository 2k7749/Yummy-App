import { LocationGeocodedAddress } from 'expo-location';
import { UserAction } from '../actions';
import { UserModel, FoodModel, UserState, OrderState } from '../models';

const initialState: UserState = {

    user: {} as UserModel,
    location: {} as LocationGeocodedAddress,
    error: undefined,
    Cart: {} as [FoodModel],
    Order: {} as [OrderState]

}

const UserReducer = (state: UserState = initialState, action: UserAction) => {
    console.log("ACTION REDUCER EVENT LISTEN IS: " + JSON.stringify(action));
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
                        food.unit = action.payload.unit // ADD UNIT
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
            };

        case "ON_USER_LOGOUT":
            return{
                ...state, user: action.payload
            };

        case "ON_USER_ORDER":
            return{
                ...state, Cart: {}
            }

        case "ON_USER_GET_ORDER_HISTORY":
            return{
                ...state, Order: action.payload
            }

        default:
            return state;
    }
    
}

export { UserReducer }