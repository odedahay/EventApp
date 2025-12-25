import { StyleSheet, Text } from "react-native"
import { AppStyle } from "../../constants"

export default function TagComp(props){
    const handleColor = (priority) => {
        if(priority === 'High'){
            return AppStyle.tag_high;
        }else if( priority === 'Medium'){
            return AppStyle.tag_med;
        }else{
            return AppStyle.tag_low
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
        color: AppStyle.tag_text_color,
        borderRadius:360,
        fontSize:14
    }
})

