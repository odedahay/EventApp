import { Pressable, Text,StyleSheet } from "react-native";
import { AppStyle } from "../../constants";


export default function ButtonCustom(props){
    return(
        <Pressable
            onPress={props.onPress}
            style={({pressed})=>[
                styles.button,
                !props.light && {borderColor: pressed ? AppStyle.purpLight : AppStyle.purpStrong}
            ]}
        >
            <Text style={[styles.buttonText,
                !props.light && {color: '#fff'}
            ]}>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button:{
        borderWidth: 1,
        height: 58,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        backgroundColor: AppStyle.purpStrong
    },
    buttonText: {
        fontSize: 18,
        color: '#fff'
    }
})