import { Pressable, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';

var Hashes = require('jshashes');
var md5 = new Hashes.MD5();

async function save(key, value) {
	await SecureStore.setItemAsync(key, value);
}

export function SignUp() {
	const [email, setEmail] = useState("");
	const [password,setPassowrd] = useState("")

	const nav = useNavigation();
	
	
	const setUser = () => {
		save('Email',email)
		save('Password',md5.hex(password))
		nav.navigate("LogIn")
	}
	return (
		<View style={styles.container}>
			<Text style={styles.text}>For test porpose only</Text>
			<Text style={styles.text}>Email : {email}</Text>
			<TextInput
				style={styles.input}
				onChangeText={(text) => {
					setEmail(text);
				}}></TextInput>
			<Text style={styles.text}>Password : {password}</Text>
			<TextInput
				style={styles.input}
				onChangeText={(text) => {
					setPassowrd(text);
				}}></TextInput>
			<Pressable onPress={setUser}>
				<View style={styles.LogIn}>
					<Text style={styles.LogIn.text}>
						sign up
					</Text>
				</View>
			</Pressable>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 20,
	},
	input: {
		height: 40,
		width: 200,
		borderColor: "gray",
		borderWidth: 1,
	},
	LogIn: {
		backgroundColor: "#9747FF",
		color: "white",
		paddingVertical: 10,
		marginVertical: 15,
		borderRadius: 15,
		borderColor: "#0804D3",
		borderWidth: 2,
		width: "100%",
		alignItems: "center",
		text: {
			color: "white",
			fontSize: 18,
		},
	},

});
