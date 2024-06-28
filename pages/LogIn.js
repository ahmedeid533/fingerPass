import {
			Pressable,
			TextInput,
			Image,
			KeyboardAvoidingView,
			Platform,
			Text,
			View,
			StyleSheet,
			ScrollView,
		} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

async function save(key, value) {
	await SecureStore.setItemAsync(key, value);
}


/**
 * Renders the login screen.
 */
export function LogIn(props) {
	/**
	 * Context variables for authentication.
	 */
	const { credential, setCredential, hasUser, setHasUser } = useContext(AuthContext);

	/**
	 * Sets the user based on entered credentials.
	 */
	const fecthToken = async () => {
		var formdata = new FormData();
		formdata.append("Email", credential.Email);
		formdata.append("Pin", credential.Bin);

		var requestOptions = {
			method: 'POST',
			body: formdata,
			redirect: 'follow',
		};
		fetch(process.env.EXPO_PUBLIC_API_URL + "log/login", requestOptions)
		.then(response => response.json())
		.then(result => {
			if (result.access_token) {
				console.log('success', result.access_token)
				save("token", result.access_token)
				setHasUser(true);
			} else {	
				console.log('error', result)
				alert("wrong email or bin");
			}
		})
		.catch(error => {
			console.log('error', error)
			alert("wrong email or bin");
		});
	}
	/**
	 * State variables for text and checkbox.
	 */
	const [text, setText] = useState("");
	const [check, setCheck] = useState(false);
	const [splash, setSplash] = useState(false);

	/**
	 * Retrieves email and password from SyncStorage.
	 */
	// const autEmail = getValueFor("email");
	// const autPassword = getValueFor("password");
	
	/**
	 * Navigation object.
	 */
	const nav = useNavigation();

	
;	/**
	 * main image.
	 */
	const mainImages = require('../assets/nditp.png')

	useEffect(() => {
		setTimeout(() => {
			setSplash(true);
		}, 2000);
	}, []);
	return (
		<>
		{
			!splash &&
			<View style={styles.container}>
				<Image source={mainImages} style={{ width: wp(50), height: wp(50), objectFit:"contain"}} />
			</View>
		}
		{
			splash &&
			<View style={styles.container}>
			<KeyboardAvoidingView 
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      			keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
				style={styles.container}
			>
			<ScrollView >
			<View style={styles.container}>
			<Image source={mainImages} style={{ width: "90%", height: 300, objectFit:"contain"}} />
			<Text style={styles.h2}>sign in</Text>
			<TextInput
				style={styles.input}
				placeholder="Email"
				onChangeText={(text) => {
					setCredential({ ...credential, Email: text });
				}}></TextInput>
			<TextInput
				style={styles.input}
				placeholder="bin"
				secureTextEntry={true}
				keyboardType="numeric"
				onChangeText={(text) => {
					setCredential({ ...credential, Bin: text });
				}}></TextInput>
			
			<Pressable onPress={fecthToken} style={styles.LogInContainer}>
				<View style={styles.LogIn}>
					<Text style={styles.LogIn.text}>
						sign in
					</Text>
				</View>
			</Pressable>
			
			{/* <View style={{height: 50,width:"100%",flexDirection:"row",alignItems:"center" , justifyContent:"space-evenly"}}>
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
			</View> */}
			</View>
		</ScrollView>
		</KeyboardAvoidingView>
		</View>
		}
		</>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-evenly",
		width: wp(100),
		height: hp(90),
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
