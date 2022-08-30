import { Pressable, ScrollView, StyleSheet } from 'react-native';
import Text from './Text';
import FormikTextInput from './ForkmikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import { CREATE_USER } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';

const initialValues = {
	username: '',
	password: '',
	passwordConfirm: '',
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
	userName: yup
		.string()
		.required('username is required')
		.min(1, 'must be minimum 1 character long')
		.max(30, '30 maximum characters allowed'),
	password: yup
		.string()
		.required('password is required')
		.min(5, 'password must be atleast 5 characters long')
		.max(50, '50 maximum characters allowed'),
	passwordConfirm: yup
		.string()
		.oneOf([yup.ref('password')], "passwords don't match")
		.required('password confirmation is required'),
});

const SignUpForm = ({ onSubmit }) => {
	return (
		<ScrollView style={styles.container}>
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
			<FormikTextInput
				style={styles.input}
				name='passwordConfirm'
				placeholder='Confirm Password'
				secureTextEntry={true}
			/>
			<Pressable style={styles.button} onPress={onSubmit}>
				<Text style={styles.buttonText}>Sign Up</Text>
			</Pressable>
		</ScrollView>
	);
};

const SignUp = () => {
	const [createUser] = useMutation(CREATE_USER);
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		console.log(values);
		const { username, password } = values;
		console.log(username, 'username');
		// console.log(values);
		// try {
		// 	const { data } = await createUser({
		// 		variables: { user: { username, password } },
		// 	});
		// 	console.log(data);
		// 	navigate('/');
		// } catch (error) {
		// 	console.log(error.message);
		// }
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}>
			{({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

export default SignUp;
