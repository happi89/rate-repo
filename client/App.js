import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';

const ApolloClient = createApolloClient();

export default function App() {
	return (
		<NativeRouter>
			<ApolloProvider client={ApolloClient}>
				<Main />
			</ApolloProvider>
		</NativeRouter>
	);
}
