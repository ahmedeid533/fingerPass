import React , {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as SecureStore from 'expo-secure-store';

async function getValueFor(key) {
	let result = await SecureStore.getItemAsync(key);
	if (result) {
		return await result;
	} else {
		return null;
	}
}


export function CardData({route, navigation}) {
	const [data, setData] = useState();
	let view = [];
	const [viewA, setViewA] = useState([]);
	const {card} = route.params;

	console.log(card)
	console.log(data)
	if (data !== "undefined"){
		for(key in data) {
			if(data.hasOwnProperty(key)) {
				var value = data[key];
				//do something with value;
				if(key == "Front_image_data" || key == "Back_image_data" || key == "id" || key == "UserID") {
					continue;
				}
				console.log(viewA)
				view.push(
					<View style={styles.PairKeyValue} key={key}>
						<Text style={styles.key}>{key.replace("_"," ")}</Text>
						<Text style={styles.value}>{value}</Text>
					</View>
				)
			}
		}
	}
	const show = async () => {
		if(card == "id")
			setData(JSON.parse(await getValueFor("id")));
		else if(card == "license")
			setData(JSON.parse(await getValueFor("license")));
		else {
			setData(JSON.parse(await getValueFor(card)));
		};
	}
	useEffect(() => {
		show()
	}, [card]);
	useEffect(() => {
		setViewA(view);
	}, [data]);
	const [splash, setSplash] = useState(false);
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
			{
				data &&
				<View style={styles.rowOFPairs}>
					{viewA}
				</View>
			}
		</View>
		}
	</>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		height: hp(100),
	},
	rowOFPairs:{
		width:wp(95),
		flexDirection:"row",
		alignItems:"center",
		marginVertical:hp(1),
		flexWrap: 'wrap',
	},
	PairKeyValue:{
		width:wp(45),
		flexDirection:"column",
		alignItems:"center",
		marginVertical:hp(1)
	},
	key:{
		marginBottom:hp(2),
		fontSize:hp(3),
		color:"#000"
	},
	value:{
		padding:wp(1),
		fontSize:hp(2.2),
		color:"#000000BB"
	}
});