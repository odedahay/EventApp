import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { AUTH } from "../config/firebase";

//Screens
import Home from "../screens/home";
import Event from "../screens/event";
import CreateEvent from "../screens/events/create";
import EditEvent from "../screens/events/edit";
import CompletedEvents from "../screens/completed";
import AuthScreen from "../screens/auth"

//Context
import { useContext } from "react";
import { AppContext } from "../store/appContext";
import { AppStyle } from "../constants";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export function AuthStack(){
    return(
        <Stack.Navigator screenOptions = {{headerShown: false}}>
            <Stack.Screen name="Auth" component={AuthScreen} />
        </Stack.Navigator>
    )
}

function CustomDrawerContent(props){
    const { user } = useContext(AppContext)
    return(
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            { user && 
                <DrawerItem 
                    label="Sign Out"
                    onPress={()=> AUTH.signOut()}
                    labelStyle={{ color: AppStyle.kakhi}}
                />
            }
        </DrawerContentScrollView>
    )
}

function DrawerNavigator(){
    return(
        <Drawer.Navigator
            drawerContent={CustomDrawerContent}
            screenOptions={{
                headerStyle: { backgroundColor: AppStyle.purpStrong},
                headerTintColor: AppStyle.light_color,
                headerTitleStyle:{
                    fontFamily: 'Montserrat-Medium',
                    fontSize:24
                },
                drawerStyle:{
                    backgroundColor: AppStyle.purpStrong,
                    width:200
                },
                drawerInactiveTintColor: AppStyle.kakhi,
                drawerActiveTintColor: '#fff'
            }}
        >
            <Drawer.Screen name="home_events" component={Home} 
                options={{title: 'Events'}}
            />
            <Drawer.Screen name="completed" component={CompletedEvents}
                options={{ title: "Completed"}}
            />
        </Drawer.Navigator>
    )
}

export function AppStack({user}){
    return(
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: AppStyle.purpStrong},
                headerTintColor: AppStyle.kakhi,
                headerTitleStyle:{
                    fontFamily: 'Montserrat-Medium',
                    fontSize:20
                }
            }}
        >
            <Stack.Screen name="Home" component={DrawerNavigator} 
                options={{headerShown:false}}
            />
            <Stack.Screen name="Event" component={Event} />
            <Stack.Screen name="Create Event" component={CreateEvent} />
            <Stack.Screen name="Edit Event" component={EditEvent} />
        </Stack.Navigator>
    )
}