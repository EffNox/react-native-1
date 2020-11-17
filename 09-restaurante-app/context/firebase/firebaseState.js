import React, { useReducer } from 'react'
import FirebaseReducer from "./firebaseReducer";
import FirebaseContext from "./firebaseContext";
import firebase from "../../firebase";
import { GET_PRODUCTOS } from '../../types';
import _ from "lodash";

const FirebaseState = props => {

    const initialState = {
        menu: [],
    }


    const [state, dispatch] = useReducer(FirebaseReducer, initialState)

    const getProductos = () => {
        firebase.db.collection('productos').where('disponible', '==', true).onSnapshot(manejaSnapshot);
        function manejaSnapshot(dt) {
            let platillos = dt.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            platillos = _.sortBy(platillos, 'cat')
            dispatch({
                type: GET_PRODUCTOS,
                pl: platillos
            })
        }
    }

    return (
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebase,
                getProductos
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState
