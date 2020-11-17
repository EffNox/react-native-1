import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Image, View, ScrollView, ActivityIndicator
} from 'react-native';

import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Axios from 'axios';

const App = () => {

  const [moneda, setMoneda] = useState('')
  const [criptomoneda, setCriptomoneda] = useState('')
  const [rsApi, setRsApi] = useState(false)
  const [response, setResponse] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const cotizarCrypto = async () => {
      if (rsApi) {
        setLoading(true)
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const rs = await Axios.get(url);
        setTimeout(() => {
          setResponse(rs.data.DISPLAY[criptomoneda][moneda])
          setRsApi(false)
          setLoading(false)
        }, 3000);
      }
    }
    cotizarCrypto();
  }, [rsApi])


  const component = loading ? <ActivityIndicator size="large" color="#5E49E2" /> : <Cotizacion response={response} />

  return (
    <ScrollView>
      <Header />
      <Image style={styles.img} source={require('./assets/img/cryptomonedas.png')} />
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          criptomoneda={criptomoneda}
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda}
          setRsApi={setRsApi}
        />
      </View>
      <View style={{ marginTop: 40 }}>
        {component}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 200,
    marginHorizontal: '2.5%'
  },
  contenido: {
    marginHorizontal: '2.5%'
  },
});

export default App;
