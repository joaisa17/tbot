import { ChildProcess, spawn } from 'node:child_process';
import eventEmitter from '@utils/eventEmitter';

import { ITerrariaServer } from '@mongoose/schemas/discordServer';

import shortenVersion from '@utils/shortenVersion';

interface Events {
    stdout: string;
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
            'sh',
            ['run.sh', shortenVersion(this.config.version), this.config.id],
            { cwd: __dirname }
        );

        this.process.stdout.on('data', chunk => {
            this.emitter.emit('stdout', chunk);
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
        this.config = config;
    }
}