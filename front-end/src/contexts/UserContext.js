import { createContext, useReducer } from "react";
import UserReducer from "../reducers/UserReducer";

const initialState = {
    transactions:[

    ],
    saved:[

    ]
}

export const UserContext = createContext(initialState);

export const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(UserReducer,initialState);

    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id 
        });
    }

    function addTransaction(id){
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: id
        });
    }

    function deleteSaved(id) {
        dispatch({
            type: 'DELETE_SAVED',
            payload: id 
        });
    }

    function addSaved(id){
        dispatch({
            type: 'ADD_SAVED',
            payload: id
        });
    }

    return(
        <UserContext.Provider value={{
            transactions: state.transactions,
            deleteTransaction,
            addTransaction,
            deleteSaved,
            addSaved
        }}>
            {children}
        </UserContext.Provider>
    )
}