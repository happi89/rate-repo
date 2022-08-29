import { View, StyleSheet, ScrollView, Text, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { GET_ME } from '../graphql/queries';
import { useApolloClient, useQuery } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';

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
	const { data } = useQuery(GET_ME);
	const authStorage = useAuthStorage();
	const client = useApolloClient();

	const signOut = async () => {
		await authStorage.removeAccessToken();
		client.resetStore();
	};

	return (
		<View style={styles.container}>
			<ScrollView horizontal>
				<Link to='/'>
					<Text style={styles.text}>Repositories</Text>
				</Link>

				{data?.me === null ? (
					<Link to='/SignIn'>
						<Text style={styles.text}>Sign In</Text>
					</Link>
				) : (
					<Pressable onPress={signOut}>
						<Text style={styles.text}>Sign Out</Text>
					</Pressable>
				)}
			</ScrollView>
		</View>
	);
};

export default AppBar;
