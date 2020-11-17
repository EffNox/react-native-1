import React, { useReducer } from 'react'
import PedidoReducer from "./pedidosReducer";
import PedidoContext from "./pedidosContext";
import { CONFIRM_ORDEN_PLATILLO, SELECT_PRODUCTO, MOSTRAR_RESUMEN, ELIMINAR_PEDIDO, PEDIDO_ORDENADO } from '../../types';

const PedidoState = props => {

    const initialState = {
        pedido: [],
        platillo: null,
        total: 0,
        idPedido: ''
    }

    const [state, dispatch] = useReducer(PedidoReducer, initialState)

    const seelectPlatillo = dt => {
        dispatch({
            type: SELECT_PRODUCTO,
            pl: dt
        })
    }

    const guardarPedido = pedido => {
        dispatch({
            type: CONFIRM_ORDEN_PLATILLO,
            pl: pedido
        })
    }

    const showResumen = total => {
        dispatch({
            type: MOSTRAR_RESUMEN,
            pl: total
        })
    }

    const eliminarProducto = id => {
        dispatch({
            type: ELIMINAR_PEDIDO,
            pl: id
        })
    }

    const pedidoRelizado = id => {
        dispatch({
            type: PEDIDO_ORDENADO,
            pl: id
        })
    }

    return (
        <PedidoContext.Provider
            value={{
                pedido: state.pedido,
                platillo: state.platillo,
                total: state.total,
                idPedido: state.idPedido,
                seelectPlatillo,
                guardarPedido,
                showResumen,
                eliminarProducto,
                pedidoRelizado
            }}
        >
            {props.children}
        </PedidoContext.Provider>
    )
}

export default PedidoState
