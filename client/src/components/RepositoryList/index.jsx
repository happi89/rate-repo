import { FlatList, View, StyleSheet } from 'react-native';
import Text from '../Text';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }) => {
	return <RepositoryItem repo={item} />;
};

const RepositoryList = () => {
	const { data, error, loading } = useRepositories();

	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>{`Error! ${error.message}`}</Text>;

	console.log(data);

	const repositoryNodes = data
		? data.repositories.edges.map((edge) => edge.node)
		: [];

	return (
		<FlatList
			data={repositoryNodes}
			ItemSeparatorComponent={ItemSeparator}
			keyExtractor={(item) => item.id}
			renderItem={renderItem}
		/>
	);
};

export default RepositoryList;
