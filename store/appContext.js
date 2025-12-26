import { createContext, useReducer, useState } from 'react';
import { getUserEvents, getMoreEvents } from '../config/events.firebase';

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
        case 'LOADMORE_EVENTS':
            return{
                lastVisible: action.payload.lastVisible,
                events: [...state.events, ...action.payload.events]
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

    const loadMoreEvent = async()=>{
        if(eventState.lastVisible){
            const response = await getMoreEvents(2, eventState.lastVisible);
            //console.log(response)
            dispatch({type: 'LOADMORE_EVENTS', payload: response})
        }
    }

    return (
        <AppContext.Provider value={{ user, setUser, getHomeEvents, eventState, loadMoreEvent }}>
            {children}
        </AppContext.Provider>
    )
}