<script lang="ts">
	import { AppwriteService } from '../lib/appwrite';
	import type { PageData } from './$types';

	export let data: PageData;

	let status = 'Not fetched yet.';

	function createAccount() {
		AppwriteService.createAccount();
	}

	function deleteAccount() {
		AppwriteService.deleteAccount();
	}

	async function getAccount() {
		try {
			const acc = await AppwriteService.getAccount();
			status = 'Logged in as ' + acc.$id;
		} catch (err) {
			status = 'Not logged in.';
		}
	}
</script>

<button on:click={createAccount}>Create Account</button>
<button on:click={deleteAccount}>Delete Account</button>

<hr />

<p>Status CSR: {status}</p>
<button on:click={getAccount}>Fetch (client-side)</button>

<hr />

<p>Status SSR: {data.status}</p>
