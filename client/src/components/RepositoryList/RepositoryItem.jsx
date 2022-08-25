import Stats from './Stats';
import { View, StyleSheet, Image } from 'react-native';
import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 10,
	},
	main: {
		marginLeft: 70,
	},
	avatar: {
		width: 55,
		height: 55,
		position: 'absolute',
		top: 12,
		left: 12,
		borderRadius: 6,
	},
	tag: {
		color: 'white',
		backgroundColor: theme.colors.primary,
		padding: 8,
		paddingHorizontal: 10,
		marginBottom: 8,
		alignSelf: 'flex-start',
		borderRadius: 6,
	},
});

const RepositoryItem = ({ repo }) => {
	return (
		<View style={styles.container}>
			<Image source={{ uri: `${repo.ownerAvatarUrl}` }} style={styles.avatar} />

			<View style={styles.main}>
				<Text style={{ marginBottom: 4 }}>{repo.fullName}</Text>
				<Text style={{ marginBottom: 4 }}>{repo.description}</Text>
				<Text style={styles.tag}>{repo.language}</Text>
			</View>

			<Stats repo={repo} />
		</View>
	);
};

export default RepositoryItem;
