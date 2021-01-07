import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { ApplicationState, ShoppingState, FoodModel, onUpdateCart, UserState } from '../redux';
import { connect } from 'react-redux';
import { SearchBar, ButtonWithIcon, FoodCardInfo, ButtonWithTitle, FlatText } from '../components';
import { FlatList } from 'react-native-gesture-handler';
import { checkExistence, useNavigation } from '../utils';

interface CartScreenProps{ 

    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onUpdateCart: Function

}

const _CartScreen: React.FC<CartScreenProps> = (props) => {

    const { navigate } = useNavigation()

    const [ totalAmount, setTotalAmount ] = useState(0)

    const [ isEditing, setIsEditing ] = useState(false)
    const [ keyword, setKeyWord ] = useState('')

    const { availableFoods } = props.shoppingReducer

    const { Cart, user } = props.userReducer // check cart
    
    console.log(user);

    const onTapFood = (item: FoodModel) => {
        navigate('FoodDetailPage', { food: item })
    }

    useEffect(() => {
        onCalculateAmount()
    },[Cart]);

    const onCalculateAmount = () => {

        let total = 0;

        if(Array.isArray(Cart)){
            Cart.map(food => {
                total += food.price * food.unit
            })
        }

        setTotalAmount(total);

    }

    const onValidateOrder = () => {

        if(!user.verified){
            //naviate to login page
            navigate('LoginPage')
        }else{
            //navigate to order
            console.log("now we can order ");
            
        }

    }

    const formatCurrency = (amount: number) => {
        return Number(amount)
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+$)/g, '$&,');
    }

    

    if(Cart.length > 0){
        return (

            <View style={styles.container}>
                <View style={styles.navigation}>
                    <View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}>
                        
                    </View>
                </View>

                <View style={styles.body}>
                    <FlatList
                        showsVerticalScrollIndicator = {false}
                        data={Cart}
                        renderItem= {({ item }) => <FoodCardInfo onTap={onTapFood} item={checkExistence(item, Cart)} onUpdateCart={props.onUpdateCart} />}
                        keyExtractor = { (item) => `${item._id}` }
                    />
                </View>

                <View style={styles.footer}>
                    <View style={styles.amountView}>
                        <Text style={{ fontSize: 18 }}> Total</Text>
                        <Text style={{ fontSize: 18 }}> {formatCurrency(totalAmount)} ₫</Text>
                    </View>
                    {/* <View style={ styles.bottomButton }>
                    <ButtonWithTitle title={"Order Now"} onTap={onValidateOrder} height={50} width={250}/>
                    </View> */}
                   
                </View>
                <View>
                        <TouchableOpacity style={styles.bottomButton} onPress={() => onValidateOrder()}>
                        <FlatText text="Đặt món" font="q_semibold" sizeText={20} color="#fff"/>
                        </TouchableOpacity>
                </View>
            </View>

        )
    }else{
       return(

            <View style={{ flex:1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 25, fontWeight: '700' }}> Your Cart is Empty!! </Text>
            </View>

       ) 
    }

    
}


const styles = StyleSheet.create({
    
container: { 
    flex:1, 
    backgroundColor: '#F2F2F2' 
},
navigation: { 
    flex:1, 
    marginTop:43 
},
body: { 
    flex:10, 
    justifyContent: 'center', 
    alignItems: 'center' 
},
footer: { 
    flex:2, 
    padding: 10 
},
amountView: { 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingLeft: 20, 
    paddingRight: 20
},
bottomButton: {
    alignItems: 'center',
    backgroundColor: '#C01C27',
    paddingVertical: 20
  },

})

const mapStateToProps = (state: ApplicationState) => ({
   shoppingReducer: state.shoppingReducer,
   userReducer: state.userReducer
})

const CartScreen = connect(mapStateToProps, { onUpdateCart })(_CartScreen)

export { CartScreen }