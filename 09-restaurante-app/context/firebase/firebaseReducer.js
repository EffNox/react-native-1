import { GET_PRODUCTOS } from "../../types"

export default (state, action) => {
    switch (action.type) {
        case GET_PRODUCTOS:
            return { ...state, menu: action.pl }
        default:
            return state
    }
}
