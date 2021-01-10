import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { ApplicationState, UserState, onOrderHistory, OrderState } from '../redux';
import { connect } from 'react-redux';
import { FlatText } from '../components';
import { AppHeader } from '../components/AppHeader';
import { FlatList } from 'react-native-gesture-handler';
import {  useNavigation } from '../utils';
import { Feather } from '@expo/vector-icons';

interface OrderHistoryScreenProps{ 

    userReducer: UserState,

}

const _OrderHistoryScreen: React.FC<OrderHistoryScreenProps> = ({ userReducer }) => {

    const { navigate } = useNavigation()

    const [ refreshing, setRefreshing ] = useState(false)

    const { Order, user } = userReducer // check cart

    
    const onTapOrder = ( item: OrderState ) => {
        navigate('OrderDetailPage', { dataorder: item })
    }

    const wait = (timeout: number) => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
    
        wait(1500).then(() => setRefreshing(false));
      }, []);

    const formatCurrency = (amount: number) => {
        return Number(amount)
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+$)/g, '$&,');
    }
    
    const isNotLogin = () => {
        return (
            <View style={styles.container}>
            <Feather name="user-x" size={80} color="black" />
            <View style={styles.message}>
                <FlatText text="Vui lòng Đăng Nhập trước để có thể xem lịch sử Đặt Món của bạn" font="q_semibold" sizeText={18} color="#333"/>
            </View>
            <TouchableOpacity style={ styles.btntext} onPress={ () => navigate('LoginPage') }>
                <FlatText text="Đăng nhập" font="q_semibold" color="#fff" />
            </TouchableOpacity>
            </View>
        )
    }

    const isLogin = () => {
        return (
            <ScrollView style={ styles.flex } refreshControl={
                <RefreshControl
                  refreshing={ refreshing }
                  onRefresh={ onRefresh }
                  title="Kéo để tải lại lịch sử"
                />
              }>
                        <View style={styles.containerOrder}>
                            <View style={styles.headerTitle}>
                                <FlatText text="Tất cả đơn đặt hàng" font="q_regular" sizeText={22} />
                            </View>
                            {
                                Order.map( (order,i) => {
                                    return(
                                        <TouchableOpacity key={ i } onPress={ () => onTapOrder(order) }>
                                            <View style={ styles.singleOrder }>
                                                <View>
                                                  
                                                    <View>
                                                        <FlatText text={ 'Order No: #' + order.orderID } font="q_regular" sizeText={22} />
                                                    </View>
                                                    <View style={styles.orderPrice}>
                                                        <FlatText text={'Tổng: '+ formatCurrency(order.totalAmount) + '₫'} font="q_regular" sizeText={15}/>
                                                    </View>
                                                </View>
                                                <View style={ styles.viewOrderBtn }>
                                                    <Feather name="eye" size={24} color="#fff" />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
        )
    }
    

return (
    <View style={ styles.flex }>
        {!user.verified ? isNotLogin() : isLogin()}
    </View>
    )
}


const styles = StyleSheet.create({
    
    flex: {
        flex: 1
      },
      container: {  
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center'
      },
      containerOrder: {
        flex: 1,
        paddingTop: 30,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginBottom: 0
      },
      message: {
        marginTop: 10,
        padding: 30,
        marginBottom: 20
      },
      btntext: {
        backgroundColor: '#C01C27',
        borderRadius: 5,
        paddingHorizontal: 40,
        paddingVertical: 20
      },
      headerTitle: {
        marginBottom: 20
    },
    singleOrder: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 35,
        borderRadius: 5,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flexDirection: {
        flexDirection: 'row',
        marginBottom: 5
    },
    orderPrice: {
        marginTop: 7
    },
    viewOrderBtn: {
        backgroundColor: '#C01C27',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        marginLeft: 30,
        position: 'relative',
        alignItems: 'center',
        alignSelf: 'center'
    },
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }

})

const mapStateToProps = (state: ApplicationState) => ({
   userReducer: state.userReducer
})

const OrderHistoryScreen = connect(mapStateToProps, { onOrderHistory })(_OrderHistoryScreen)

export { OrderHistoryScreen }