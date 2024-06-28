import React, {useEffect , useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export function Notify() {
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
			<Text style={styles.text}>Soon ...</Text>
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
		justifyContent: 'center',
		height: hp(100),
	},
	text: {
		fontSize:hp(2.2)
	},
});