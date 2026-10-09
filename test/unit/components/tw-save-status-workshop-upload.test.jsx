import React from 'react';
import {act} from 'react-dom/test-utils';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';

import {TWSaveStatus} from '../../../src/components/menu-bar/tw-save-status.jsx';

jest.mock('../../../src/lib/community/enabled.js', () => false);
jest.mock('../../../src/lib/community/publish.js', () => ({
    getMistWarpAction: jest.fn(() => null),
    getRememberedPlatformProjectState: jest.fn(() => null)
}));
jest.mock('../../../src/lib/mw/open-mw-share-window.js', () => jest.fn());
jest.mock('../../../src/lib/mw/smart-save.js', () => ({
    __esModule: true,
    default: jest.fn(() => Promise.resolve(true)),
    guardSavedCallback: jest.fn((vm, onSaved) => onSaved)
}));
jest.mock('../../../src/lib/mw/upload-to-workshop.js', () => jest.fn());

const smartSave = require('../../../src/lib/mw/smart-save.js').default;
const uploadProjectToWorkshop = require('../../../src/lib/mw/upload-to-workshop.js');

describe('menu bar upload button without the community site', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('uploads to TurboWorkshop with the File menu mechanism instead of downloading', async () => {
        uploadProjectToWorkshop.mockReturnValue(Promise.resolve(true));
        const vm = {};
        const wrapper = mountWithIntl(
            <TWSaveStatus
                alertsList={[]}
                projectChanged
                projectTitle="Project"
                vm={vm}
                onProjectUnchanged={jest.fn()}
            />
        );

        const button = wrapper.find('button');
        expect(button.text()).toContain('Upload to TurboWorkshop');
        expect(button.prop('title')).toContain('Uploads this project to TurboWorkshop.');

        await act(async () => {
            button.simulate('click');
            await Promise.resolve();
        });

        expect(uploadProjectToWorkshop).toHaveBeenCalledTimes(1);
        expect(uploadProjectToWorkshop).toHaveBeenCalledWith({vm, projectTitle: 'Project'});
        expect(smartSave).not.toHaveBeenCalled();
        wrapper.unmount();
    });

    test('ignores clicks while an upload is in flight', async () => {
        let resolveUpload;
        uploadProjectToWorkshop.mockReturnValue(new Promise(resolve => {
            resolveUpload = resolve;
        }));
        const vm = {};
        const wrapper = mountWithIntl(
            <TWSaveStatus
                alertsList={[]}
                projectChanged
                projectTitle="Project"
                vm={vm}
                onProjectUnchanged={jest.fn()}
            />
        );

        await act(async () => {
            wrapper.find('button').simulate('click');
            await Promise.resolve();
        });
        wrapper.update();

        const button = wrapper.find('button');
        expect(button.prop('aria-disabled')).toBe(true);
        expect(button.prop('aria-busy')).toBe(true);
        expect(wrapper.find('[role="status"]').text()).toBe('Uploading to TurboWorkshop…');

        wrapper.find('button').simulate('click');
        expect(uploadProjectToWorkshop).toHaveBeenCalledTimes(1);

        await act(async () => {
            resolveUpload(true);
            await Promise.resolve();
        });
        wrapper.unmount();
    });
});
