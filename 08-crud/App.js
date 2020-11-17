import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Inicio from './views/Inicio';
import NuevoCliente from './views/NuevoCliente';
import DetallesCliente from './views/DetallesCliente';
import BarraSuperior from './components/ui/Barra';
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
// import DefaultTheme from "react-native-paper/lib/module/styles/DefaultTheme";

const Stack = createStackNavigator();

const { colors, } = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#0655BF'
  }
}
const styleHeaders = {
  headerTitleAlign: 'center',
  headerTitleStyle: { fontWeight: 'bold' },
  headerStyle: { backgroundColor: colors.primary },
  headerTintColor: colors.surface
}


const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home" screenOptions={styleHeaders} >
          <Stack.Screen name="home" component={Inicio}
            options={({ navigation, route }) => ({
              title: 'Inicio',
              // headerLeft: () => <BarraSuperior navigation={navigation} route={route} />
              // headerLeft: (props) => <BarraSuperior {...props} navigation={navigation} route={route} />
            })}
          />
          <Stack.Screen name="new" component={NuevoCliente} options={{ title: 'Administración' }} />
          <Stack.Screen name="details" component={DetallesCliente} options={{ title: 'Detalles Cliente' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({

});

export default App;
