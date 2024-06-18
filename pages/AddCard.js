import React from "react";
import { 
	View,
	Text, 
	StyleSheet, 
	Pressable
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import { Image } from "react-native";
import { useState } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const checkPhotoLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log('Photo library permission status:', status);
    return status;
};

export function AddCard() {
	const [image, setImage] = useState("../assets/visa2.png");
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
		<View style={styles.container}>
			<View>
				<Text style={styles.header}>
					Add Card
				</Text>
			</View>
			<View style={styles.inputs}>
				<Text style={styles.text}>
					type of card
				</Text>
				<TextInput
					style={styles.input}
					keyboardType='numeric'
				></TextInput>
			</View>
			<View style={styles.inputs}>
				<Text style={styles.text}>
					card provider
				</Text>
				<TextInput
					style={styles.input}
				></TextInput>
			</View>
			<View style={styles.inputs}>
				<Text style={{fontSize: 22}}>
					Image of Card
				</Text>
				<Pressable 
					onPress={handlePhotoLibraryPermission}
				>
					
				<Image source={{uri: image}} style={styles.card} />
				</Pressable>
			</View>
			<View style={{width:"100%"}}>
				<Text style={styles.cardInfos}>
					Card Number
				</Text>
				<TextInput
					style={[styles.cardInfosinput]}
					keyboardType='numeric'
				></TextInput>
			</View>
			<View style={styles.cvc}>
				<View>
					<Text style={styles.cardInfos}>
						expiration
					</Text>
					<TextInput
						style={styles.cardInfosinput}
					></TextInput>
				</View>
				<View>
					<Text style={styles.cardInfos}>
						CVC
					</Text>
					<TextInput
						style={styles.cardInfosinput}
						keyboardType='numeric'
					></TextInput>
				</View>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-evenly",
		padding:wp(5)
	},
	header: {
		fontSize: hp(4.5),
	},
	inputs: {
		width: wp(90),
		alignItems: "flex-start",
	},
	input: {
		borderWidth: 1,
		borderColor: "#7730D2",
		alignSelf: "center",
		width: wp(90),
		padding: wp(2.5),
		borderRadius: wp(7.5),
		margin: wp(5),
	},
	text: {
		fontSize: hp(2.5),
	},
	card: {
		width: wp(90),
		height:wp(90/1.586),
		objectFit: "contain",
	},
	cardInfos: {
		fontSize: wp(5),
		color: "#888888",
		
	},
	cardInfosinput: {
		borderBottomWidth: 1,
		borderColor: "#111111",
		paddingLeft: wp(5),
		padding: wp(2.5),
	},
	cvc: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: wp(5),
		width: wp(90)
	},
});