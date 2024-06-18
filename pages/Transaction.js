import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TextInput,
	Pressable,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export function Transaction() {
	return (
		<>
			<View style={styles.container}>
				<View style={styles.Main}>
					<Text style={styles.text}>ahmed eid gomaa</Text>
					<Image source={require('../assets/myRegPhotoSocial.png')} style={styles.image} />
				</View>
				<View style={styles.trans}>
					<Text style={styles.text}>transfer money</Text>
				</View>
				<View style={{width:wp(90)}}>
				<View >
					<Text style={styles.text1}>chose your card</Text>
					<TextInput style={styles.input} />
				</View>
				<View >
					<Text style={styles.text1}>amount</Text>
					<TextInput
						style={styles.input}
						keyboardType='numeric'
					/>
				</View>
				</View>
				<View style={{
					width:wp(100),
					alignItems: "center",
					}}>
					<Pressable
						style={{width: wp(60)}}
					>
						<View style={styles.LogIn}>
							<Text style={styles.LogIn.text}>
								transfere
							</Text>
						</View>
					</Pressable>
				</View>

			</View>
		</>
	)
}	

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		margin: wp(5),
	},
	text: {
		fontSize: hp(3.2),
	},
	text1: {
		fontSize: hp(3),
	},
	Main: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	image: {
		width: wp(40),
		height: wp(40),
		borderRadius: wp(20),
	},
	input: {
		borderWidth: 1,
		alignSelf: "center",
		width: wp(80),
		padding: wp(2.5),
		borderRadius: wp(7.5),
		margin: wp(5),
	},
	LogIn: {
		backgroundColor: "#9747FF",
		color: "white",
		paddingVertical: hp(1.2),
		marginVertical: hp(1.5),
		borderRadius: wp(3.3),
		borderColor: "#0804D3",
		borderWidth: 2,
		width: wp(60),
		alignItems: "center",
		text: {
			color: "white",
			fontSize: hp(2.5),
		},
	},

});