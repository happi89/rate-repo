import { Pressable, ScrollView, StyleSheet } from 'react-native';
import Text from './Text';
import FormikTextInput from './ForkmikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';

const initialValues = {
	ownerName: '',
	repositoryName: '',
	rating: 0,
	review: '',
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
	ownerName: yup.string().required('repository owner name is required'),
	repositoryName: yup.string().required('repository name is required'),
	rating: yup
		.number('rating must be a number')
		.min(0, 'rating must be between 0 and 100')
		.max(100, 'rating must be between 0 and 100')
		.positive('number must be positive')
		.required('rating is required'),
	review: yup.string(),
});

const ReviewForm = ({ onSubmit }) => {
	return (
		<ScrollView style={styles.container}>
			<FormikTextInput
				style={styles.input}
				name='ownerName'
				placeholder='Repository Owner Name'
				autoCapitalize='none'
			/>
			<FormikTextInput
				style={styles.input}
				name='repositoryName'
				placeholder='Repository Name'
				autoCapitalize='none'
			/>
			<FormikTextInput
				style={styles.input}
				name='rating'
				placeholder='Rating between 0 and 100'
			/>
			<FormikTextInput
				style={styles.input}
				name='review'
				placeholder='Review'
				multiline={true}
			/>
			<Pressable style={styles.button} onPress={onSubmit}>
				<Text style={styles.buttonText}>Add Review</Text>
			</Pressable>
		</ScrollView>
	);
};

const CreateReview = () => {
	const [createReview] = useMutation(CREATE_REVIEW);
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const { ownerName, repositoryName, rating, review: text } = values;
		try {
			const { data } = await createReview({
				variables: {
					review: {
						ownerName,
						repositoryName,
						rating: Number(rating),
						text,
					},
				},
			});

			navigate(`/${data.createReview.repositoryId}`);
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}>
			{({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

export default CreateReview;
