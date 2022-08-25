import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight + 5,
		backgroundColor: '#24292e',
		flexDirection: 'row',
	},
	text: {
		color: 'white',
		paddingTop: 6,
		paddingBottom: 12,
		paddingLeft: 12,
		fontWeight: theme.fontWeights.bold,
		fontSize: 16,
		letterSpacing: 1,
	},
});

const AppBar = () => {
	return (
		<View style={styles.container}>
			<ScrollView horizontal>
				<Link to='/'>
					<Text style={styles.text}>Repositories</Text>
				</Link>

				<Link to='/SignIn'>
					<Text style={styles.text}>Sign In</Text>
				</Link>
			</ScrollView>
		</View>
	);
};

export default AppBar;
