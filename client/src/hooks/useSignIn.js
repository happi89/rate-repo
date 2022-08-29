import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
	const [mutate, result] = useMutation(AUTHENTICATE);
	const authStorage = useAuthStorage();
	const client = useApolloClient();

	const signIn = async ({ username, password }) => {
		const { data } = await mutate({
			variables: {
				AuthenticateInput: {
					username,
					password,
				},
			},
		});

		await authStorage.setAccessToken(data.authenticate.accessToken);
		client.resetStore();

		return result;
	};

	return [signIn, result];
};

export default useSignIn;
