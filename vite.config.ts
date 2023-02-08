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
							let host = req.headers.host ?? '';
							host = host.includes(':') ? host.split(':')[0] : host;
							return h.split("domain=.cloud.appwrite.io").join("domain=" + host);
						});

						proxyRes.rawHeaders = headers;
					  });
				  },
			},
		}
	}
});
