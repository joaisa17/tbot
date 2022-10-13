import { ChatInputCommandInteraction } from 'discord.js';
import { resolve } from 'node:path';

export default class CommandError extends Error {
    title?: string;

    constructor(err: any, title?: string) {
        super(err);
        this.title = title;
    }
}

export async function errorReply(template: string, i: ChatInputCommandInteraction, err?: Error) {
    const content = template
        .replace(/\{command\}/, i.commandName)
        .replace(/\{error\}/,
            err?.message
                ?.replace(resolve(__dirname, '..', '..') + '\\', '')
                .replace(/^Error: /, '') ?? 'unexpected error'
        );
    
    return i.deferred?
    i.editReply(content)
    :i.reply({ content, ephemeral: true });
}