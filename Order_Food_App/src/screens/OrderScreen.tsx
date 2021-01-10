import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { ApplicationState, FoodModel, UserState, onUserOrder } from '../redux';
import { connect } from 'react-redux';
import { ButtonWithIcon, OrderCard, FlatText } from '../components';
import { AppHeader } from '../components/AppHeader';
import { FlatList } from 'react-native-gesture-handler';
import { checkExistence, useNavigation } from '../utils';

interface OrderScreenProps{ 

    userReducer: UserState,
    onUserOrder: Function,
    navigation: { getParam: Function, goBack: Function }

}

const _OrderScreen: React.FC<OrderScreenProps> = ({ userReducer, onUserOrder, navigation }) => {

    const { navigate } = useNavigation()

    const { getParam, goBack } = navigation;

    const [ totalAmount, setTotalAmount ] = useState(0)

    const listCart = getParam('dataCart');

    //console.log("LIST ITEM ORDER" + JSON.stringify(listCart));

    const { Cart, user } = userReducer // check cart
    

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

    const formatCurrency = (amount: number) => {
        return Number(amount)
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+$)/g, '$&,');
    }

    const arrayListOrder= Array();
    let objListOrder = {};

    const orderNow = async () => {
        
        await listCart.map( (item: any) => {
            objListOrder = {
            _id: item._id,
            unit: item.unit
            }
           arrayListOrder.push(objListOrder)
        });
        //console.log(arrayListOrder);
        await onUserOrder(arrayListOrder, user)
        navigate('ThanksPage')
    }

    
    

return (<View style={styles.container}>

        <AppHeader userReducer={userReducer} isBackBtn={true} navigationTo='CartPage'/>

        <View style={styles.body}>

        <FlatList
                        showsVerticalScrollIndicator = {false}
                        data={Cart}
                        renderItem= {({ item }) => <OrderCard onTap={onTapFood} item={checkExistence(item, Cart)} />}
                        keyExtractor = { (item) => `${item._id}` }
           />
        </View>

        <View style={styles.card}>
                        <View style={styles.title}>
                            <FlatText text="Thông tin đơn hàng" font="q_regular" sizeText={20} />
                        </View>
                        <View style={styles.marginBottom}>
                            <FlatText text={'Thành tiền: ' + formatCurrency(totalAmount) + '₫'} font="q_bold" sizeText={14} />
                            <TouchableOpacity style={styles.bottomButton} onPress={() => orderNow()}>
                            <FlatText text="Lên đơn" font="q_semibold" sizeText={20} color="#000"/>
                            </TouchableOpacity>
                        </View>
        </View>



</View>)}


const styles = StyleSheet.create({
    
container: { 
    flex:1, 
    backgroundColor: '#F2F2F2' 
},
body: { 
    paddingTop: 15,
    flex:10, 
    justifyContent: 'center', 
    alignItems: 'center' 
},
footer: { 
    flex:1, 
    backgroundColor: 'cyan' 
},
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20
},
title: {
    marginBottom: 15
},
marginBottom: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
},
bottomButton: {
    flex: 1,
    textAlign: 'right',
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#C01C27',
    position: 'absolute',
    right: 0,
    padding: 10,
    paddingVertical: 20
  },

})

const mapStateToProps = (state: ApplicationState) => ({
   userReducer: state.userReducer
})

const OrderScreen = connect(mapStateToProps, { onUserOrder })(_OrderScreen)

export { OrderScreen }