import { Pressable, TextInput, Image } from "react-native";
import { StyleSheet } from "react-native";
import { Text, View,CheckBox } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


var Hashes = require('jshashes');
var md5 = new Hashes.MD5();
const rnd = randomNum(0, 4)
/**
 * Renders the login screen.
 */
export function LogIn(props) {
	/**
	 * Context variables for authentication.
	 */
	const { credential, setCredential, hasUser, setHasUser } = useContext(AuthContext);

	/**
	 * State variables for text and checkbox.
	 */
	const [text, setText] = useState("");
	const [check, setCheck] = useState(false);
	
	/**
	 * Retrieves email and password from SyncStorage.
	 */
	const autEmail = getValueFor("email");
	const autPassword = getValueFor("password");
	async function getValueFor(key) {
		let result = await SecureStore.getItemAsync(key);
		if (result) {
			return result;
		} else {
			return null;
		}
	}
	/**
	 * Navigation object.
	 */
	const nav = useNavigation();

	/**
	 * Sets the user based on entered credentials.
	 */
	const setUser = () => {
		let Email= autEmail === credential.Email;
		let active = autPassword === credential.Password;
		Email = true;
		active = true;
		if (Email) {
			if (active)
				setHasUser(active);
			else
				alert("wrong password");
		} else {
			alert("wrong email");
		}
	}

;	/**
	 * Array of main images.
	 */
	const mainImages = [
		require('../assets/Fing.png'),
		require('../assets/Fing1.jpg'),
		require('../assets/Fing2.jpg'),
		require('../assets/Fing3.jpg'),
	];

	return (
		<View style={styles.container}>
			<Image source={mainImages[rnd]} style={{ width: "90%", height: 300, objectFit:"contain"}} />
			<Text style={styles.h2}>sign in</Text>
			<TextInput
				style={styles.input}
				placeholder="Email"
				onChangeText={(text) => {
					setCredential({ ...credential, Email: text });
				}}></TextInput>
			<TextInput
				style={styles.input}
				placeholder="Password"
				secureTextEntry={true}
				onChangeText={(text) => {
					setCredential({ ...credential, password: md5.hex(text) });
				}}></TextInput>
			<View style={{height: 50,width:"100%",flexDirection:"row",alignItems:"center" , justifyContent:"space-evenly"}}>
				{/* check box */}
				<View style={{flexDirection:"row",alignItems:"center"}}>
					{/* <CheckBox
						value={check}
						onValueChange={() => {setCheck(!check)}}
					/> */}
					<Text style={{fontSize:20, marginLeft:5, opacity:(check ? 1 : 0.6)}}>Remember me</Text>
				</View>
				<Pressable onPress={() => nav.navigate('ForgotPassword')}>			
					<Text style={{fontSize:20, opacity:0.8, textDecorationLine:"underline"}}>Forgot password?</Text>
				</Pressable>
			</View>
			<Pressable onPress={setUser} style={styles.LogInContainer}>
				<View style={styles.LogIn}>
					<Text style={styles.LogIn.text}>
						sign in
					</Text>
				</View>
			</Pressable>
			
			<View style={{height: 50,width:"100%",flexDirection:"row",alignItems:"center" , justifyContent:"space-evenly"}}>
				<View style={{height: 1,width:"20%",backgroundColor:"#9747FF"}}></View>
				<View>
					<Text style={{textAlign:"center",fontSize:23}}>or continue with</Text>
				</View>
				<View style={{height: 1,width:"20%",backgroundColor:"#9747FF"}}/>
			</View>
			<View style={{height: 80,width:"100%",flexDirection:"row",alignItems:"center",paddingHorizontal:50 , justifyContent:"center"}}>
				
				<View style={styles.IconsC}>
					<Image source={require('../assets/google.png')} style={styles.Icons} />
				</View>
				<View style={styles.IconsC}>
					<Image source={require('../assets/facebook.png')} style={styles.Icons} />
				</View>
				<View style={styles.IconsC}>
					<Image source={require('../assets/x.png')} style={styles.Icons} />
				</View>
			</View>

			<Pressable onPress={() => nav.navigate('SignUp')} style={styles.LogInContainer}>
				<View >
					<Text style={styles.text}>
						SignUp
					</Text>
				</View>
			</Pressable>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-evenly",
		width: wp(100),
	},
	text: {
		fontSize: hp(2.2),
	},
	h1: {
		fontSize: hp(4),
		textAlign: "left",
		width: wp(90),
	},
	h2: {
		fontSize: hp(3.6),
		textAlign: "left",
		width: wp(90),
		fontWeight: "bold",
	},
	input: {
		width: wp(90),
		borderColor: "#9747FF",
		borderWidth: 1,
		margin: wp(2.5),
		borderRadius: wp(3.3),
		padding: wp(2.5),
		fontSize: hp(2),
	},
	LogInContainer: {
		width: wp(60),
	},
	LogIn: {
		backgroundColor: "#9747FF",
		color: "white",
		paddingVertical: hp(1),
		marginVertical: hp(1.5),
		borderRadius: wp(3.3),
		borderColor: "#0804D3",
		borderWidth: 2,
		width: "100%",
		alignItems: "center",
		text: {
			color: "white",
			fontSize: hp(2),
		},
	},
	Icons: {
		width: wp(20),
		height: hp(7),
		objectFit: "contain",
	},
	IconsC: {
		borderRadius: wp(2.5),
		padding: wp(1.25),
		borderColor: "#9747FF",
		borderWidth: 1,
		borderRadius: wp(2),
		margin: 3,
	},
});
function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
};
