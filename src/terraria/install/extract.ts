import { join } from 'node:path';
import { chmod } from 'node:fs/promises';

import AdmZip from 'adm-zip';

import { versionsDir, serversDir } from '@terraria';

export default async function extractVersion(v: string): Promise<void> {
    const versionPath = join(versionsDir, v);
    const fileName = versionPath + '.zip';

    const zip = new AdmZip(fileName);
    zip.extractEntryTo(v + '/Linux/', versionPath, false, false, true);
    
    await chmod(join(serversDir, v, 'TerrariaServer.bin.86_64'), 0o755);
}