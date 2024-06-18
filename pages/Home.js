import {
	View, 
	Text,
	StyleSheet,
	Button,
	Pressable,
	Image
} from "react-native";
import React, {useContext} from "react";
import {AuthContext} from "../auth";
import { useNavigation } from "@react-navigation/native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



export function Home(props) {
	const { credential,setCredential, hasUser, setHasUser } = useContext(AuthContext);
	const nav = useNavigation();
	const logOut = () => {
		setHasUser(false);
		setCredential({
			"Email":"",
			"Password": ""
		});
		
	};
	return (
		<View style={styles.container}>
			<View style={styles.mainText}> 
				<Text style={styles.text1}>All</Text>
				<Text style={styles.text2}>your transcions</Text>
				<Text style={styles.text2}>and more</Text>
				<Text style={styles.text3}>in your finger</Text>
			</View>
			<View>
				<Image source={require('../assets/home.png')} style={styles.MainImage} />
			</View>
			<View>
				<Text style={styles.text4}>quick transcions</Text>
				<View style={styles.quickTransCont}>
					<View style={styles.quickTrans}>
						<Pressable
							onPress={() => {
								nav.navigate('Transaction');
							}}
						>
							<Image source={require('../assets/visa2.png')} style={styles.image} />
						</Pressable>
					</View>
					<View style={styles.quickTrans}>
						<Pressable
							onPress={() => {
								nav.navigate('Transaction');
							}}
						>
							<Image source={require('../assets/visa2.png')} style={styles.image} />
						</Pressable>
					</View>
					<View style={styles.quickTrans}>
						<Pressable
							onPress={() => {
								nav.navigate('Transaction');
							}}
						>
							<Image source={require('../assets/visa2.png')} style={styles.image} />
						</Pressable>
					</View>
					<View style={styles.quickTrans2}>
						<Pressable
							onPress={() => {
								nav.navigate('Transaction');
							}}
						>
							<Image source={require('../assets/plus.png')} style={styles.image2} />
						</Pressable>
					</View>
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
	},
	quickTransCont: {
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	mainText: {
		alignItems: "center",
	},
	text1: {
		fontSize: hp(6),
	},
	text2: {
		fontSize: hp(5),
		opacity: 0.7,
	},
	text3: {
		fontSize: hp(5),
	},
	text4: {
		fontSize: hp(3.5),
	},
	MainImage : {
		width: wp(100),
		height: hp(30),
		objectFit: "cover",
	},
	image: {
		width: wp(20),
		height: wp(20),
		objectFit: "cover",
		borderRadius: wp(5),
		borderColor:"#000",
		borderWidth: 2,
		margin: wp(2.5),
	},
	quickTrans2:{
		width:wp(20),
		height:wp(20),
		borderRadius: wp(5),
		borderColor:"#000",
		borderWidth: 2,
		margin: wp(2.5),
		alignItems:"center",
		justifyContent:"center"
	},
	image2:{
		width: wp(15),
		height: wp(15),
		objectFit: "cover",
	},
});