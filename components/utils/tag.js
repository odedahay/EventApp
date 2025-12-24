import { StyleSheet, Text } from "react-native"
import { AppStyle } from "../../constants"

export default function TagComp(props){
    const handleColor = (priority) => {
        if(priority === 'High'){
            return AppStyle.purpStrong;
        }else if( priority === 'Medium'){
            return AppStyle.purpMedium;
        }else{
            return AppStyle.purpLight
        }
    }

    return(
        <Text style={[
            styles.itemPrioritytag,
            {backgroundColor: handleColor(props.priority)}
        ]}>
            {props.priority}
        </Text>
    )
}

const styles = StyleSheet.create({
    itemPrioritytag:{
        paddingVertical: 3,
        marginLeft:10,
        paddingHorizontal: 10,
        height: 25,
        color: 'white',
        borderRadius:3
    }
})

