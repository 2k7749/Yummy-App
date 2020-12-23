import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { connect } from 'react-redux';
import { ApplicationState, onUserLogin, onUserSignup, UserState, onVerifyOTP, onOTPRequest } from '../redux';
import {  ButtonWithTitle, TextField } from '../components';
import { useNavigation } from '../utils';

interface LoginProps{ 

    onUserSignup: Function,
    onUserLogin: Function,
    userReducer: UserState,
    onOTPRequest: Function,
    onVerifyOTP: Function

 }
const _LoginScreen: React.FC<LoginProps> = ({ onUserSignup, onUserLogin, userReducer, onOTPRequest, onVerifyOTP  }) => {

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('Login');
    const [isSignup, setSignup] = useState(false);

    const [otp, setOtp] = useState('')
    const [verified, setVerified] = useState(true) // testing function
    const [requestOtpTitle, setRequestOtpTitle] = useState('Request a New OTP in')
    const [canRequestOtp, setCanRequestOtp] = useState(false)

    let countDown: number;

    const { user } = userReducer;

    const { navigate } = useNavigation()

    useEffect(() => {
        
        if(user.verified !== undefined){

            if(user.verified === true){
                //navigate to cart page
                navigate('CartPage')
            }else{
                setVerified(user.verified);
                onEnableOtprequest()
            }
        }

        return () => {
            clearInterval(countDown);
        }

    }, [user]);

    const onTapOptions = () => {

        setSignup(!isSignup)
        setTitle(!isSignup ? 'Signup' : 'Login')

    }

    const onTapAuthenticate = () => {

        if(isSignup){
            onUserSignup(email, phone, password)
        }else{
            onUserLogin(email, password)
        }
    }

    const onEnableOtprequest = () => {

        const otpDate = new Date();
        otpDate.setTime(new Date().getTime() + (2 * 60 * 1000));
        const otpTime = otpDate.getTime();

        countDown = setInterval(function(){

            const currentTime = new Date().getTime()

            const totalTime = otpTime - currentTime;

            let minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60))
            let seconds = Math.floor((totalTime % (1000 * 60)) / 1000)

            setRequestOtpTitle(`Request a New OTP in ${minutes}:${seconds}`)

            if(minutes < 1 && seconds < 1){
                setRequestOtpTitle(`Request a New OTP`)
                setCanRequestOtp(true)
                clearInterval(countDown);
            }

        },1000)
        
    }

    const onTapVerify = () => {
        //console.log("click Verify");
        
        onVerifyOTP(otp, user)

    }

    const onTapRequestNewOTP = () => {
        setCanRequestOtp(false)
        onOTPRequest(user)
    }

    if(!verified){
        //Show OTP page
        return (<View style={styles.container}>
                <View style={styles.body}>
                    <Image source={require('../images/verify_otp.png')} style={{ width: 120, height: 120, margin: 20 }}/>
                    <Text style={{ fontSize: 22, fontWeight: '500', margin: 10 }}> Verification</Text>
                    <Text style={{ fontSize: 14, padding: 10, marginBottom: 20, color: '#716F6F' }}> Enter your OTP sent to your mobile number</Text>
                    <TextField isOTP={true} placeholder="OTP" onTextChange={() => {}} />

                    <ButtonWithTitle title="Verify OTP" onTap={onTapVerify} width={320} height={50} />
                    <ButtonWithTitle disable={!canRequestOtp} title={requestOtpTitle} isNoBg={true} onTap={onTapRequestNewOTP} width={320} height={50} />

                </View>
                <View style={styles.footer}></View>
            </View>)

    }else{
        return (<View style={styles.container}>
            <View style={styles.navigation}><Text style={{ fontSize: 30 }}> Login </Text></View>
            <View style={styles.body}>
                <TextField placeholder="Email" onTextChange={setEmail} />
                { isSignup && 
                <TextField placeholder="Phone" onTextChange={setPhone} />
                 }
                <TextField placeholder="Passowrd" onTextChange={setPassword} isSecure={true} />
                <ButtonWithTitle title={title} onTap={onTapAuthenticate} width={340} height={50} />
                <ButtonWithTitle title={!isSignup ? "No Account? Signup Here" : "Have an Account? Login Here"} onTap={() => onTapOptions()} width={340} height={50} isNoBg={true}/>
            </View>
            <View style={styles.footer}></View>
            </View>)
    }


}


const styles = StyleSheet.create({
    
container: { flex: 1 },
navigation: { 
    flex: 1, 
    paddingLeft: 50, 
    paddingTop: 50
},
body: { 
    flex: 10, 
    justifyContent: 'center', 
    alignItems: 'center' 
},
footer: { flex: 1 }

})

const mapStateToProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
 })
 
 const LoginScreen = connect(mapStateToProps, { onUserLogin, onUserSignup, onOTPRequest, onVerifyOTP })(_LoginScreen)

export { LoginScreen }