import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export function Notify() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Notify</Text>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize:hp(2.2)
	},
});