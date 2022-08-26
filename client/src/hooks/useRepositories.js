import { useQuery } from '@apollo/client';
import { GET_REPOS } from '../graphql/queries';

const useRepositories = () => {
	const { loading, error, data, refetch } = useQuery(GET_REPOS, {
		fetchPolicy: 'cache-and-network',
	});

	return { data, loading, refetch, error };
};

export default useRepositories;
