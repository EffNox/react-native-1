import { Toast } from "native-base";
const { StyleSheet } = require("react-native");

const gbStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
    },
    contenido: {
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
        marginHorizontal: '5%'
    },
    contenidoProyecto: {
        marginTop: 30,
        flexDirection: "column",
        flex: 1,
        marginHorizontal: '5%'
    },
    titulo: {
        textAlign: "center",
        color: "white",
        fontWeight: 'bold',
        marginBottom: 20,
        fontSize: 36,
    },
    subTitulo: {
        textAlign: "center",
        color: "white",
        fontWeight: 'bold',
        marginBottom: 20,
        fontSize: 26,
    },
    input: {
        marginBottom: 20,
        color: 'white',
        backgroundColor: '#222',
        borderColor: 'white',
        borderRadius: 10
    },
    btn: {
        backgroundColor: '#444',
        marginVertical: 15,
    },
    btnClear: {
        backgroundColor: '#444',
        marginVertical: 6, marginRight: 10
    },
    btnTxt: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 20
    },
    link: {
        textTransform: 'uppercase',
        color: 'white',
        marginTop: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    }
})

const showAlert = (text) => Toast.show({ text, buttonText: 'Aceptar', duration: 10000, style: { backgroundColor: '#444' }, textStyle: { fontWeight: 'bold' }, buttonTextStyle: { fontWeight: 'bold' } })

export { gbStyle, showAlert }
