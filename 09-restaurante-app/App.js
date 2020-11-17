import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Orden from './pages/Orden';
import Progreso from './pages/Progreso';
import Resumen from './pages/Resumen';
import Detalle from './pages/Detalle';
import Formulario from './pages/Formulario';
import Menu from './pages/Menu';
import FirebaseState from './context/firebase/firebaseState';
import PedidoState from './context/pedidos/pedidosState';
import BotonResumen from './components/BotonResumen';

const Stack = createStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: '#FFD400',
  },
  headerTitleStyle: { fontWeight: 'bold' },
  headerTitleAlign: 'center',
  headerTintColor: '#000'
}

const App = () => {
  return (
    <FirebaseState>
      <PedidoState>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="new" screenOptions={screenOptions} >
            <Stack.Screen name="new" component={Orden} options={{ title: 'Nueva Orden' }} />
            <Stack.Screen name="menu"
              component={Menu}
              options={{
                title: 'Menu',
                headerRight: props => <BotonResumen  />
              }}
            />
            <Stack.Screen name="progreso" component={Progreso} options={{ title: 'Progreso' }} />
            <Stack.Screen name="resumen" component={Resumen} options={{ title: 'Resumen' }} />
            <Stack.Screen name="detalle" component={Detalle} options={{ title: 'Detalle' }} />
            <Stack.Screen name="form" component={Formulario} options={{ title: 'Formulario' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PedidoState>
    </FirebaseState>
  );
};

const styles = StyleSheet.create({

});

export default App;
