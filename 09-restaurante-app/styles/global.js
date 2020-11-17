import { StyleSheet } from 'react-native'

const gbStyle = StyleSheet.create({
    contenedor: {
        flex: 1,
    },
    contenido: {
        marginHorizontal: '2.5%',
        flex: 1,
    },
    btn: {
        backgroundColor: '#FFDA00'
    },
    btnTxt: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#000'
    },
    titulo: {
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 20,
        fontSize: 30
    },
    img: {
        height: 300,
        width: '100%'
    },
    cant: {
        marginVertical: 12,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    }
})

export default gbStyle
