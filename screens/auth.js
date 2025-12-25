import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import ButtonCustom from '../components/utils/button.custom';

import { AppStyle} from "../constants";
import { SafeAreaView } from 'react-native-safe-area-context';
import { signUpUser, signInUser } from '../config/user.firebase';

export default function AuthScreen(){
    const [ type, setType] = useState(true);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword] = useState('')

    const handleAuth = async() =>{
        if(!email && !password){
            // Alert.alert('Please check your credentials')
             Toast.show({
                    type: 'error',
                    text1: 'Sorry, please check your credentials'
                })
            return;
        }

        if(type){
            // sign up
            await signUpUser(email, password)

        }else{
            // sing in
            await signInUser(email, password)
        }
    }

    return (
       <LinearGradient
        // Background Linear Gradient
        colors={[AppStyle.purpStrong, AppStyle.purpMedium]}
        style={styles.container}
      >
        <SafeAreaView style={styles.form}> 
            <Text style = { styles.title }>
                { type ? 'Sign up': 'Sign in'}
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                value={email}
                onChangeText={(text)=> setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                value={password}
                onChangeText={(text)=> setPassword(text)}
            />

            <ButtonCustom 
                title={ type ? 'Sign up' : 'Sign in'}
                onPress={handleAuth}
                light={true}
            ></ButtonCustom>
            <Pressable
                style={{ flexDirection: 'row'}}
                onPress={()=> setType(!type)}
            >
                <Text style={styles.typeText}>
                    {!type ? 'Dont\'t have an account': 'Already have an account'}
                </Text>
                <Text style={[styles.typeText, {fontWeight:'bold', fontStyle: 'italic'}]}>
                    {!type ? ' Sign up': ' Sign in'}
                </Text>
            </Pressable>
        </SafeAreaView>
    </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    form:{
        flex:1,
        justifyContent:'center',
        marginHorizontal:40,
    },
    title:{
        fontFamily:'Roboto_Condensed-SemiBold',
        fontSize:50,
        fontWeight:'bold',
        color:'#fff',
        paddingBottom:20
    },
    input:{
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:AppStyle.purpMedium,
        height:50,
        marginBottom:20,
        fontSize:20,
        borderRadius:8,
        padding:10
    },
    typeText:{
        fontSize:20,
        marginTop:20,
        color:'#fff'
    }
})