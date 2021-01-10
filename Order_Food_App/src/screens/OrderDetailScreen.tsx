import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, FlatList  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { ApplicationState, UserState, OrderState,ShoppingState, FoodModel } from '../redux';
import { FlatText } from './../components'

interface OrderDetailProps{ 
    
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    navigation: { getParam: Function, goBack: Function }

 }
const _OrderDetailScreen: React.FC<OrderDetailProps> = (props) => {


    const { getParam, goBack } = props.navigation;

    const dataorder = getParam('dataorder') as OrderState

    const { availableFoods } = props.shoppingReducer 

    const { Order } = props.userReducer;
    
    const [ refreshing, setRefreshing ] = useState(false)

    const [ RiderName, setRiderName ] = useState('NGUYEN VAN A');

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

    const renderOrderItem = (param: any) => {
        let getParamIdFood = param.food;
        let nameFood = availableFoods.filter( items => items._id === getParamIdFood).map( item => item.name )
            return (<FlatText text={nameFood +" x"+ param.unit} font="q_regular" sizeText={16} />)
        }

return (
    <SafeAreaView style={styles.flex}>
    <ScrollView style={ styles.flex } refreshControl={
        <RefreshControl
            refreshing={ refreshing }
            onRefresh={ onRefresh }
            title="Kéo để cập nhật"
        />
     }>
        <View style={styles.orderContainer}>
            <View style={styles.card}>
                <View style={styles.title}>
                    <FlatText text="Đơn đặt hàng" font="q_regular" sizeText={23} />
                </View>
                <View style={styles.marginBottom}>
                    <FlatText text={'Đơn số: #'+ dataorder.orderID } font="q_regular" sizeText={16} />
                </View>
                <View style={styles.marginBottom}>
                    <FlatText text={"Trạng thái đơn: "+ dataorder.orderStatus } font="q_regular" sizeText={16} />
                </View>
                <View>
                    <FlatText text={'Tạm tính: '+ formatCurrency(dataorder.totalAmount) } font="q_regular" sizeText={16} />
                </View>
                <View>
                    <FlatText text={'HT Thanh toán: '+ formatCurrency(dataorder.totalAmount) } font="q_regular" sizeText={16} />
                </View>
                <View>
                    <FlatText text={'Tổng đơn: '+ formatCurrency(dataorder.totalAmount) } font="q_regular" sizeText={16} />
                </View>
            </View>
            <View style={styles.card}>
                <View style={styles.title}>
                    <FlatText text="Món đã lên đơn" font="q_regular" sizeText={20} />
                </View>
                <View style={styles.marginBottom}>
                    <FlatList data={ dataorder.items }
                            renderItem={({ item }) => renderOrderItem( item )}
                            keyExtractor = { (item,index) => index.toString() } />
                    
                </View>
                
            </View>

            {(() => {
            if (RiderName !== ''){
          
              return (
            <View style={styles.card}>
                <View style={styles.title}>
                    <FlatText text="Thông tin người vận chuyển" font="q_regular" sizeText={20} />
                </View>
                <View style={styles.marginBottom}>
                    <FlatText text="Tên: Nguyễn Văn A" font="q_regular" sizeText={16} />
                </View>
                <View>
                    <FlatText text="SDT: 0987654321" font="q_regular" sizeText={16} />
                </View>
            </View>
            )
          }
          
          return null;
        })()}

            {/* {(() => {
          if (latPos !== null){
            let lat = parseFloat(latPos);
            let long = parseFloat(longPos); 
              return (
                <View style={ styles.card} >
                <View style={ styles.title }>
                    <FlatText text="Theo dõi đơn" font="q_regular" sizeText={20} />
                </View>
            
                  <MapView
                  style={styles.mapHeight}
                  loadingEnabled={true}
                  initialRegion={{
                  latitude: lat,
                  longitude: long,
                  latitudeDelta: 0.015*1,
                  longitudeDelta: 0.0121*1,
                  }}
              >
                  <MapView.Marker
                    coordinate={{
                      latitude: lat,
                      longitude: long,
                    }} />
              </MapView> 
              
            </View>
              )
          }
          
          return null;
        })()} */}


            
            
        </View>
    </ScrollView>
  </SafeAreaView>

)}


const styles = StyleSheet.create({
    flex: {
        flex: 1
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
        marginBottom: 10
    },
    mapHeight: {
        height: 350,
        borderRadius: 5
    },
    orderContainer: {
        paddingTop: 30,
        marginBottom: 20
    },
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }

})

const mapStateToProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
 })
 
 const OrderDetailScreen = connect(mapStateToProps, { })(_OrderDetailScreen)
 
 export { OrderDetailScreen }