import { Client, Account } from 'appwrite';

export const AppwriteClient = new Client().setEndpoint('http://localhost:5173/v1').setProject('appwriteSvelteSSR');

const account = new Account(AppwriteClient);

export const AppwriteService = {
	getAccount: async () => {
		return await account.get();
	},
	createAccount: async () => {
		return await account.createAnonymousSession();
	},
	deleteAccount: async () => {
		return await account.deleteSession('current');
	}
};
