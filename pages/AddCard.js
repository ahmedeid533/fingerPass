import React from "react";
import { 
	View,
	Text, 
	StyleSheet, 
	Pressable,
	KeyboardAvoidingView,
	Platform,
	
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import { Image } from "react-native";
import { useState, useEffect } from "react";
import {Picker} from '@react-native-picker/picker';
import {plusToAdd} from "./image";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as SecureStore from 'expo-secure-store';

async function getValueFor(key) {
	let result = await SecureStore.getItemAsync(key);
	if (result) {
		return result;
	} else {
		return null;
	}
}

const base64ToUri = (base64) => {
    return `data:image/png;base64,${base64}`;
};

const checkPhotoLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log('Photo library permission status:', status);
    return status;
};

export function AddCard() {
	const [imageF, setImageF] = useState(plusToAdd);
	const [imageB, setImageB] = useState(plusToAdd);
	const [base64B, setBase64B] = useState("");
	const [base64F, setBase64F] = useState("");
	const [cardType, setCardType] = useState("NationalID");
	const handlePhotoLibraryPermissionFront = async () => {
		const status = await checkPhotoLibraryPermission();
		if (status === 'granted') {
			// Permission granted, proceed with accessing the photo library
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				base64: true,
				aspect: [1586, 1000],
				quality: 0.2,
			});
			setImageF(result.assets[0].uri);
			setBase64F(base64ToUri(result.assets[0].base64));
		} else {
			// Permission denied or undetermined, handle accordingly
	
		}
	};

	const handlePhotoLibraryPermissionBack = async () => {
		const status = await checkPhotoLibraryPermission();
		if (status === 'granted') {
			// Permission granted, proceed with accessing the photo library
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				base64: true,
				aspect: [1586, 1000],
				quality: 0.2,
			});
			setImageB(result.assets[0].uri);
			// encode base64
			setBase64B(base64ToUri(result.assets[0].base64));

		} else {
			// Permission denied or undetermined, handle accordingly
		}
	};
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
		<View style={styles.container}>
			<KeyboardAvoidingView 
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      			keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} 
				style={styles.container}
			>
			<ScrollView>
			<View style={[styles.container,{width:wp(94)}]}>
			<View>
				<Text style={styles.header}>
					Add Card
				</Text>
			</View>
			<View style={styles.inputs}>
				<Text style={styles.text}>
					type of card
				</Text>
				<Picker 
					selectedValue={cardType}
					onValueChange={(itemValue, itemIndex) => setCardType(itemValue)}
					style={styles.input}
				>
					<Picker.Item label="NationalID" value="NationalID" />
					<Picker.Item label="Visa" value="visa" />
					<Picker.Item label="DrivingLicense" value="DrivingLicense" />
					<Picker.Item label="phone" value="phone" />
				</Picker>
			</View>
			{
				(cardType === "NationalID" || cardType === "DrivingLicense") &&
				<View style={[styles.inputs,{flexDirection:"row"}]}>
					<View>
						<Text style={{fontSize: 22}}>
							Image of Front
						</Text>
						<Pressable 
							onPress={handlePhotoLibraryPermissionFront}
						>					
						<Image source={{uri: imageF}} style={styles.card} />
						</Pressable>
					</View>
					<View>
						<Text style={{fontSize: 22}}>
							Image of Back
						</Text>
						<Pressable 
							onPress={handlePhotoLibraryPermissionBack}
						>					
						<Image source={{uri: imageB}} style={styles.card} />
						</Pressable>
					</View>
				</View>
			}
			{
				cardType === "NationalID" &&
				<NationalID front={base64F} back={base64B}/>
			}
			{
				cardType === "visa" &&
				<Visa/>
			}
			{
				cardType === "DrivingLicense" &&
				<DrivingLicense front={base64F} back={base64B} />
			}
			{
				cardType === "phone" &&
				<Phone/>
			}
			</View>
			</ScrollView>
		</KeyboardAvoidingView>
		</View>
		}
		</>
	);
}

function NationalID(props) {
	const [nationalid, setNationalid] = useState("");
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [sex, setSex] = useState("male");
	const [status, setStatus] = useState("single");
	const [issuingCountry, setIssuingCountry] = useState("");
	const [issueDate, setIssueDate] = useState("2020-3-10");
	const [expiryDate, setExpiryDate] = useState("2030-4-6");

	const submit = async () => {
		const token = await getValueFor('token');
		const myHeaders = new Headers();
		myHeaders.append("Authorization", "Bearer " + token);
		const formdata = new FormData();
		
		formdata.append("NationalID", nationalid);
		formdata.append("Name", name);
		formdata.append("Address", address);
		formdata.append("Sex", sex);
		formdata.append("Status", status);
		formdata.append("Issuing_country", issuingCountry);
		formdata.append("Front_image_data", props.front);
		formdata.append("Back_image_data", props.back);
		formdata.append("IssueDate", issueDate);
		formdata.append("ExpiryDate", expiryDate);
		console.log(formdata)

		const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: formdata,
		redirect: "follow"
		};

		fetch( process.env.EXPO_PUBLIC_API_URL + "nationalid", requestOptions)
		.then((response) => response.json())
		.then((result) => {
			if (result.message) {
				alert(result.message)
				alert(result.error)
				return
			}
			alert("ID card added")
			
		})
		.catch((error) => alert("error", error));
	}

	return (
		<>
			<View style={{width:"100%"}}>
				<Text style={styles.cardInfos}>
					issuingCountry
				</Text>
				<TextInput
					style={[styles.cardInfosinput,{width:wp(90)}]}
					onChangeText={(e) => {
						setIssuingCountry(e);
					}}
				></TextInput>
			</View>
			<View style={{width:"100%"}}>
				<Text style={styles.cardInfos}>
					NationalID
				</Text>
				<TextInput
					style={[styles.cardInfosinput,{width:wp(90)}]}
					keyboardType='numeric'
					onChangeText={(e) => { setNationalid(e); }}
				></TextInput>
			</View>
			<View style={styles.cvc}>
				<View>
					<Text style={styles.cardInfos}>
						Name on the ID
					</Text>
					<TextInput
						style={styles.cardInfosinput}
						onChangeText={(e) => { setName(e); }}
					></TextInput>
				</View>
				<View>
					<Text style={styles.cardInfos}>
						Address
					</Text>
					<TextInput
						style={styles.cardInfosinput}
						onChangeText={(e) => { setAddress(e); }}
					></TextInput>
				</View>
			</View>
			<View style={styles.cvc}>
				<View>
					<Text style={styles.cardInfos}>
						Sex
					</Text>
					<Picker
						selectedValue={sex}
						onValueChange={(itemValue, itemIndex) => setSex(itemValue)}
						style={{width: wp(40),}}
					>
						<Picker.Item label="male" value="male" />
						<Picker.Item label="female" value="female"/>
					</Picker>
				</View>
				<View>
					<Text style={styles.cardInfos}>
						Status
					</Text>
					<Picker
						selectedValue={status}
						onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
						style={{width: wp(40)}}
					>
						<Picker.Item label="single" value="single" />
						<Picker.Item label="married" value="married"/>
						<Picker.Item label="divorced" value="divorced"/>
						<Picker.Item label="widow" value="widow"/>
					</Picker>
				</View>
			</View>
			<View style={styles.cvc}>
				<View>
					<Text style={styles.cardInfos}>
						Issue date
					</Text>
					<TextInput
						style={styles.cardInfosinput}
						placeholder="yyyy-mm-dd"
						onChangeText={(e) => { setIssueDate(e) }}
					></TextInput>
				</View>
				<View>
					<Text style={styles.cardInfos}>
						Expiry date
					</Text>
					<TextInput
						style={styles.cardInfosinput}
						placeholder="yyyy-mm-dd"
						onChangeText={(e) => { setExpiryDate(e) }}
					></TextInput>
				</View>
			</View>
			<View>
				<Pressable 
					style={styles.submit}
					onPress={submit}
				>
					<Text style={{color:"#fff"}}>
						submit
					</Text>
				</Pressable>
			</View>
		</>
	);
}

function DrivingLicense(props) {
	const [licenseNumber, setLicenseNumber] = useState("");
	const [issuingCountry, setIssuingCountry] = useState("");
	const [issueDate, setIssueDate] = useState("");
	const [expiryDate, setExpiryDate] = useState("");

	const submit = async () => {
		const token = await getValueFor('token');
		const myHeaders = new Headers();
		myHeaders.append("Authorization", "Bearer " + token);

		const formdata = new FormData();
		formdata.append("License_number", licenseNumber);
		formdata.append("Issuing_country", issuingCountry);
		formdata.append("Front_image_data", props.front);
		formdata.append("Back_image_data", props.back);
		formdata.append("IssueDate", issueDate);
		formdata.append("ExpiryDate", expiryDate);
		

		const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: formdata,
		redirect: "follow"
		};

		fetch( process.env.EXPO_PUBLIC_API_URL + "Drivinglicense", requestOptions)
		.then((response) => response.json())
		.then((result) => {
			if (result.message) {
				alert(result.message)
				alert(result.error)
			} else {
				alert("License added")
			}
			
			
		})
		.catch((error) => alert("error", error));
	}

	return (
		<>
			<View style={{width:"100%"}}>
				<Text style={styles.cardInfos}>
					issuingCountry
				</Text>
				<TextInput
					style={[styles.cardInfosinput,{width:wp(90)}]}
					onChangeText={(e) => {
						setIssuingCountry(e);
					}}
				></TextInput>
			</View>
			<View style={{width:"100%"}}>
				<Text style={styles.cardInfos}>
					License number
				</Text>
				<TextInput
					style={[styles.cardInfosinput,{width:wp(90)}]}
					keyboardType='numeric'
					onChangeText={(e) => { setLicenseNumber(e); }}
				></TextInput>
			</View>
			<View style={styles.cvc}>
				<View>
					<Text style={styles.cardInfos}>
						Issue date
					</Text>
					<TextInput
						style={styles.cardInfosinput}
						placeholder="yyyy-mm-dd"
						onChangeText={(e) => { setIssueDate(e); }}
					></TextInput>
				</View>
				<View>
					<Text style={styles.cardInfos}>
						Expiry date
					</Text>
					<TextInput
						style={styles.cardInfosinput}
						placeholder="yyyy-mm-dd"
						onChangeText={(e) => { setExpiryDate(e); }}
					></TextInput>
				</View>
			</View>
			<View>
				<Pressable 
					style={styles.submit}
					onPress={submit}
				>
					<Text style={{color:"#fff"}}>
						submit
					</Text>
				</Pressable>
			</View>
		</>
	);
}

function Visa() {
	const [cardNumber, setCardNumber] = useState("");
	const [name, setName] = useState("");
	const [cardType, setCardType] = useState("");
	const [cvv, setCvv] = useState("");
	const [bankName, setBankName] = useState("");
	const [issueDate, setIssueDate] = useState("");
	const [expiryDate, setExpiryDate] = useState("");

	const submit = async () => {
		const token = await getValueFor('token');
		const myHeaders = new Headers();
		myHeaders.append("Authorization", "Bearer " + token);

		const formdata = new FormData();
		formdata.append("Cardholder_name", name);
		formdata.append("CardNumber", cardNumber);
		formdata.append("CardType", cardType);
		formdata.append("CVV", cvv);
		formdata.append("BankName", bankName);
		formdata.append("IssueDate", issueDate);
		formdata.append("ExpiryDate", expiryDate);
		console.log(formdata)
		const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: formdata,
		redirect: "follow"
		};

		fetch( process.env.EXPO_PUBLIC_API_URL + "card", requestOptions)
		.then((response) => response.json())
		.then((result) => {
			if (result.message) {
				alert(result.error)
				return
			}
			alert("Bank card added")
		})
		.catch((error) => alert("error", error));
	}

	return (
		
			<>
			<View style={{width:"100%"}}>
				<Text style={styles.cardInfos}>
					CardNumber
				</Text>
				<TextInput
					style={[styles.cardInfosinput,{width:wp(90)}]}
					keyboardType='numeric'
					onChangeText={(e) => { setCardNumber(e); }}
				></TextInput>
			</View>
			<View style={styles.cvc}>
				<View>
					<Text style={styles.cardInfos}>
						Name on the ID
					</Text>
					<TextInput
						style={styles.cardInfosinput}
						onChangeText={(e) => { setName(e); }}
					></TextInput>
				</View>
				<View>
					<Text style={styles.cardInfos}>
						Card type
					</Text>
					<TextInput
						style={styles.cardInfosinput}
						keyboardType='numeric'
						onChangeText={(e) => { setCardType(e); }}
					></TextInput>
				</View>
			</View>
			<View style={styles.cvc}>
				<View>
					<Text style={styles.cardInfos}>
						CVV
					</Text>
					<TextInput
						style={styles.cardInfosinput}
						onChangeText={(e) => { setCvv(e); }}
					></TextInput>
				</View>
				<View>
					<Text style={styles.cardInfos}>
						Bank name
					</Text>
					<TextInput
						style={styles.cardInfosinput}
						onChangeText={(e) => { setBankName(e); }}
					></TextInput>
				</View>
			</View>
			<View style={styles.cvc}>
				<View>
					<Text style={styles.cardInfos}>
						Issue date
					</Text>
					<TextInput
						style={styles.cardInfosinput}
						placeholder="yyyy-mm-dd"
						onChangeText={(e) => { setIssueDate(e); }}
					></TextInput>
				</View>
				<View>
					<Text style={styles.cardInfos}>
						Expiry date
					</Text>
					<TextInput
						style={styles.cardInfosinput}
						placeholder="yyyy-mm-dd"
						onChangeText={(e) => { setExpiryDate(e); }}
					></TextInput>
				</View>
			</View>
			<View>
				<Pressable 
					style={styles.submit}
					onPress={submit}	
				>
					<Text style={{color:"#fff"}}>
						submit
					</Text>
				</Pressable>
			</View>
			</>
	);
}

function Phone() {
	const [phoneNumber, setPhoneNumber] = useState("");

	const submit = async () => {
		const token = await getValueFor('token');
		const myHeaders = new Headers();
		myHeaders.append("Authorization", "Bearer " + token);

		const formdata = new FormData();
		formdata.append("PhoneNumber", phoneNumber);

		const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: formdata,
		redirect: "follow"
		};

		fetch( process.env.EXPO_PUBLIC_API_URL + "phone", requestOptions)
		.then((response) => response.json())
		.then((result) => {
			if (result.message) {
				alert(result.message)
				return
			}
			alert("Phone added")
		})
		.catch((error) => alert("error", error));
	}

	return (
		<>
			<View style={{width:"100%"}}>
				<Text style={styles.cardInfos}>
					Phone Number
				</Text>
				<TextInput
					style={[styles.cardInfosinput,{width:wp(90)}]}
					keyboardType='numeric'
					onChangeText={(e) => {
						setPhoneNumber(e);
					}}
				></TextInput>
			</View>
			<View>
				<Pressable 
					style={styles.submit}
					onPress={submit}	
				>
					<Text style={{color:"#fff"}}>
						submit
					</Text>
				</Pressable>
			</View>
			
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-evenly",
		padding:wp(3),
		height: hp(87),
		width: wp(100),
	},
	header: {
		fontSize: hp(3.5),
	},
	inputs: {
		width: wp(90),
		alignItems: "flex-start",
		justifyContent: "space-between",
	},
	input: {
		borderWidth: 1,
		borderColor: "#7730D2",
		alignSelf: "center",
		width: wp(90),
		padding: wp(1.5),
		borderRadius: wp(7.5),
		margin: wp(1.5),
	},
	text: {
		fontSize: hp(2),
	},
	card: {
		width: wp(40),
		height:wp(40/1.586),
		borderColor: "#111111",
		borderWidth: 2,
		borderRadius: wp(2),
		objectFit: "contain",
	},
	cardInfos: {
		fontSize: wp(4),
		color: "#00000088",
	},
	cardInfosinput: {
		borderBottomWidth: 1,
		borderColor: "#111111",
		paddingLeft: wp(3),
		width: wp(40),
		padding: wp(1),
	},
	cvc: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: wp(90)
	},
	submit: {
		backgroundColor: "#7730D2",
		padding: wp(2),
		borderRadius: wp(5),
		width: wp(40),
		alignItems: "center",
		color: "#fff",
	},
});
