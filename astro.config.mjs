import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({

  // Site top-level settings
  site: 'https://pblaney.github.io',
  base: '/mgp1000',

  integrations: [
    starlight({
      title: 'Docs',
      logo: {
        src: './src/assets/mgp1000Logo.svg',
      },
      social: {
        github: 'https://github.com/pblaney/mgp1000',
      },
      sidebar: [
        {
          label: 'Overview',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Introduction', link: '/introduction/intro' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],

  // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
