import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import SingleRepo from './SingleRepo';
import CreateReview from './CreateReview';
import SignUp from './SignUp';

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
				<Route path='/CreateReview' element={<CreateReview />} />
				<Route path='/SignIn' element={<SignIn />} />
				<Route path='/SignUp' element={<SignUp />} />
				<Route
					path='/:repoId'
					element={<SingleRepo open={true} repo={false} />}
				/>
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
		</View>
	);
};

export default Main;
