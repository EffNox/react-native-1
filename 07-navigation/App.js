import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Inicio from './views/Inicio';
import Nosotros from './views/Nosotros';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicio" screenOptions={{
          title: 'Componente Principal',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F4511E',
          },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold', }
        }}>
          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen name="Nosotros" component={Nosotros} options={({ route }) => ({
            // title: 'Sobre Nosotros',
            title: route.params.clienteId,
          })} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
