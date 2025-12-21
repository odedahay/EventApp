import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { AUTH, DB } from './firebase'
import Toast from 'react-native-toast-message';
import { Alert } from "react-native";

export const signUpUser = async(email, password) =>{
    try{
        // Sign up user
         const request = await createUserWithEmailAndPassword(AUTH, email, password);
         // alert 
         Toast.show({
            type: 'success',
            text1: 'Welcome Back'
        })
         await addUserToFirestore(request.user)
    }catch(e){
        Toast.show({type: 'error',
                    text1: 'Ooops! Try again'})
    }
}

export const signInUser = async(email, password) =>{
    try {
        await signInWithEmailAndPassword(AUTH, email, password);
        Toast.show({
            type: 'success',
            text1: 'Welcome Back'
        })
    } catch (e) {
        Toast.show({
            type: 'error',
            text1: 'Arrg! Try again'
        })
    }
}

export const addUserToFirestore = async(user)=>{
    try {

        const newUser = {
            uid: user.uid,
            email: user.email,
            firstname: '',
            lastnmae: '',
        }


        await setDoc(doc(DB, 'users', user.uid), newUser)
        
    } catch (e) {
        Toast.show({
            type: 'error',
            text1: 'Ooops! Try again'
        })
    }
}