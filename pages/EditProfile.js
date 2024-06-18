import React from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { 
	View,
	Text, 
	StyleSheet,
	Image,
	TextInput,
	Pressable,
	// ActivityIndicator,
	// ScrollView
} from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import {AuthContext} from "../auth";
// import { useContext,useEffect } from "react";
// import { Icon } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";

const checkPhotoLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log('Photo library permission status:', status);
    return status;
};




export function EditProfile() {
	// const {credential, setCredential} = useContext(AuthContext);
	// const nav = useNavigation();
	const [image, setImage] = useState("../assets/myRegPhotoSocial.png");
	const handlePhotoLibraryPermission = async () => {
		const status = await checkPhotoLibraryPermission();
		if (status === 'granted') {
			// Permission granted, proceed with accessing the photo library
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});
			console.log(result);
			setImage(result.assets[0].uri);
			console.log('Image selected:', image);

		} else {
			// Permission denied or undetermined, handle accordingly
	
		}
	};
	return (
		<>
			<View style={styles.container}>
				<Text style={[styles.h1,{marginTop:10}]}>Edit profile</Text>
				<Pressable 
					style={{alignItems:"center"}}
					onPress={handlePhotoLibraryPermission}
				>
					<Image source={{uri: image}} style={styles.image} />
					<Text style={styles.h2}>change photo</Text>
				</Pressable>
				{/* <Text style={styles.h3}>{credential.Email}</Text> */}
			</View>
			<View style={styles.inputContainer}>
				<View><Text style={styles.h2}>Full name</Text>
				<TextInput
					style={styles.input}
					placeholder="name"
					onChangeText={(text) => {
						// setCredential({ ...credential, Email: text });
					}}></TextInput>
			</View>
			<View>
				<Text style={styles.h2}>mobile number</Text>
				<TextInput
					style={styles.input}
					placeholder="phone"
					onChangeText={(text) => {
						// setCredential({ ...credential, Email: text });
					}}></TextInput>
			</View>
			<View>
				<Text style={styles.h2}>Date of Birth</Text>
				<TextInput
					style={styles.input}
					placeholder="date"
					onChangeText={(text) => {
						// setCredential({ ...credential, Email: text });
					}}></TextInput>
			</View>
			<View>
				<Text style={styles.h2}>Email</Text>
				<TextInput
					style={styles.input}
					placeholder="Email"
					onChangeText={(text) => {
						// setCredential({ ...credential, Email: text });
					}}></TextInput>
			</View>
			<View>
			{/* onPress={setUser} */}
				<Pressable >
					<View style={styles.LogIn}>
						<Text style={styles.LogIn.text}>
							save changes
						</Text>
					</View>
				</Pressable>
			</View>
			</View>
			
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	inputContainer: {
		padding: wp(5),
	},
	h1: {
		fontSize: hp(4),
	},
	h2: {
		fontSize: hp(2.66),
	},
	lft40: {
		opacity: 1,
		paddingLeft: wp(10),
	},
	h3: {
		fontSize: hp(2.2),
		opacity: 0.6,
	},
	rowButton: {
		borderBottomColor: "#9747FF",
		borderBottomWidth: 2,
		width:"100%",
		flexDirection: "row",
		height: hp(8.88),
		alignItems:"center",
		
	},
	buttonsContainer: {
		width: wp(90),
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
		width: wp(65),
		height: hp(5.6),
		alignItems: "center",
		flexDirection: "row",
		borderRadius: wp(2.5),
		marginVertical: hp(3.33),
	},
	input: {
		width: wp(90),
		borderColor: "#000",
		borderWidth: 1,
		marginBottom: hp(2),
		borderRadius: wp(3.125),
		padding: wp(2.5),
		fontSize: hp(2),
	},
	LogIn: {
		backgroundColor: "#9747FF",
		color: "white",
		paddingVertical: hp(1.8),
		marginVertical: hp(1.8),
		marginHorizontal: "auto",
		borderRadius: wp(3.125),
		borderColor: "#0804D3",
		borderWidth: 2,
		width: wp(80),
		alignItems: "center",
		text: {
			color: "white",
			fontSize: hp(2.5),
		},
	},
});