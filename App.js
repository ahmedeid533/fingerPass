import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { AuthContext } from './auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LogIn } from './pages/LogIn';
import { Home } from './pages/Home';
import { AddCard } from './pages/AddCard';
import { Profile } from './pages/Profile';
import { Notify } from './pages/Notify';
import { MyCards } from './pages/MyCards';
import { CardData } from './pages/CardData';
import { EditProfile } from './pages/EditProfile';
import { Transaction } from './pages/Transaction';
import { Icon } from '@rneui/themed';


var Hashes = require('jshashes');
var md5 = new Hashes.MD5();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function AuthPage () {
	return (
	<Stack.Navigator>
		<Stack.Screen name="LogIn" component={LogIn} />
	</Stack.Navigator>);
};

export function TheApp () {
	return (
	<Stack.Navigator>
		<Stack.Screen name="eProfile" component={Pages} 
			options={{
				headerShown: false,
			}}
		/>
		<Stack.Screen name="MyCards" component={MyCards}
			options={{
				title: 'My Cards',
				headerStyle: {
					shadowColor: 'transparent', // this covers iOS
					elevation: 0, // this covers Android
					borderBottomWidth: 0,
				},
			}} 
		/>
		<Stack.Screen name="EditProfile" component={EditProfile}
			options={{
				title: 'Edit Profile',
				headerStyle: {
					shadowColor: 'transparent', // this covers iOS
					elevation: 0, // this covers Android
					borderBottomWidth: 0,
				},
			}}
		/>
		<Stack.Screen name="Transaction" component={Transaction}/>
		<Stack.Screen name="CardData" component={CardData}/>
	</Stack.Navigator>);
}



export function Pages () {
	return (
	<Tab.Navigator>	
		<Tab.Screen 
			name="Profile" 
			component={Profile}
			options={{
				headerShown: false,
				tabBarIcon: () => (
					<Icon name="person" color={"#0804D3"} size={40} />
				),
				tabBarShowLabel: false,
			}}
		/>
		<Tab.Screen 
			name="AddCard"
			component={AddCard}
			options={{
				headerShown: false,
				tabBarIcon: () => (
					<Icon name="add" color={"#0804D3"} size={40}  />
				),
				tabBarShowLabel: false,
			}}
		/>
		<Tab.Screen
			name="Notify"
			component={Notify}
			options={{
				headerShown: false,
				tabBarIcon: () => (
					<Icon name="notifications" color={"#0804D3"} size={40}  />
				),
				// NOTIFICATION NUMBER
				tabBarBadge: 5,
				tabBarShowLabel: false,
			}}
		/>

		<Tab.Screen
			name="Home"
			component={Home}
			options={{
				headerShown: false,
				tabBarIcon: () => (
					<Icon name="home" color={"#0804D3"} size={40}  />
				),
				tabBarShowLabel: false,
			}}
		/>
	</Tab.Navigator>);
}

export default function App() {
	const [credential, setCredential] = useState({
		"Email": "",
		"Bin": ""
	});
	const [hasUser, setHasUser] = useState(false);
  return (
    <AuthContext.Provider value={{ credential, setCredential, hasUser, setHasUser }}>
		<NavigationContainer>
			{!hasUser 
			? <AuthPage/>
			: <TheApp/>}
		</NavigationContainer>  
	</AuthContext.Provider>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
