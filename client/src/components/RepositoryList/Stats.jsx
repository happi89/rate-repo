import Text from '../Text';
import { StyleSheet, View } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
	stats: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	stat: {
		fontWeight: theme.fontWeights.bold,
		flexDirection: 'column',
		alignItems: 'center',
	},
});

function Stats({ repo }) {
	const roundNum = (num) => {
		if (num > 999) {
			return Math.round(num / 100) / 10 + 'k';
		} else {
			return num;
		}
	};

	return (
		<View style={styles.stats}>
			<View style={styles.stat}>
				<Text fontWeight='bold'>{roundNum(repo.stargazersCount)}</Text>
				<Text>Stars</Text>
			</View>

			<View style={styles.stat}>
				<Text fontWeight='bold'>{roundNum(repo.forksCount)}</Text>
				<Text>Forks</Text>
			</View>

			<View style={styles.stat}>
				<Text fontWeight='bold'>{repo.reviewCount}</Text>
				<Text>Reviews</Text>
			</View>

			<View style={styles.stat}>
				<Text fontWeight='bold'>{repo.ratingAverage}</Text>
				<Text>Rating</Text>
			</View>
		</View>
	);
}

export default Stats;
