import { FlatList, StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';
import RepositoryItem from './RepositoryList/RepositoryItem';
import { GET_REVIEWS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import format from 'date-fns/format';

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
	container: {
		backgroundColor: 'white',
		padding: 12,
		flexDirection: 'row',
	},
	ratingContainer: {
		border: theme.colors.primary,
		borderWidth: 2,
		borderColor: theme.colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		width: 50,
		borderRadius: 25,
	},
	rating: {
		fontSize: 20,
		color: theme.colors.primary,
	},
	contentContainer: {
		alignSelf: 'flex-start',
		marginLeft: 12,
		width: '82%',
	},
	user: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	date: {
		color: 'gray',
	},
});

const ReviewItem = ({ review }) => {
	return (
		<View style={styles.container}>
			<View style={styles.ratingContainer}>
				<Text style={styles.rating}>{review.rating}</Text>
			</View>
			<View style={styles.contentContainer}>
				<Text style={styles.user}>{review.user.username}</Text>
				<Text style={styles.date}>
					{format(new Date(review.createdAt.substring(0, 10)), 'dd.MM.yyyy')}
				</Text>
				<Text>{review.text}</Text>
			</View>
		</View>
	);
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = ({ open, repo }) => {
	const { repoId } = useParams();

	const { loading, error, data } = useQuery(GET_REVIEWS, {
		variables: { repositoryId: repoId },
		fetchPolicy: 'cache-and-network',
	});

	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>{`Error! ${error.message}`}</Text>;

	const reviews = data
		? data.repository.reviews.edges.map((edge) => edge.node)
		: [];

	return (
		<FlatList
			data={reviews}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => <ReviewItem review={item} />}
			keyExtractor={({ id }) => id}
			ListHeaderComponent={() => <RepositoryItem open={open} repo={repo} />}
		/>
	);
};

export default SingleRepository;
