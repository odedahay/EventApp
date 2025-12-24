import { Formik, Field } from 'formik';
import { KeyboardAvoidingView, Platform, Text, ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { eventValidationSchema } from './event.schema';
import CustomInput from '../utils/input.custom';
import { AppStyle } from '../../constants';

import ButtonCustom from '../utils/button.custom';
import { useState } from 'react';

//Firebase
import { createEvent } from '../../config/events.firebase';

export default function CreateEventForm(){
    const [loading, setLoading ] = useState(false)
    const handleEventSubmit = async(values, resetForm)=>{
        setLoading(true);

        // firebase
        await createEvent(values).then(()=> {
            resetForm();
        }).finally(()=> {
            setLoading(false);
        })
    }
    return(
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios'?'padding': 'position'}
        style={{flex: 1}}
      >
        <ScrollView>
            <Formik 
                initialValues={{name:'',description:'',date:'',time:'', priority:''}}
                onSubmit={(values,{resetForm})=>{
                    handleEventSubmit(values, resetForm)
                }}

                validationSchema={eventValidationSchema}
            >
             {({ handleSubmit, isValid}) => (
                <View style={{ marginHorizontal:30, marginBottom: 50, marginTop: 20}}>
                    <Field 
                        component = {CustomInput}
                        name="name"
                        placeholder="Name of the event"
                        autoCapitalize="sentences"
                    />
                    <Field 
                        component = {CustomInput}
                        name="description"
                        placeholder="Enter a descriptions"
                        autoCapitalize="sentences"
                        multiline={true}
                        numberOfLines={7}
                    />
                    <Field 
                        component = {CustomInput}
                        name="date"
                        placeholder="The date (MM/DD/YYYY)"
                    />
                    <Field 
                        component = {CustomInput}
                        name="time"
                        placeholder="The date (00:00)"
                    />
                    <Field 
                        component = {CustomInput}
                        name="priority"
                        placeholder="Set the priority"
                    />
                    <View style={styles.btnContainer}>
                        { isValid && !loading && 
                            <ButtonCustom
                                title="Add event"
                                onPress={handleSubmit}
                            />
                        }
                        {
                            loading &&  <ActivityIndicator />
                        }
                    </View>
                </View>
             )}   
            </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    btnContainer:{
        marginTop:20,
        borderTopColor: AppStyle.purpStrong,
        borderTopWidth: 1,
        paddingTop: 20
    }
})