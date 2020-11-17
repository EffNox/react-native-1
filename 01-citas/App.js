import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';
import AsyncStore from '@react-native-community/async-storage'

const App = () => {

  const [showForm, setShowForm] = useState(false)

  const [citas, setCitas] = useState([]);

  const eliminaPaciente = id => {
    const citasFilter = citas.filter(d => d.id !== id)
    saveCitas(JSON.stringify(citasFilter))
    setCitas(citasFilter);
  }

  const hdshowForm = () => setShowForm(!showForm)

  const closeKeyBoard = () => Keyboard.dismiss();

  const saveCitas = async (citasJson) => {
    try {
      await AsyncStore.setItem('citas', citasJson);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const getCitasStg = async () => {
      try {
        const citasStg = await AsyncStore.getItem('citas')
        if (citasStg) setCitas(JSON.parse(citasStg))
      } catch (error) {
        console.log(error);
      }
    }
    getCitasStg();
  }, [])

  return (
    <TouchableWithoutFeedback onPress={closeKeyBoard}>
      <View style={sts.contenedor}>

        <Text style={sts.titulo}>Administrador de citas</Text>

        <View>
          <TouchableHighlight style={sts.btnShowForm} onPress={hdshowForm}>

            {!showForm ?
              <Text style={sts.txtShowForm}>Crear nueva cita</Text>
              :
              <Text style={sts.txtShowForm}>Ver listado</Text>
            }

          </TouchableHighlight>
        </View>

        <View style={sts.contenido}>

          {showForm ?
            <Formulario citas={citas} setCitas={setCitas} setShowForm={setShowForm} saveCitas={saveCitas} />
            :
            <>
              <Text style={sts.titulo}>{citas.length ? 'Administra tus citas' : 'No hay citas'}</Text>
              <FlatList style={sts.lst}
                data={citas}
                renderItem={({ item }) => <Cita item={item} eliminaPaciente={eliminaPaciente} />}
                keyExtractor={c => c.id}
              />
            </>
          }


        </View>
        {/* {citas.map(c => (
        <View>
          <Text>{c.paciente}</Text>
        </View>
      ))} */}

      </View>
    </TouchableWithoutFeedback>
  );
};

const sts = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1,
  },
  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'android' ? 15 : 40,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%'
  },
  lst: { flex: 1, },
  btnShowForm: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginBottom: 10
  },
  txtShowForm: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
})

export default App;
