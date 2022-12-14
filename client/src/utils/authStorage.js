import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
	constructor(namespace = 'auth') {
		this.namespace = namespace;
	}

	async getAccessToken() {
		const token = await AsyncStorage.getItem(`${this.namespace}:token`);

		return token ? JSON.parse(token) : [];
	}

	async setAccessToken(token) {
		const current = await this.getAccessToken();
		const newToken = [...current, token];

		await AsyncStorage.setItem(
			`${this.namespace}:token`,
			JSON.stringify(newToken)
		);
	}

	async removeAccessToken() {
		await AsyncStorage.removeItem(`${this.namespace}:token`);
	}
}

export default AuthStorage;
