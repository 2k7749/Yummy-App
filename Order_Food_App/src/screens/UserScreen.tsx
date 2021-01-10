import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { ApplicationState, UserState, onUserLogout, onOrderHistory } from '../redux';
import { connect } from 'react-redux';
import { FlatText} from '../components';
import { checkExistence, useNavigation } from '../utils';
import { Ionicons, Octicons, Feather,AntDesign } from '@expo/vector-icons';

interface UserScreenProps{ 

    userReducer: UserState,
    onUserLogout: Function,
    onOrderHistory: Function,

}

const _UserScreen: React.FC<UserScreenProps> = ({ userReducer, onUserLogout, onOrderHistory }) => {

    const { navigate } = useNavigation();
    
    const { user } = userReducer;
   
    useEffect( () => {
      let isCancelled = true;
      if(isCancelled){
      if(!user.verified){
        //naviate to login page
        navigate('LoginPage')
        }else{
        onOrderHistory(user);
        navigate('UserPage')
        }
      }
      return () => {
        isCancelled = false;
      };
    }, [user])

    const clickLogOutBtn = () => {
      onUserLogout();
    }

return (
    <View style={styles.flex}>
            <ScrollView style={styles.flex}>
              <View style={styles.conatiner}> 
                <Image style={styles.profileImg} source={{ uri: "https://ui-avatars.com/api/?background=random&size=100&name=" + user.email}} />
                <View style={styles.username}>
                  <FlatText text={user.email} font="q_regular" sizeText={22} />
                </View>
                <View style={styles.singleList}>
                  <TouchableOpacity onPress={() => { navigate('HomePage') }}>
                    <View style={styles.flexDirection}>
                      <View style={styles.flexContain}>
                        <AntDesign style={styles.icon} name="home" size={20} color="#666" />
                        <FlatText text=" Homepage" font="q_regular" sizeText={18} />
                      </View>
                      <Ionicons name="ios-arrow-forward" size={24} color="#666" />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.singleList}>
                  <TouchableOpacity onPress={() => {}}>
                    <View style={styles.flexDirection}>
                      <View style={styles.flexContain}>
                        <Octicons style={styles.icon} name="list-unordered" size={20} color="#666" />
                        <FlatText text=" All Orders" font="q_regular" sizeText={18} />
                      </View>
                      <Ionicons name="ios-arrow-forward" size={24} color="#666" />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.singleList}>
                  <TouchableOpacity onPress={() => {}}>
                    <View style={styles.flexDirection}>
                      <View style={styles.flexContain}>
                        <Feather style={styles.icon} name="settings" size={20} color="#666" />
                        <FlatText text=" Profile Settings" font="q_regular" sizeText={18} />
                      </View>
                      <Ionicons name="ios-arrow-forward" size={24} color="#666" />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.singleList}>
                  <TouchableOpacity onPress={() => { clickLogOutBtn() }}>
                    <View style={styles.flexDirection}>
                      <View style={styles.flexContain}>
                        <AntDesign style={styles.icon} name="logout" size={20} color="#666" />
                        <FlatText text=" Logout" font="q_regular" sizeText={18} />
                      </View>
                      <FlatText text="" font="q_regular" sizeText={18} />
                      <Ionicons name="ios-arrow-forward" size={24} color="#666" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>

    )
}


const styles = StyleSheet.create({
    
    flex: {
        flex: 1
      },
      conatiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30,
        marginVertical: 30
      },
      profileImg: {
        width: 100,
        height: 100,
        borderRadius: 100
      },
      username: {
        marginTop: 10,
        marginBottom: 20
      },
      singleList: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginBottom: 20
      },
      flexDirection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center'
      },
      flexContain: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      icon: {
        marginRight: 5
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

const UserScreen = connect(mapStateToProps, { onUserLogout, onOrderHistory })(_UserScreen)

export { UserScreen }