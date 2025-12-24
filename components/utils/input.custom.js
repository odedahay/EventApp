import { StyleSheet, TextInput, Text } from "react-native";
import { AppStyle } from '../../constants';


export default function CustomInput({
    field: {name, onBlur, onChange, value},
    form: { errors, touched, setFieldTouched},
    ...props
}){

    const inputError = errors[name] && touched[name];

    return(
        <>
            <TextInput
                style={[
                    styles.inputStyle,
                    props.multiline && styles.isMultiline,
                    inputError && styles.inputError
                ]} 
                // value={value}
                value={
                  value === undefined || value === null
                    ? ""
                    : typeof value === "string"
                      ? value
                      : String(value)
                }
                onChangeText={(text)=> onChange(name)(text)}
                onBlur={()=>{
                    setFieldTouched(name);
                    onBlur(name)
                }}
                {...props}
            />
            {
                inputError && 
                <Text style={styles.errorLabel}>
                    {errors[name]}
                </Text>
            }
        </>
    )
}

const styles=StyleSheet.create({
    inputStyle:{
        borderRadius:8,
        borderWidth: 1,
        borderColor: AppStyle.purpStrong,
        padding: 10,
        fontSize: 18,
        marginBottom: 10
    },
    errorLabel:{
        fontSize: 15,
        marginBottom: 20,
        color: AppStyle.cerise
    },
    inputError:{
        borderColor: AppStyle.cerise
    },
    isMultiline:{
        minHeight: 100,
        verticalAlign: 'top'
    }
})