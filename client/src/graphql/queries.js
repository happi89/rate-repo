import { gql } from '@apollo/client';

export const GET_REPOS = gql`
	query getRepos {
		repositories {
			totalCount
			edges {
				node {
					id
					fullName
					ratingAverage
					reviewCount
					stargazersCount
					forksCount
					ownerAvatarUrl
					description
					language
				}
			}
		}
	}
`;
