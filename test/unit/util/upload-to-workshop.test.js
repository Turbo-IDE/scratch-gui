import uploadProjectToWorkshop from '../../../src/lib/mw/upload-to-workshop.js';

describe('uploadProjectToWorkshop', () => {
    let workshopTab;

    const createVm = () => ({
        renderer: {
            requestSnapshot: callback => callback('data:image/png;base64,thumbnail'),
            draw: jest.fn()
        },
        saveProjectSb3: jest.fn(() => Promise.resolve({
            arrayBuffer: () => Promise.resolve(new ArrayBuffer(16))
        }))
    });

    beforeEach(() => {
        workshopTab = {postMessage: jest.fn()};
        window.open = jest.fn(() => workshopTab);
        window.alert = jest.fn();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('opens TurboWorkshop and sends the packaged project once the tab is ready', async () => {
        const vm = createVm();
        const onOpened = jest.fn();

        const result = await uploadProjectToWorkshop({vm, projectTitle: 'My Project', onOpened});

        expect(result).toBe(true);
        expect(window.open).toHaveBeenCalledWith('https://danvpr.github.io/workshop/#upload', '_blank');
        expect(onOpened).toHaveBeenCalledTimes(1);

        window.dispatchEvent(new MessageEvent('message', {data: {type: 'DANV_WORKSHOP_READY'}}));

        expect(workshopTab.postMessage).toHaveBeenCalledTimes(1);
        const [payload, targetOrigin, transfer] = workshopTab.postMessage.mock.calls[0];
        expect(payload).toEqual({
            type: 'DANV_IMPORT_PROJECT',
            title: 'My Project',
            sb3Buffer: expect.any(ArrayBuffer),
            fileName: 'My Project.sb3',
            thumbDataUrl: 'data:image/png;base64,thumbnail'
        });
        expect(targetOrigin).toBe('*');
        expect(transfer).toHaveLength(1);

        // A second ready message does not send the project again.
        window.dispatchEvent(new MessageEvent('message', {data: {type: 'DANV_WORKSHOP_READY'}}));
        expect(workshopTab.postMessage).toHaveBeenCalledTimes(1);
    });

    test('warns and gives up when the popup is blocked', async () => {
        window.open.mockReturnValue(null);
        const vm = createVm();

        const result = await uploadProjectToWorkshop({vm, projectTitle: 'My Project'});

        expect(result).toBe(false);
        expect(window.alert).toHaveBeenCalledWith(
            expect.stringContaining('Pop-up')
        );
        expect(vm.saveProjectSb3).not.toHaveBeenCalled();
    });

    test('reports a failure when the project cannot be packaged', async () => {
        const vm = createVm();
        vm.saveProjectSb3.mockReturnValue(Promise.reject(new Error('boom')));

        const result = await uploadProjectToWorkshop({vm, projectTitle: 'My Project'});

        expect(result).toBe(false);
        expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('boom'));
    });
});
