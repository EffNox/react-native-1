import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Keyboard, TouchableWithoutFeedback, Animated, Alert } from 'react-native';

import Formulario from './components/Formulario';
import Clima from './components/Clima';

const App = () => {

  const hideKeyboard = () => Keyboard.dismiss();

  const [search, setSearch] = useState({ ciudad: '', pais: '' })
  const [consultar, setConsultar] = useState(false)
  const [resultado, setResultado] = useState({})
  const [bgColor, setBgColor] = useState('rgb(71,149,212)')

  const { ciudad, pais } = search;
  const key = '8437571bed12a064431472edbe758200';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${key}`;

  useEffect(() => {
    const consultarClima = async () => {
      if (consultar) {
        try {
          const rs = await fetch(url);
          const rsJson = await rs.json();
          setResultado(rsJson)
          setConsultar(false)
          const kelvin = 273.15;
          const { main } = resultado;
          const actual = main.temp - kelvin;
          if (actual < 10) {
            setBgColor('rgb(105,108,149)')
          } else if (actual >= 10 && actual < 25) {
            setBgColor('rgb(71,149,212)')
          } else {
            setBgColor('rgb(178,28,61)')
          }
        } catch (error) {
          showAlert();
        }
      }
    }
    consultarClima();
  }, [consultar])

  const showAlert = () => Alert.alert('Error', 'No hay resultados', [{ text: 'Aceptar' }])

  const bgColorApp = {
    backgroundColor: bgColor
  }

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={[styles.app, bgColorApp]}>
        <View style={styles.contenido}>
          <Clima resultado={resultado} />
          <Formulario search={search} setSearch={setSearch} setConsultar={setConsultar} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
  },
  contenido: {
    marginHorizontal: '2.5%'
  },
});

export default App;
