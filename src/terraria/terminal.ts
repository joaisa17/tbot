import { platform } from 'node:os';

import { ChildProcess, spawn } from 'node:child_process';
import eventEmitter from '@utils/eventEmitter';

import { ITerrariaServer } from '@customTypes';
import { join } from 'node:path';
import { serversDir, versionsDir } from '@terraria';

import shortenVersion from '@utils/shortenVersion';

interface Events {
    stdout: string;

    cleanExit: void;
    exit: string;
}

export default class Terminal {
    process?: ChildProcess;
    config: ITerrariaServer;

    private emitter = eventEmitter<Events>();

    on = this.emitter.on;
    off = this.emitter.off;

    send(input: string) {
        return new Promise<void>((res, rej) => {
            this.process.stdin.write(input, err => {
                if (err) rej(err)
                else res();
            });
        });
    }

    kill() {
        this.process.kill('SIGINT');
        this.process = undefined;
    }

    spawn() {
        if (this.process) throw new Error('child process is already initialized');

        this.process = spawn(
            join(versionsDir, this.config.version, 'TerrariaServer.bin.x86_64'),
            ['-config', join(serversDir, this.config.id)],
            { cwd: __dirname }
        );

        this.process.stdout.on('data', chunk => {
            this.emitter.emit('stdout', chunk);

            // Check for server exit with regex here, and emit cleanExit
        });

        this.process.on('close', this.onClose);
        this.process.on('exit', this.onClose);
        this.process.on('error', this.onClose);
    }

    private onClose(reason: string) {
        this.kill();
        this.emitter.emit('exit', reason);
    }

    constructor(config: ITerrariaServer) {
        if (platform() !== 'linux') throw new Error('server must be running on a Linux distribution');

        const { version, ...cfg } = config;

        this.config = {
            version: shortenVersion(version),
            ...cfg
        };
    }
}