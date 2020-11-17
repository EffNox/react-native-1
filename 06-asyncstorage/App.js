import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableHighlight } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";

const App = () => {

  const [inputTxt, setInputTxt] = useState('')
  const [nomStg, setNomStg] = useState('')

  useEffect(() => {
    getDataStorage();
  }, [])


  const saveData = async () => {
    try {
      await AsyncStorage.setItem('nom', inputTxt)
      setNomStg(inputTxt)
    } catch (error) {
      console.log(error);
    }
  }
  const getDataStorage = async () => {
    try {
      const nom = await AsyncStorage.getItem('nom');
      setNomStg(nom);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem('nom');
      setNomStg('')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.contenedor}>
      {nomStg ? <Text >Hola: {nomStg}</Text> : null}
      <TextInput style={styles.input} onChangeText={setInputTxt} placeholder="Digite su nombre..." />
      <Button title="Guardar" color="#999" onPress={saveData} />
      {nomStg ?
        <TouchableHighlight onPress={deleteData} style={styles.btnEli}>
          <Text style={styles.txtEli}>Eliminar Nombre &times;</Text>
        </TouchableHighlight>
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    // backgroundColor: '#555',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderColor: '#666',
    borderBottomWidth: 1,
    marginBottom: 15,
    width: 300,
    height: 40
  },
  btnEli: {
    backgroundColor: 'red',
    marginTop: 20,
    padding: 10,
  },
  txtEli: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 300
  },
});

export default App;
