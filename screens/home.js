import { Text, View, StyleSheet, FlatList } from "react-native";
import { useContext, useEffect } from "react";

import { AppContext, getHomeEvents } from "../store/appContext";
import AddEventButton from "../components/utils/addEventButton";
import EventCard from "../components/utils/event.card";
import { useNavigation } from "@react-navigation/native";

export default function Home(){
    const context = useContext(AppContext);
    const navigation = useNavigation();

    useEffect(()=>{
        context.getHomeEvents();
    }, [])

    const eventPressHandler = (item)=>{
        navigation.navigate('Event', {
            eventID: item.id
        });
    }

    return(
        <View style={styles.container}>
            { context.eventState.events && 
                <FlatList 
                    data={context.eventState.events}
                    renderItem={({item})=>(
                        <EventCard
                            eventPressHandler={()=> eventPressHandler(item)}
                            item={item}
                        />
                    )}
                    keyExtractor={(item)=> item.id}
                />
            }
            <AddEventButton />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       backgroundColor: '#fff'
    }
})