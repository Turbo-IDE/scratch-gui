// Sends the current project to TurboWorkshop. Shared by File > Upload to
// TurboWorkshop and the menu bar upload button so both use the same mechanism.
// Authors: katboizz
const WORKSHOP_UPLOAD_URL = 'https://danvpr.github.io/workshop/#upload';

/**
 * Open TurboWorkshop in a new tab and send it the packaged project.
 * @param {object} options - {vm, projectTitle, onOpened}
 * @param {object} options.vm - the project VM to package.
 * @param {string} [options.projectTitle] - title sent with the project.
 * @param {Function} [options.onOpened] - called once the tab opened successfully.
 * @returns {Promise<boolean>} true when the upload was handed off to the tab.
 */
const uploadProjectToWorkshop = async ({vm, projectTitle, onOpened}) => {
    try {
        // 1. Mo tab truoc de trinh duyet khong chan Popup
        const workshopTab = window.open(WORKSHOP_UPLOAD_URL, '_blank');

        if (!workshopTab) {
            // eslint-disable-next-line no-alert
            alert('Vui long cho phep mo Pop-up tren trinh duyet!');
            return false;
        }
        if (onOpened) onOpened();

        // 2. Lay ten tac pham
        const title = projectTitle || 'Du an moi';

        // 3. Chup Thumbnail
        const thumbDataUrl = await new Promise(resolve => {
            let isDone = false;
            const fallbackTimer = setTimeout(() => {
                if (!isDone) {
                    isDone = true;
                    const fallbackCanvas = vm && vm.renderer && vm.renderer.canvas ?
                        vm.renderer.canvas : document.querySelector('canvas');
                    resolve(fallbackCanvas ? fallbackCanvas.toDataURL('image/png') : null);
                }
            }, 1500);

            try {
                if (vm && vm.renderer && typeof vm.renderer.requestSnapshot === 'function') {
                    vm.renderer.requestSnapshot(dataUri => {
                        if (!isDone) {
                            isDone = true;
                            clearTimeout(fallbackTimer);
                            resolve(dataUri);
                        }
                    });
                    vm.renderer.draw();
                } else {
                    clearTimeout(fallbackTimer);
                    const fallbackCanvas = document.querySelector('canvas');
                    resolve(fallbackCanvas ? fallbackCanvas.toDataURL('image/png') : null);
                }
            } catch (e) {
                clearTimeout(fallbackTimer);
                resolve(null);
            }
        });

        // 4. Dong goi file .sb3
        const sb3Blob = await vm.saveProjectSb3();
        const sb3ArrayBuffer = await sb3Blob.arrayBuffer();

        // 5. Gui du lieu sang tab Workshop khi san sang
        let hasSent = false;
        const messageListener = event => {
            if (event.data && event.data.type === 'DANV_WORKSHOP_READY' && !hasSent) {
                hasSent = true;
                workshopTab.postMessage({
                    type: 'DANV_IMPORT_PROJECT',
                    title: title,
                    sb3Buffer: sb3ArrayBuffer,
                    fileName: `${title}.sb3`,
                    thumbDataUrl: thumbDataUrl
                }, '*', [sb3ArrayBuffer]);
                window.removeEventListener('message', messageListener);
            }
        };
        window.addEventListener('message', messageListener);
        return true;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Loi khi xuat file du an:', error);
        // eslint-disable-next-line no-alert
        alert(`Khong the dong goi du an: ${error.message}`);
        return false;
    }
};

export default uploadProjectToWorkshop;
