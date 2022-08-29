import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import SingleRepo from './SingleRepo';

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexShrink: 1,
		backgroundColor: '#e1e4e8',
	},
});

const Main = () => {
	return (
		<View style={styles.container}>
			<AppBar />
			<Routes>
				<Route path='/' element={<RepositoryList exact />} />
				<Route
					path='/:repoId'
					element={<SingleRepo open={true} repo={false} />}
				/>
				<Route path='*' element={<Navigate to='/' replace />} />
				<Route path='/SignIn' element={<SignIn />} />
			</Routes>
		</View>
	);
};

export default Main;
