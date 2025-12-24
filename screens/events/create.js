import { Text, View } from "react-native";
import CreateEventForm from "../../components/events/createForm";

export default function CreateEvent(){
    return(
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <CreateEventForm />
        </View>
    )
}