import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Formulario = ({ citas, setCitas, setShowForm, saveCitas }) => {

    const [paciente, setPaciente] = useState('')
    const [propietario, setPropietario] = useState('')
    const [telefono, setTelefono] = useState('')
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [sintomas, setSintomas] = useState('')

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => setDatePickerVisibility(true);

    const hideDatePicker = () => setDatePickerVisibility(false);

    const handleConfirm = (date) => {
        const ops = { year: 'numeric', month: 'long', day: '2-digit' }
        setFecha(date.toLocaleString('es-ES', ops))
        hideDatePicker();
    };


    const showTimePicker = () => setTimePickerVisibility(true);

    const hideTimePicker = () => setTimePickerVisibility(false);

    const handleConfirmTime = (date) => {
        const ops = { hour: 'numeric', minute: '2-digit', hour12: false }
        setHora(date.toLocaleString('es-ES', ops))
        hideTimePicker();
    };

    const cita = { id: new Date().getTime(), paciente, propietario, sintomas, telefono };
    const crearNuevaCita = () => {
        if (!paciente && !propietario && !sintomas && !telefono) return showAlert();
        let newCitas = [...citas, cita];
        setShowForm(false);
        saveCitas(JSON.stringify(newCitas))
        setCitas(newCitas);
    }


    const showAlert = () => {
        Alert.alert(
            'Error',//Titulo
            'Todos los campos son obligatorios',//subtitulo
            [{ text: 'Aceptar' }]//Botones
        )
    }

    return (
        <ScrollView style={sts.formulario}>

            <View>
                <Text style={sts.lbl}>Paciente:</Text>
                <TextInput style={sts.input} onChangeText={setPaciente} keyboardType='default' />
            </View>

            <View>
                <Text style={sts.lbl}>Dueño:</Text>
                <TextInput style={sts.input} onChangeText={setPropietario} keyboardType='default' />
            </View>

            <View>
                <Text style={sts.lbl}>Contacto:</Text>
                <TextInput style={sts.input} onChangeText={setTelefono} keyboardType='numeric' />
            </View>

            <View style={sts.btnPick}>
                <Button title="Elegir fecha" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    locale='es_ES'
                />
                <Text>{fecha}</Text>
            </View>
            <View style={sts.btnPick}>
                <Button title="Elegir hora" onPress={showTimePicker} />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirmTime}
                    onCancel={hideTimePicker}
                    locale='es_ES'
                    is24Hour
                />
                <Text>{hora}</Text>
            </View>

            <View>
                <Text style={sts.lbl}>Síntomas:</Text>
                <TextInput style={sts.input} multiline onChangeText={setSintomas} keyboardType='default' />
            </View>
            <View>
                <TouchableHighlight onPress={crearNuevaCita} style={sts.btnSubmit}>
                    <Text style={sts.txtSubmit}>Guardar X</Text>
                </TouchableHighlight>
            </View>

        </ScrollView>
    )
}

const sts = StyleSheet.create({
    formulario: {
        backgroundColor: "#FFF",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: '2.5%'
    },
    lbl: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnPick: {
        marginVertical: 10
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: '#7d024e',
        marginVertical: 10,
    },
    txtSubmit: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },
})

export default Formulario
