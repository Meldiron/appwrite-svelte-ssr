import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/v1': {
				target: 'https://cloud.appwrite.io',
				changeOrigin: true,
				configure: (proxy, options) => {
					proxy.on('proxyRes', (proxyRes, req, _res) => {
						const headers = proxyRes.rawHeaders.map((h) => {
							return h.split("domain=.cloud.appwrite.io").join(import.meta.env.PROD ? "domain=appwrite-svelte-ssr.vercel.app" : "domain=localhost");
						});

						proxyRes.rawHeaders = headers;
					  });
				  },
			},
		}
	}
});
