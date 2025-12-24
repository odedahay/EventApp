import { createContext, useReducer, useState } from 'react';
import { getUserEvents } from '../config/events.firebase';

export const AppContext = createContext();
const DEFAULT_EVENT = {
 events:[],
 lastVisible: ''
}

function eventsReducer(state, action){
    switch(action.type){
        case 'HOME_EVENTS':
            return{
                events:action.payload.events,
                lastVisible: action.payload.lastVisible
            }
        default:
            return state
    }
}

export default function AppContextProvider({ children }) {
    const [eventState, dispatch] = useReducer(eventsReducer, DEFAULT_EVENT);
    const [user,setUser] = useState(null);
    const getHomeEvents = async()=>{
        const response = await getUserEvents();
        //console.log(response);
        dispatch({type: 'HOME_EVENTS', payload: response})
    }

    return (
        <AppContext.Provider value={{ user, setUser, getHomeEvents, eventState }}>
            {children}
        </AppContext.Provider>
    )
}