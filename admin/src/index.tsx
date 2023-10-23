import { prefixPluginTranslations } from '@strapi/helper-plugin';
import * as yup from 'yup';

import pluginId from './pluginId';
import PluginIcon from './components/PluginIcon';

export default {
  register(app: any) {
    // @ts-ignore
    app.customFields.register({
      name: "input",
      type: "text",
      pluginId,
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
      options: {
        base: [
          {
            sectionTitle: {
              id: "string-array.base.section-title",
              defaultMessage: "Settings",
            },
            items: [
              {
                intlLabel: {
                  id: "string-array.base.separator.label",
                  defaultMessage: "Array element separator",
                },
                name: "options.separator",
                type: "select",
                value: "comma",
                options: [
                  {
                    key: "comma",
                    defaultValue: "comma",
                    value: "comma",
                    metadatas: {
                      intlLabel: {
                        id: "string-array.base.separator.comma",
                        defaultMessage: "Comma (,)",
                      },
                    },
                  },
                  {
                    key: "semicolon",
                    value: "semicolon",
                    metadatas: {
                      intlLabel: {
                        id: "string-array.base.separator.semicolon",
                        defaultMessage: "Semicolon (;)",
                      },
                    },
                  },
                  {
                    key: "pipe",
                    value: "pipe",
                    metadatas: {
                      intlLabel: {
                        id: "string-array.base.separator.pipe",
                        defaultMessage: "Pipe (|)",
                      },
                    },
                  },
                ],
              },
            ]
          }
        ],
        validator: (args) => ({
          separator: yup.string().required({
            id: "options.separator.error",
            defaultMessage: "The separator is required",
          }),
        }),
      }
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
