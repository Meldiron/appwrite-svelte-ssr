import { Client, Account } from 'appwrite';

export const AppwriteClient = new Client().setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT).setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

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
