import { Text, View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useContext, useEffect, useState } from "react";

import { AppContext, getHomeEvents } from "../store/appContext";
import AddEventButton from "../components/utils/addEventButton";
import EventCard from "../components/utils/event.card";
import { useNavigation } from "@react-navigation/native";

export default function Home(){
    const context = useContext(AppContext);
    const [loading, setLoading ] = useState(false);
    const [refreshing, setRefreshing ] = useState(false);
    const navigation = useNavigation();

    useEffect(()=>{
        context.getHomeEvents();
    }, [])

    const eventPressHandler = (item)=>{
        navigation.navigate('Event', {
            eventID: item.id
        });
    }

    const loadMoreArticles = async()=>{
        setLoading(true);
        await context.loadMoreEvent().then(()=>{
            setLoading(false);
        })
    }

    const onRefreshing = async()=>{
        setRefreshing(true)
        await context.getHomeEvents().then(()=>{
            // console.log('refreshing...')
            setRefreshing(false)
        })
    }

    return(
        <View style={styles.container}>
            { context.eventState.events && 
                <FlatList 
                    data={context.eventState.events}
                    refreshing={refreshing}
                    onRefresh={onRefreshing}
                    onEndReached={()=>{ !loading && loadMoreArticles()}}
                    onEndReachedThreshold={0.2}
                    ListFooterComponent={()=>( loading && <ActivityIndicator />)}
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