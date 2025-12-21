import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AuthScreen from "../screens/auth"

const Stack = createNativeStackNavigator();

export function AuthStack(){
    return(
        <Stack.Navigator 
            screenOptions = {{headerShown: false}}
        >
            <Stack.Screen name="Auth" component={AuthScreen} />
        </Stack.Navigator>
    )
}