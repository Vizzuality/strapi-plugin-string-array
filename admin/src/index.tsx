import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginId from './pluginId';
import PluginIcon from './components/PluginIcon';

export default {
  register(app: any) {
    // @ts-ignore
    app.customFields.register({
      name: "input",
      type: "text",
      icon: PluginIcon,
      intlLabel: {
        id: 'string-array.label',
        defaultMessage: 'String Array',
      },
      intlDescription: {
        id: 'string-array.description',
        defaultMessage: 'An array of strings',
      },
      components: {
        Input: async () => import(
          './components/Input'
        ),
      },
    });
  },

  bootstrap(app: any) {},
  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
