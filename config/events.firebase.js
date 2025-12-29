import { collection, doc, getDocs, getDoc, orderBy, query, serverTimestamp, setDoc, where, limit, startAfter, updateDoc } from "firebase/firestore";
import { AUTH,DB } from "./firebase";
import Toast from 'react-native-toast-message';

let eventsCol = collection(DB, 'events');

export const createEvent = async(formData)=> {
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

export const updateEvent = async(id, formData)=>{
    try {
        const docRef = doc(DB, 'events', id);
        await updateDoc(docRef, {
            ...formData
        });
        Toast.show({
            type: 'success',
            text1: 'Event Updated'
        });
        return true;
        
    } catch (e) {
         Toast.show({
            type: 'error',
            text1: 'Oops, try again'
        });
        console.log(e);
    }
}

export const getUserEvents = async(docLimit=4)=> {
    try {
        const user = AUTH.currentUser;
        const q = query(
            eventsCol,
            orderBy('created_at', 'desc'),
            where('owner', '==', user.uid),
            where('status', '==', 'pending'),
            limit(docLimit)
        )

        const querySnapshot = await getDocs(q)
        const events = getMoreHelper(querySnapshot);

        return{
            ...events
        }
    } catch (e) {
        console.log(e)
    }
}

export const getMoreEvents = async(docLimit=2, lastVisible)=>{
    try {
        const user = AUTH.currentUser;
        const q = query(
            eventsCol,
            orderBy('created_at', 'desc'),
            where('owner', '==', user.uid),
            where('status', '==', 'pending'),
            startAfter(lastVisible),
            limit(docLimit)
        )
         const querySnapshot = await getDocs(q)
        const events = getMoreHelper(querySnapshot);

        return{
            ...events
        }
        
    } catch (e) {
        console.log(e)
    }
}

export const getEventById = async(id) =>{
    try {
        const docRef = await getDoc(doc(DB, 'events', id));
        if(!docRef.exists()){
            Toast.show({
            type: 'error',
            text1: 'Could not find document'
            });
        }

        return docRef.data();
    } catch (e) {
        console.log(e)
    }
}

function getMoreHelper(querySnapshot){
    let lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
    const events = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    if(lastVisible === undefined || lastVisible===null)
        lastVisible = false;

    return{
        events, lastVisible
    }
}