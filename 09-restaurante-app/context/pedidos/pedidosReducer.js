import { CONFIRM_ORDEN_PLATILLO, ELIMINAR_PEDIDO, MOSTRAR_RESUMEN, PEDIDO_ORDENADO, SELECT_PRODUCTO } from "../../types"

export default (state, action) => {
    switch (action.type) {
        case SELECT_PRODUCTO:
            return { ...state, platillo: action.pl }
        case CONFIRM_ORDEN_PLATILLO:
            return { ...state, pedido: [...state.pedido, action.pl] }
        case MOSTRAR_RESUMEN:
            return { ...state, total: action.pl }
        case ELIMINAR_PEDIDO:
            return { ...state, pedido: state.pedido.filter(v => v.id !== action.pl) }
        case PEDIDO_ORDENADO:
            return { ...state, pedido: [], total: 0, idPedido: action.pl }
        default:
            return state
    }
}
