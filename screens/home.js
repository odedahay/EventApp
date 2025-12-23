import { Text, View, StyleSheet } from "react-native";
import AddEventButton from "../components/utils/addEventButton";

export default function Home(){
    return(
        <View style={styles.container}>
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