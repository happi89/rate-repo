import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
	mutation authenticate($AuthenticateInput: AuthenticateInput) {
		authenticate(credentials: $AuthenticateInput) {
			accessToken
		}
	}
`;
