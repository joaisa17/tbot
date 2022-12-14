import { ITerrariaServer } from '@customTypes';

import { join } from 'node:path';

import { writeFile } from 'node:fs/promises';
import { createDirIfMissing } from '@utils/fs';

export const difficultyScope: Record<string, number> = {
    normal: 0,
    expert: 1,
    master: 2,
    journey: 3
};

import { serversDir } from '@terraria';

export default async function loadConfig(server: ITerrariaServer) {
    const { id, config } = server;

    await createDirIfMissing(serversDir);

    await writeFile(
        join(serversDir, id),

        Object.keys(config)
        .map(k => `${k}=${config[k as keyof ITerrariaServer['config']]}`)
        .join('\n')
    );
}