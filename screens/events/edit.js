import { Text, View } from "react-native";
import EditEventForm from "../../components/events/editForm";

export default function EditEvent(props) {
    const event = props.route.params.event


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <EditEventForm event={event}/>
        </View>
    )
}