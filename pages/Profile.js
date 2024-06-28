import React, { useState } from "react";
import { 
	View,
	Text, 
	StyleSheet,
	Image,
	Pressable,
	ActivityIndicator,
	ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {AuthContext} from "../auth";
import { useContext, useEffect } from "react";
import { Icon } from '@rneui/themed';
import { plusToAdd } from "./image";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as SecureStore from 'expo-secure-store';


export function ThePage(props) {
	const { credential,setCredential, hasUser, setHasUser } = useContext(AuthContext)
	const nav = useNavigation();

	const mainImages = require('../assets/nditp.png')
	const [splash, setSplash] = useState(false);
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
			<>
				<View style={styles.container}>
					<Text style={[styles.h1,{marginTop:10}]}>profile</Text>
					<Image source={plusToAdd} style={styles.image} />
					<Text style={styles.h3}>{credential.Email}</Text>
				</View>
				<View style={styles.buttonsContainer}>
					<Pressable 
						style={styles.rowButton}
						onPress={() => {
							nav.navigate('MyCards');
						}}
					>
						<Icon
							name='wallet'
							type='font-awesome-5'
							size={44}
							style={
								{
									paddingLeft: 20
								}
							}
						></Icon>
						<Text style={styles.h2}>
							my cards
						</Text>
					</Pressable>
					<Pressable
						style={styles.rowButton}
						onPress={() => {
							nav.navigate('EditProfile');
						}}
					>
						<Icon
							solid={true}
							name='user-circle'
							type='font-awesome-5'
							size={44}
							style={
								{
									paddingLeft: 20
								}
							}
						></Icon>
						<Text style={styles.h2}>
							edit profile
						</Text>
					</Pressable>
					<Pressable style={styles.rowButton}>
						<Icon
							name='cog'
							type='font-awesome-5'
							size={44}
							style={
								{
									paddingLeft: 20
								}
							}
						></Icon>
						<Text style={styles.h2}>
							setting
						</Text>
					</Pressable>
					<Pressable style={styles.rowButton}>
						<Icon
							name='globe'
							type='font-awesome-5'
							size={44}
							style={
								{
									paddingLeft: 20
								}
							}
						></Icon>
						<Text style={styles.h2}>
							Language
						</Text>
					</Pressable>
				</View>
				<View style={{backgroundColor:"#fff", alignItems:"center"}}>
					<Pressable style={styles.logOut}>
						<Icon
							name='sign-out-alt'
							type='font-awesome-5'
							size={44}
							color={"white"}
							style={
								{
									paddingLeft: 20
								}
							}
						></Icon>
						<Text style={[styles.h2,{color:"white"}]} 
						onPress={() => {
							setHasUser(false);
							setCredential({
								"Email":"",
								"Password": ""
							});
							// remove the user token from the secure store
							SecureStore.deleteItemAsync("token");
							var requestOptions = {
								method: 'POST',
								redirect: 'follow'
							  };
							  
							  fetch("http://127.0.0.1:8000/api/log/logout", requestOptions)
								.then(response => response.text())
								.then(result => console.log(result))
								.catch(error => console.log('error', error));
							}}
						>
							LogOut
						</Text>
					</Pressable>
				</View>
			</>
		}
		</>
	);
}

export function Profile() {
	const [splash, setSplash] = React.useState(true);
	React.useEffect(() => {
		setTimeout(() => {
			setSplash(false);
		}, 300);
	}, []);
	return (
		<>
		{
			splash 
			? 
			<View style={styles.container}><ActivityIndicator size="large" /></View> 
			:
			<ThePage/>	
		}	
		</>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: hp(2.1),
		height: hp(100),
	},
	h1: {
		fontSize: hp(4),
	},
	h2: {
		fontSize: hp(2.2),
		opacity: 1,
		paddingLeft: wp(10),
	},
	h3: {
		fontSize: hp(2.1),
		opacity: 0.6,
	},
	rowButton: {
		borderBottomColor: "#9747FF",
		borderBottomWidth: 2,
		width:wp(100),
		flexDirection: "row",
		height:hp(8.5),
		alignItems:"center",
		
	},
	buttonsContainer: {
		width: wp(100),
		backgroundColor: "#fff",
	},
	image:{
		width: wp(50),
		height: wp(50),
		objectFit:"cover",
		borderRadius: wp(25),
	},
	logOut: {
		backgroundColor: "#9747FF",
		color: "#fff",
		width: wp(70),
		height: wp(13),
		alignItems: "center",
		flexDirection: "row",
		borderRadius: wp(2.5),
		marginVertical: hp(3.5),
	}
});