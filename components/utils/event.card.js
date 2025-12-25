import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppStyle } from "../../constants";
import TagComp from "./tag";


export default function EventCard({ item, eventPressHandler }) {

    const truncateText = (text, limit = 75) =>{
        if(!text) return '';
        return text.length > limit ? text.slice(0, limit) + "..." : text;
    }

    return (
        <Pressable
            style={styles.container}
            onPress={() => eventPressHandler(item)}
        >
            <LinearGradient
                colors={['#ffffff', '#eeeeee']}
                style={styles.itemGradient}
            >
                <View style={styles.itemHeader}>
                    <Text style={{ fontFamily: 'Roboto_Condensed-SemiBold', flex: 2, fontSize: 20 }}>
                        {item.name}
                    </Text>
                    <TagComp priority={item.priority} />
                </View>

                <View style={{ padding: 10 }}>
                    <Text style={{fontSize: 18, fontWeight: 'light'}}>
                        {truncateText(item.description, 75)}
                    </Text>
                </View>
                <View>
                    {item. description.length > 75 && (
                        <Text style={{color: AppStyle.purpLight, margin:10 }}>Read more</Text>
                    )}
                </View>
                <View style={styles.itemFooter}>
                    <Text>Event Time:</Text>
                    <Text>{item.date}, {item.time}</Text>
                </View>
            </LinearGradient>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    itemGradient: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#E6E6E6'
    },
    itemHeader: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderBottomColor: AppStyle.purpLight,
        // borderBottomWidth: 1
    },
    itemFooter: {
        padding: 10,
        backgroundColor:'#E6E6E6',
        // borderTopColor: AppStyle.purpLight,
        // borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },

})
