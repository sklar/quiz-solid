import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
	css: {
		transformer: 'lightningcss',
		lightningcss: {
			targets: browserslistToTargets(browserslist.loadConfig({ path: '.' })!),
			drafts: {
				customMedia: true,
			},
		},
	},
	plugins: [solid()],
})
