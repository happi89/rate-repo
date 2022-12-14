import { Pressable, View, StyleSheet } from 'react-native';
import Text from './Text';
import FormikTextInput from './ForkmikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const initialValues = {
	username: '',
	password: '',
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 10,
	},
	button: {
		backgroundColor: theme.colors.primary,
		padding: 16,
		borderRadius: 5,
		margin: 5,
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
	},
	input: {
		margin: 5,
		backgroundColor: '#f2f2f2',
		padding: 16,
		marginVertical: 12,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: 'lightgray',
	},
});

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.min(1, 'Username must be atleast 3 characters')
		.required('password is required'),
	password: yup
		.string()
		.min(5, 'Password must be atleast 3 characters')
		.required('password is required'),
});

const SignInForm = ({ onSubmit }) => {
	return (
		<View style={styles.container}>
			<FormikTextInput
				style={styles.input}
				name='username'
				placeholder='Username'
			/>
			<FormikTextInput
				style={styles.input}
				name='password'
				placeholder='Password'
				secureTextEntry={true}
			/>
			<Pressable style={styles.button} onPress={onSubmit}>
				<Text style={styles.buttonText}>Sign In</Text>
			</Pressable>
		</View>
	);
};

const SignIn = () => {
	const [signIn] = useSignIn();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const { username, password } = values;

		try {
			await signIn({ username, password });
			navigate('/');
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}>
			{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

export default SignIn;
