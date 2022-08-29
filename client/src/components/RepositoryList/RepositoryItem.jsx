import Stats from './Stats';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import Text from '../Text';
import theme from '../../theme';
import * as Linking from 'expo-linking';
import { useQuery } from '@apollo/client';
import { GET_REPO } from '../../graphql/queries';
import { useParams } from 'react-router-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 10,
		marginBottom: 10,
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
		marginTop: 6,
		marginBottom: 12,
		alignSelf: 'flex-start',
		borderRadius: 6,
	},
	openBtn: {
		backgroundColor: theme.colors.primary,
		borderRadius: 6,
		padding: 16,
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 12,
		marginBottom: 4,
	},
});

const RepositoryItem = ({ repo, open }) => {
	const { repoId } = useParams();
	const { loading, error, data } = useQuery(GET_REPO, {
		variables: { repositoryId: repoId },
	});

	if (!repo) {
		if (loading) return <Text>Loading...</Text>;
		if (error) return <Text>Error: {error.message}</Text>;

		repo = data.repository;
	}

	const onPress = () => {
		Linking.openURL(`${repo.url}`);
	};

	return (
		<View style={styles.container}>
			<Image source={{ uri: `${repo.ownerAvatarUrl}` }} style={styles.avatar} />

			<View style={styles.main}>
				<Text style={{ marginBottom: 4, fontWeight: 'bold', fontSize: 18 }}>
					{repo.fullName}
				</Text>
				<Text style={{ marginBottom: 4, color: 'gray', fontSize: 16 }}>
					{repo.description}
				</Text>
				<Text style={styles.tag}>{repo.language}</Text>
			</View>

			<Stats repo={repo} />
			{open ? (
				<Pressable style={styles.openBtn} onPress={onPress}>
					<Text style={{ color: 'white', fontSize: 16 }}>Open In GitHub</Text>
				</Pressable>
			) : (
				''
			)}
		</View>
	);
};

export default RepositoryItem;
