import { Text, View, StyleSheet, FlatList } from "react-native";
import { useContext, useEffect } from "react";

import { AppContext, getHomeEvents } from "../store/appContext";
import AddEventButton from "../components/utils/addEventButton";

export default function Home(){
    const context = useContext(AppContext);

    useEffect(()=>{
        context.getHomeEvents(); 
    })

    return(
        <View style={styles.container}>
            { context.eventState.events && 
                <FlatList 
                    data={context.eventState.events}
                    renderItem={({item})=>(
                        <Text>{item.name}</Text>
                    )}
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