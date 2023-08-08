import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({

  // Site top-level settings
  site: 'https://pblaney.github.io',
  base: '/mgp1000-docs',

  integrations: [
    starlight({
      
      title: 'MGP1000',
      logo: {
        src: '/src/assets/mgp1000Logo.svg',
      },
      social: {
        github: 'https://github.com/pblaney/mgp1000',
      },
      sidebar: [
        {
          label: 'Overview',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Introduction', link: 'overview/intro' }
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Installation', link: 'guides/install' },
            { label: 'Prepare Input Data', link: 'guides/input' },
            { label: 'Module Usage', link: 'guides/usage' },
            { label: 'Output Data', link: 'guides/output' }
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
