import "reflect-metadata";
import React, { useCallback, useEffect, useState } from "react";
import {  FlatList, SafeAreaView, StyleSheet, View } from "react-native";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AddViewCitizens from "./src/AddViewCitizens";
import {CitizenFlatList} from './src/components/CitizenFlatList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddEntry from "./src/components/AddEntry";

const Tab = createMaterialBottomTabNavigator();
const tabProps = {
  initialRouteName: 'App1Screen',
  tabBarOptions:{
  activeTintColor: 'green',
  inactiveTintColor: 'grey',
  
  
  style: {
  backgroundColor: '#23cc8c',
  },
  backBehavior: 'history'//Behaviour when system back is touched. Options are none, initialRoute, order, history. This seems to be buggy
  },
  lazy: true //default is true
  }
  
const App: React.FC = () => {



  return (
     <NavigationContainer>
    <Tab.Navigator {...tabProps} barStyle={{backgroundColor: '#23cc8c'}}>
      <Tab.Screen name="Add Entry" component={AddViewCitizens}  options={{tabBarLabel: 'Register Citizen', tabBarIcon: ({ color}) => (
<MaterialCommunityIcons name="human" color={color} size={25}  />
)}} /> 
      <Tab.Screen  name="Citizen List" component={CitizenFlatList} options={{tabBarLabel: 'Citizen List', tabBarIcon: ({ color}) => (
<MaterialCommunityIcons name="book" color={color} size={25}  />
)}} />
    </Tab.Navigator>
  </NavigationContainer>
          
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 16, color: "black" },
  inputContainerStyle: {
    width: "100%",
    padding: 9,
  },
});

export default App;
