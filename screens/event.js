import { Text, View, StyleSheet } from "react-native";
import AddEventButton from "../components/utils/addEventButton";

export default function Event(){
    return(
        <View style={styles.container}>
            <AddEventButton />
        </View>
    )
}
