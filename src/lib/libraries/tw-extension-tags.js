import {defineMessages} from 'react-intl';

const messages = defineMessages({
    turboshare: {
        id: 'mw.extensionTags.turboshare',
        defaultMessage: 'TurboShare',
        description: 'Extension library filter and section for TurboShare extensions'
    },
    scratch: {
        id: 'mw.extensionTags.scratch',
        defaultMessage: 'Scratch',
        description: 'Extension library filter and section for extensions that come from Scratch'
    },
    turbowarp: {
        id: 'mw.extensionTags.turbowarp',
        defaultMessage: 'TurboWarp',
        description: 'Extension library filter and section for extensions from TurboWarp and its gallery'
    },
    mistium: {
        id: 'mw.extensionTags.mistium',
        defaultMessage: 'Mistium',
        description: 'Extension library filter and section for extensions made by Mistium'
    }
});

export default [
    {tag: 'turboshare', intlLabel: messages.turboshare},
    {tag: 'scratch', intlLabel: messages.scratch},
    {tag: 'tw', intlLabel: messages.turbowarp},
    {tag: 'mistium', intlLabel: messages.mistium}
];
