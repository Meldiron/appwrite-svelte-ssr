import { AppwriteClient, AppwriteService } from '../lib/appwrite';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
    const projectId = "appwriteSvelteSSR";
    const authCookie = cookies.get(`a_session_${projectId.toLowerCase()}`) ?? cookies.get(`a_session_${projectId.toLowerCase()}_legacy`) ?? '';
    const authJson: any = {};
    authJson[`a_session_${projectId}`] = authCookie;
    AppwriteClient.headers['X-Fallback-Cookies'] = JSON.stringify(authJson);

	try {
		const acc = await AppwriteService.getAccount();
		return {
			status: 'Logged in as ' + acc.$id
		};
	} catch (err) {
		return {
			status: 'Not logged in.'
		};
	}
}) satisfies PageServerLoad;
