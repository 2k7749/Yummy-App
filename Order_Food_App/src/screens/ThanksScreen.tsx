import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ApplicationState, UserState, } from '../redux';
import { connect } from 'react-redux';
import { FlatText } from '../components';
import { useNavigation } from '../utils';
import { Feather } from '@expo/vector-icons';
import { StackActions, NavigationActions } from 'react-navigation';

interface ThanksScreenProps{ 

    userReducer: UserState,
    onUserOrder: Function,

}

const ThanksScreen: React.FC<ThanksScreenProps> = (props) => {

    const { navigate } = useNavigation()
    
    

return (
    <View style={styles.flex}>
    <View style={styles.container}>
      <Feather name="check-circle" size={80} color="black" />
      <View style={styles.message}>
        <FlatText text="Đơn hàng của bạn đã được đặt" font="q_semibold" sizeText={18} color="#333"/>
      </View>
      <TouchableOpacity style={styles.btntext} onPress={ () => navigate('UserPage') }>
        <FlatText text="Trở về" font="q_semibold" color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
  )}


const styles = StyleSheet.create({
    
    flex: {
        flex: 1
      },
      container: {  
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center'
      },
      message: {
        marginTop: 10,
        marginBottom: 20
      },
      btntext: {
        backgroundColor: '#333',
        borderRadius: 5,
        paddingHorizontal: 30,
        paddingVertical: 15
      }

})
export { ThanksScreen }