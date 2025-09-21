import type { AppConfigInput } from 'nuxt/schema'

export default defineAppConfig({
  awesome: {
    name: 'shopping mall',
    description:
      'a starter template for Nuxt 3 with minimalist themes design, built in components, drawer & menus, and more.',
    project: {
      links: {
        github: 'https://github.com/viandwi24/nuxt3-awesome-starter',
      },
    },
    layout: {
      page: {
        navbar: {
          menus: [
            {
              type: 'link',
              title: 'admin',
              to: { name: 'admin' },
            },
            { type: 'link', title: 'Blank', to: { name: 'blank' } },
            {
              type: 'dropdown',
              title: 'publish',
              children: [
                {
                  type: 'link',
                  title: 'publish1',
                  to: { name: 'publish-publish1' },
                },
                {
                  type: 'link',
                  title: 'publish2',
                  to: { name: 'publish-publish2' },
                },
                {
                  type: 'link',
                  title: 'publish3',
                  to: { name: 'publish-publish3' },
                },
              ],
            },
            // { type: 'link', title: 'Post', to: { name: 'post' } },
            // { type: 'link', title: 'Test', to: { name: 'test' } },
            // {
            //   type: 'dropdown',
            //   title: 'Documentations',
            //   children: [
            //     {
            //       type: 'link',
            //       title: 'Components',
            //       to: { name: 'docs-components' },
            //     },
            //   ],
            // },
            // { type: 'button', title: 'Setting', to: { name: 'setting' } },
            // { type: 'button', title: '로그인', to: { name: 'login' } },
            // dynamic title
            // {
            //   type: 'button',
            //   title: (nuxt) =>
            //     (nuxt._appConfig as AppConfigInput)?.awesome?.name || '',
            //   to: (nuxt) => (nuxt._appConfig as AppConfigInput)?.awesome?.name || '',
            // },
          ],
        },
      },
      footer: {
        year: new Date().getFullYear(),
      },
      welcome: {
        title: 'Nuxt&nbsp;3 Awesome Starter',
        disableInfoReplaceIndexInWelcomePage: true,
      },
    },
    author: {
      name: 'viandwi24',
      links: {
        github: 'https://github.com/viandwi24',
        medium: 'https://viandwi24.medium.com',
        website: 'https://viandwi24.site',
      },
    },
  },
})
