import { gql } from '@apollo/client';

export const GET_REPOS = gql`
	query getRepos(
		$orderBy: AllRepositoriesOrderBy
		$orderDirection: OrderDirection
	) {
		repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
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
					url
				}
			}
		}
	}
`;

export const GET_ME = gql`
	query getMe {
		me {
			username
			id
		}
	}
`;

export const GET_REPO = gql`
	query getRepo($repositoryId: ID!) {
		repository(id: $repositoryId) {
			id
			fullName
			ratingAverage
			reviewCount
			stargazersCount
			forksCount
			ownerAvatarUrl
			description
			language
			url
		}
	}
`;

export const GET_REVIEWS = gql`
	query Query($repositoryId: ID!) {
		repository(id: $repositoryId) {
			reviews {
				edges {
					node {
						rating
						createdAt
						text
						user {
							username
							id
						}
						id
					}
				}
			}
		}
	}
`;
