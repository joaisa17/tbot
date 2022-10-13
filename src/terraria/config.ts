import { ITerrariaServer } from '@mongoose/schemas/discordServer';

import { join } from 'node:path';
import { writeFile } from 'node:fs';

export const difficultyScope: Record<string, number> = {
    normal: 0,
    expert: 1,
    master: 2,
    journey: 3
};

export default function loadConfig(server: ITerrariaServer): Promise<void> {
    const {
        id,
        ownerId,
        admins,
        version,
        difficulty,
        ...options
    } = server;

    const parsedDifficulty = difficulty && difficultyScope[difficulty];

    const config: Record<string, unknown> = {
        difficulty: parsedDifficulty,
        ...options
    };

    return new Promise((resolve, reject) => {
        writeFile(
            join(__dirname, 'servers', id),
    
            Object.keys(config)
            .map(k => `${k}=${config[k]}`)
            .join('\n'),
    
            { encoding: 'utf-8' },
    
            err => {
                if (err) reject(err)
                else resolve();
            }
        );
    });
}