import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { getEventById } from "../config/events.firebase";
import ButtonCustom from "../components/utils/button.custom";
import TagComp from "../components/utils/tag";
import { AppStyle } from "../constants";

export default function Event(props){
    const [loading, setLoading ] = useState(true);
    const [event, setEvent] = useState(null);
    const eventID = props.route.params.eventID;
    const isFocused = useIsFocused();

    useEffect(()=>{
        setLoading(true);
        isFocused && getEventById(eventID).then((data)=>{
            setEvent(data)
            setLoading(false)
        })

    }, [isFocused])


    return(
        <View style={styles.container}>
            { loading && <ActivityIndicator size="large" />}
            { !loading && event && 
                <>
                  <View style={styles.contentHeader}>
                    <Text>{event.date}, {event.time}</Text>
                    <TagComp 
                        priority={event.priority}
                    />
                  </View>
                  <View>
                    <Text style={styles.contentTitle}
                    >{event.name}
                    </Text>
                     <Text style={styles.contentBody}
                    >{event.description}
                    </Text>
                  </View>
                  <View style={styles.contentFooter}>
                    <ButtonCustom 
                        title="Edit Event"
                        onPress={()=> props.navigation.navigate('Edit Event', {
                            event: {id: eventID, ...event}
                        })}
                    />
                  </View>
                </>
            }
            {/* <AddEventButton /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    contentHeader:{
        paddingVertical: 10,
        borderBottomColor: AppStyle.purpLight,
        borderBottomWidth:1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contentTitle:{
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
        marginVertical: 20
    },
    contentBody:{
        fontSize: 16
    },
    contentFooter:{
        marginVertical: 30,
        paddingVertical: 20,
    }
})