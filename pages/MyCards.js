import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	Pressable,
} from "react-native";
global.Buffer = require('buffer').Buffer;
import { Icon } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
	await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
	let result = await SecureStore.getItemAsync(key);
	if (result) {
		return result;
	} else {
		return null;
	}
}

const t = new Date();
const date = ('0' + t.getDate()).slice(-2);
const month = ('0' + (t.getMonth() + 1)).slice(-2);
const year = t.getFullYear();
const time = `${date}/${month}/${year}`;
export function MyCards() {
	const [cards, setCards] = useState([]);
	const [hasVisa, setHasVisa] = useState(false);
	const [hasPhone, setHasPhone] = useState(false);
	const [phone, setPhone] = useState([]);
	const [transactions, setTransactions] = useState([]);
	const nav = useNavigation();

	const fetchID = async () => {
		// fetch the ID card
		let token = await getValueFor('token');
		fetch(process.env.EXPO_PUBLIC_API_URL + "nationalid", {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + token,
			},
		})
		.then(response => response.json())
		.then(result => {
			// decode the base64 text
			let front = new Buffer(result.Front_image_data, 'base64').toString("ascii").replace(/(\r\n|\n|\r)/gm, "");
			let back = new Buffer(result.Back_image_data, 'base64').toString("ascii").replace(/(\r\n|\n|\r)/gm, "");
			result["Front_image_data"] = ""
			result["Back_image_data"] = ""
			console.log(result)
			save('id',JSON.stringify(result))
			addValueToArray(front);
			setTimeout(() => {
				addValueToArray(back);
			}, 200);
			fetchLicene()
		})
		.catch(error => console.log('error', error));
	}
	const fetchLicene = async () => {
		// fetch the ID card
		let token = await getValueFor('token');
		fetch(process.env.EXPO_PUBLIC_API_URL + "Drivinglicense", {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + token,
			},
		})
		.then(response => response.json())
		.then(result => {
			
			// decode the base64 text
			let front = new Buffer(result.Front_image_data, 'base64').toString("ascii").replace(/(\r\n|\n|\r)/gm, "");
			let back = new Buffer(result.Back_image_data, 'base64').toString("ascii").replace(/(\r\n|\n|\r)/gm, "");
			result["Front_image_data"] = ""
			result["Back_image_data"] = ""
			save("license",JSON.stringify(result))
			setTimeout(() => {
				addValueToArray(front);
			}, 400);
			setTimeout(() => {
				addValueToArray(back);
			}, 600);
		})
		.catch(error => console.log('error', error));
	}

	const [arrayCards, setArrayCards] = useState([]);
	const fetchVisa = async () => {
		// fetch the ID card
		let token = await getValueFor('token');
		fetch(process.env.EXPO_PUBLIC_API_URL + "card", {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + token,
			},
		})
		.then(response => response.json())
		.then(result => {
			result.map((card,i) => {
				save("visa"+i,JSON.stringify(card))
			})
			if (result.message) {
				return;
			}
			setArrayCards(result)
			setHasVisa(true);
		})
		.catch(error => console.log('error', error));
	}

	const fetchPhone = async () => {
		// fetch the ID card
		let token = await getValueFor('token');
		fetch(process.env.EXPO_PUBLIC_API_URL + "phone", {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + token,
			},
		})
		.then(response => response.json())
		.then(result => {
			if (result.message) {
				return;
			} 
			setPhone(result)
			setHasPhone(true);
		})
		.catch(error => console.log('error', error));
	}

	const deletePhone = (id) => {
		return async () => {
			let token = await getValueFor('token');
			fetch(process.env.EXPO_PUBLIC_API_URL + "phone/" + id, {
				method: 'DELETE',
				redirect: 'follow',
				headers: {
					'Authorization': 'Bearer ' + token,
				},
			})
			.then(response => response.json())
			.then(result => {
				console.log(result)
				fetchPhone()
			})
			.catch(error => console.log('error', error));
		}
	}


	const mainImages = require('../assets/nditp.png')
	const [splash, setSplash] = useState(false);
	useEffect(() => {
		fetchID()
		fetchVisa()
		fetchPhone()
		setTimeout(() => {
			setSplash(true);
		}, 2000);
	},[]);
	useEffect(() => {

	}
	, [cards])
  const [newValue, setNewValue] = useState(null);

  useEffect(() => {
    if (newValue !== null) {
      setCards(prevArray => [...prevArray, newValue]);
      setNewValue(null);
    }
  }, [newValue]);
  const addValueToArray = (value) => {
    setNewValue(value);
  };

	return (
		<>
		{
			!splash &&
			<View style={[styles.container, {justifyContent:"center"}]}>
				<Image source={mainImages} style={{ width: wp(40), height: wp(40), objectFit:"contain"}} />
			</View>
		}
		{
			splash &&
			<View style={styles.container}>
				<Pressable 
						style={styles.addButton}
						onPress={() => {
							nav.navigate('AddCard');
						}}
					>
					<Icon
						name='add-circle'
						type='font-awesome-'
						size={wp(5)}
						style={
							{
								paddingRight: wp(1)
							}
						}
					></Icon>
					<Text style={styles.text}>add card</Text>
				</Pressable>
				<View style={{height:wp(75/1.586),width:wp(100)}}>
					<ScrollView style={{width: wp(95),marginLeft:wp(5)}} horizontal>
					{
						cards.length !== 0 &&
						cards.map((img,i)=>{
							return (
								<Pressable
									onPress={() => {
										i <= 0 ?
										 nav.navigate('CardData', {card: "id"}):
										nav.navigate('CardData', {card: "license"})
										
									}}>
								<Image source={{uri:img}} key={i} style={styles.cards}/>
								</Pressable>
							)
						})
					}
					{
						cards.length == 0 &&
						<View style={styles.cards}>
							<Text style={{fontSize:wp(7),color:"#111111bb"}}>Please add your ID card</Text>
						</View>
					}
					{
						hasVisa &&
						arrayCards.map((card,i)=>{
							return (
								<Pressable
									key={i}
									style={[
									styles.cards
										,{
										alignItems:"center",
										justifyContent:"center",
									}]}
									onPress={() => {
										nav.navigate('CardData', {card: "visa"+i})
									}}>
									<Text style={{fontSize:wp(6),color:"#111111bb"}}>Card type: {card.CardType}</Text>
									<Text style={{fontSize:wp(6),color:"#111111bb"}}>Bank name: {card.BankName}</Text>
									<Text style={{fontSize:wp(5),color:"#111111bb"}}>Card number: {card.CardNumber.slice(0,3)+"********"+card.CardNumber.slice(11,14)}</Text>
								</Pressable>
							)
						})
					}
					{
						hasPhone && phone.length !== 0 &&
						phone.map((ph,i) => {
							return(
								<View key={i} style={styles.cards}>
									<Text style={{fontSize:wp(7),color:"#111111bb"}}>phone {i+1}</Text>
									<Text style={{fontSize:wp(7),color:"#111111bb"}}>{ph.PhoneNumber}</Text>
									<Pressable style={{
										position:"absolute",
										bottom:0,
										right:0,
										width:wp(15),
										padding:wp(2),
										backgroundColor:"#ff1111aa",
										alignItems:"center",
										justifyContent:"center",
									}}
									onPress={
										deletePhone(ph.PhoneID)
									}
									><Text style={{
										fontSize:wp(7),
										color:"#fff"
									}}>X</Text></Pressable>
								</View>
							)
						})
					}
				</ScrollView>
				</View>
				<View style={{width:wp(100), height:hp(65)}}>
					<View>
						<Text style={styles.textTrans}>My last transactions</Text>
					</View>
					<ScrollView style={styles.svrollTrans}>
					{
						transactions.length == 0 &&
						<View style={styles.trans}>
						<Image source={{
							uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhg\
								QDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4ND\
								hwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv\
								/wAARCAAYACADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAUHBgT/xAAmEAABAwMEAgEFA\
								AAAAAAAAAABAgMRAAQFBhIhQRNRMRUiMmGB/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAIEAQP/xAAcEQA\
								CAgIDAAAAAAAAAAAAAAAAAQMxESECImH/2gAMAwEAAhEDEQA/AKGWG1n42pHFKc1cfS8eq4S0HvuCE\
								oKtsk+z1T+4cTLYgATHFTrUWs7bJ3qsZZ2y1tJcDT1y5MIVMSAP32aok59fTpFezS429XkLNt15pDK\
								kr2KSlW4cRyD65rruUqKt6Px+BWYw2p2rLLMYO4ZHkcASl1tYI3ETCgf5WslQZ8RSCCSUmtjeVsJHt\
								4DJXILstclLZMDs9VBlZd1u5uQpCmnLl7c7IggzJEdUUVPMqBNqhxp9x3I6+t3RthD5eM+kiq2Xt6V\
								SOZ4oopoqyK6P/9k="}} style={styles.trans.image}/>
						<View style={{width:wp(40)}} >
							<Text style={styles.trans.name}>new account</Text>
							<Text style={styles.trans.date}>{time} </Text>
						</View>
						<View style={{width:wp(25)}}>
							<Text style={styles.trans.amountp}>+0$</Text>
						</View>
					</View>}
					{
						transactions.length !== 0 &&
						transactions.map((img,i)=>{
						return (
							<View style={styles.trans} key={i}>
								<Image source={img} key={i} style={styles.trans.image}/>
								<View style={{width:wp(40)}} >
									<Text style={styles.trans.name}>name </Text>
									<Text style={styles.trans.date}>date </Text>
								</View>
								<View style={{width:wp(25)}}>
									<Text style={styles.trans.amountm}>-900$</Text>
								</View>
							</View>
							
						)
					})}
					
					<View style={{height:hp(5)}}></View>
				</ScrollView>
				</View>
			</View>
		}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
		height: hp(100),
	},
	text: {
		fontSize: wp(2.2),
	},
	cards: {
		width:wp(75),
		height:wp(75/1.586),
		objectFit:"contain",
		justifyContent:"center" ,
		alignContent:"center",
		alignItems:"center",
		borderRadius:wp(5),
		borderColor:"#000",
		borderWidth:2,
		overflow:"hidden",
		marginRight:wp(2.5),
	},
	addButton:{
		width:wp(95),
		alignItems:"center",
		flexDirection:"row",
		justifyContent:"flex-end",
	},
	textTrans: {
		fontSize:30,
		marginLeft:20,
		marginBottom:15,
		marginTop:30
	},
	svrollTrans: {
		width: wp(90),
		marginLeft:20,
		marginRight:20,
		height:hp(70)
	},
	trans :{
		borderColor : "#4E34EC",
		borderRadius: wp(2.5),
		borderWidth: 2,
		height:hp(10),
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"space-between",
		marginVertical:hp(1),
		image : {
			height:wp(15),
			width:wp(15),
			objectFit:"cover",
			marginLeft:wp(2.5),
			borderRadius:wp(7.5)
		},
		name : {
			fontSize:hp(3),
			marginBottom:3
		},
		date : {
			fontSize:hp(2),
			color:"gray"
		},
		amountm : {
			fontSize:hp(3),
			marginRight:wp(5),
			color:"red"
		},
		amountp : {
			fontSize:hp(3),
			marginRight:wp(5),
			color:"green"
		}
	}
});