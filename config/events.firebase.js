import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { AUTH,DB } from "./firebase";
import Toast from 'react-native-toast-message';

let eventsCol = collection(DB, 'events');

export const createEvent = async(formData) =>{
    try {
        
        //Get User
        const user = AUTH.currentUser;

        //POST Doc
        const docRef = doc(eventsCol);

        //conts id = docRefId
        const eventData = {
            status: 'pending',
            created_at: serverTimestamp(),
            owner: user.uid,
            ...formData
        };
        await setDoc(docRef, eventData);
        Toast.show({
            type: 'success',
            text1: 'Event Created'
        });
        return eventData;
    } catch (e) {
        Toast.show({
            type: 'error',
            text1: 'Oops, try again'
        });
        console.log(e);
    }
}