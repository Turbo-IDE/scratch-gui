import {rememberPlatformProject, rememberScratchOrigin} from './community/publish.js';
import {adoptImportedProjectHistory} from './git/project-history.js';

const detachWorkspace = vm => {
    rememberPlatformProject(null);
    rememberScratchOrigin(null);
    adoptImportedProjectHistory(vm, null, null);
    vm._mwPendingDiskOverwrite = false;
    vm._mwRequireExplicitPush = true;
    vm._mwApprovedRemotes = new Set();
    const url = new URL(window.location.href);
    url.hash = '';
    const sourceParams = [
        'clone', 'project_url', 'platform_project', 'mw_assets', 'mw_te', 'mw_fork_source', 'starter', 'restore'
    ];
    for (const key of sourceParams) {
        url.searchParams.delete(key);
    }
    window.history.replaceState(null, '', url);
};
export {detachWorkspace};
