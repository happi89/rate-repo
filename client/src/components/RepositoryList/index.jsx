import { useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import Text from '../Text';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const RepositoryList = () => {
	const navigate = useNavigate();
	const onPress = (repo) => {
		navigate(`/${repo.id}`);
	};

	const { data, error, loading } = useRepositories();

	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>{`Error! ${error.message}`}</Text>;

	const repositoryNodes = data
		? data.repositories.edges.map((edge) => edge.node)
		: [];

	return (
		<FlatList
			data={repositoryNodes}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<Pressable onPress={() => onPress(item)}>
					<RepositoryItem repo={item} open={false} />
				</Pressable>
			)}
		/>
	);
};

export default RepositoryList;
