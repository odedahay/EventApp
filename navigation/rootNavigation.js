import { useContext, useState, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { AppContext } from "../store/appContext";
import { AuthStack } from "./navigation";

import { onAuthStateChanged } from "firebase/auth";
import { AUTH } from "../config/firebase";
import { NavigationContainer } from "@react-navigation/native";


export default function RootNavigator(){
    const [loading, setLoading] = useState(true);
    const { user, setUser } = useContext(AppContext)

    useEffect(()=> {
        onAuthStateChanged(AUTH, async(user)=>{
          user ? setUser(user) : setUser(null);
          setLoading(false)  
        })
    }, [user]);
    
    if(loading){
        return(
            <View style={{ flex: 1, justifyContent:"center", alignItems: "center"}}>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        )
    }
    
    return(
      <NavigationContainer>
            { user ? <Text>Normal Stack</Text> : <AuthStack /> }
      </NavigationContainer>
    )
}