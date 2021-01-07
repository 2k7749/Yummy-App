import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ApplicationState, onUserLogin, onUserSignup, UserState, onVerifyOTP, onOTPRequest } from '../redux';
import {  ButtonWithTitle, TextField, FlatText } from '../components';
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
            console.log('SIGNUP')
            onUserSignup(email, phone, password)
        }else{
            console.log('LOGIN')
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
        return (
        <View style={styles.container}>
                <View style={styles.body}>
                    <Image source={require('../images/verify_otp.png')} style={{ width: 120, height: 120, margin: 20 }}/>
                    <View style={styles.title}>
                        <FlatText text="Xác minh tài khoản" font="q_semibold" sizeText={22} />
                    </View>
                    <View style={styles.title}>
                        <FlatText text="Nhập mã OTP chúng tôi đã gửi cho bạn vào bên dưới, để xác minh tài khoản" font="q_semibold" sizeText={14} />
                    </View>
                    <TextField isOTP={true} placeholder="OTP" onTextChange={() => {}} />

                    <View>
                        <TouchableOpacity style={[styles.btn, {width: 220}]} onPress={onTapVerify}>
                            <FlatText text='Xác Minh OTP' font="q_semibold" sizeText={18} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <ButtonWithTitle disable={!canRequestOtp} title={requestOtpTitle} isNoBg={true} onTap={onTapRequestNewOTP} width={320} height={50} />

                </View>
                <View style={styles.footer}></View>
            </View>
            )

    }else{
        return (

        <View style={styles.flex}>
            <ScrollView>
                <View style={styles.mainContainer}>
                    <View style={styles.title}>
                        <FlatText text="Login Your Account" font="q_semibold" sizeText={20} />
                    </View>
                    {/* {this.state.errormessage != "" ? <View style={styles.errorMessage}> 
                        <FlatText text={this.state.errormessage} font="q_regular" size={16} color="#C01C27" />
                    </View> : <FlatText/>}*/}
                    <View style={styles.formGroup}>
                        <FlatText text="Địa chỉ Email" font="q_regular" sizeText={17} />
                        <TextInput style={styles.textInput} placeholder="Enter Your Email" onChangeText={setEmail}/>
                    </View>
                    { isSignup && 
                        <View style={styles.formGroup}>
                        <FlatText text="Số điện thoại" font="q_regular" sizeText={17} />
                        <TextInput style={styles.textInput} placeholder="Enter Your Email" onChangeText={setPhone}/>
                    </View>
                    }
                    <View style={styles.formGroup}>
                        <FlatText text="Mật khẩu" font="q_regular" sizeText={17} />
                        <TextInput style={styles.textInput} placeholder="Enter Your Password" onChangeText={setPassword} />
                    </View>
                    <View>
                        <TouchableOpacity style={styles.btn} onPress={onTapAuthenticate}>
                            <FlatText text={title} font="q_semibold" sizeText={18} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.textCenter} onPress={() => onTapOptions()}>
                            <FlatText text={!isSignup ? "Chưa có tài khoản? Đăng ký ngay" : "Nếu đã có tài khoản? bạn hãy đăng nhập"} font="q_regular" sizeText={16} color="#666" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>    


        // <View style={styles.container}>
        //     <View style={styles.navigation}><Text style={{ fontSize: 30 }}> Login </Text></View>
        //     <View style={styles.body}>
        //         <TextField placeholder="Email" onTextChange={setEmail} />
        //         { isSignup && 
        //         <TextField placeholder="Phone" onTextChange={setPhone} />
        //          }
        //         <TextField placeholder="Passowrd" onTextChange={setPassword} isSecure={true} />
        //         <ButtonWithTitle title={title} onTap={onTapAuthenticate} width={340} height={50} />
        //         <ButtonWithTitle title={!isSignup ? "No Account? Signup Here" : "Have an Account? Login Here"} onTap={() => onTapOptions()} width={340} height={50} isNoBg={true}/>
        //     </View>
        //     <View style={styles.footer}></View>
        // </View>
            
            )}


}


const styles = StyleSheet.create({
    
    flex: {
        flex: 1
    },
    mainContainer: {
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    title: {
        padding: 20,
        marginBottom: 7,
        paddingBottom: 50,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 20,
        borderRadius: 5,
        paddingHorizontal: 20,
        marginTop: 10
    },
    formGroup: {
        marginBottom: 20
    },
    btn: {
        alignItems: 'center',
        backgroundColor: '#C01C27',
        paddingVertical: 20,
        borderRadius: 5
    },
    textCenter: {
        alignItems: 'center',
        marginTop: 20
    },
    errorMessage: {
        marginBottom: 7
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },





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