import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import Constants from 'expo-constants';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';

const ApolloClient = createApolloClient();

export default function App() {
	console.log(Constants.manifest);
	return (
		<NativeRouter>
			<ApolloProvider client={ApolloClient}>
				<Main />
			</ApolloProvider>
		</NativeRouter>
	);
}
