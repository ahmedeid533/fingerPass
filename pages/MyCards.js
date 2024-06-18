import React from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	Pressable,
} from "react-native";
import { Icon } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export function MyCards() {
	const cards = [
		require('../assets/visa2.png'),
		require('../assets/visa1.png'),
		require('../assets/visa2.png'),
	]
	const transactions = [
		require('../assets/visa2.png'),
		require('../assets/visa1.png'),
		require('../assets/visa2.png'),
		require('../assets/visa1.png'),
		require('../assets/visa2.png'),
	]
	const nav = useNavigation();

	return (
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
				{cards.map((img,i)=>{
					return (
						<Image source={img} key={i} style={styles.cards}/>
					)
				})}
			</ScrollView>
			</View>
			<View style={{width:wp(100), height:hp(65)}}>
				<View>
					<Text style={styles.textTrans}>My last transactions</Text>		
				</View>
				<ScrollView style={styles.svrollTrans}>
				{transactions.map((img,i)=>{
					return (
						<View style={styles.trans} key={i}>
							<Image source={img} key={i} style={styles.trans.image}/>
							<View style={{width:wp(40)}} >
								<Text style={styles.trans.name}>name </Text>
								<Text style={styles.trans.date}>date </Text>
							</View>
							<View style={{width:wp(25)}}>
								<Text style={styles.trans.amount}>-900$</Text>
							</View>
						</View>
						
					)
				})}
				<View style={{height:hp(5)}}></View>
			</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	text: {
		fontSize: wp(2.2),
	},
	cards: {
		width:wp(75),
		height:wp(75/1.586),
		objectFit:"contain"
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
			fontSize:hp(3.33),
			marginBottom:3
		},
		date : {
			fontSize:hp(3),
			color:"gray"
		},
		amount : {
			fontSize:hp(3),
			marginRight:wp(5),
			color:"red"
		}
	}
});