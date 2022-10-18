import { Terminal } from '@terraria';

export default function shutdownServer(term: Terminal) {
    return new Promise<void>((res, rej) => {
        const cleanExitListener = () => {
            term.off('cleanExit', cleanExitListener);
            res();
        };

        const exitListener = (err: any) => {
            term.off('exit', exitListener)
            rej(err);
        };

        term.on('cleanExit', cleanExitListener);
        term.on('exit', exitListener);

        term.send('exit');

        setTimeout(() => rej('Timed out'), 30000);
    });
}