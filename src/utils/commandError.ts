import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

export default class CommandError extends Error {
    noEmit?: boolean;
    title?: string;

    constructor(msg?: string|Error, noEmit?: boolean, title?: string) {
        const err = msg as Error;
        super(err.message ?? msg as string);

        this.message = this.message.replace(/^Error:\s+/, '');

        this.noEmit = noEmit || false;
        this.title = title;
    }
}

export async function errorReply(err: Error|CommandError, i: ChatInputCommandInteraction) {
    const cmdErr = err as CommandError;

    const splitTemplate = process.env.ERROR_EMBED_TITLE_TEMPLATE.split('|');
    const title = cmdErr.title? splitTemplate[0].replace(/{title}/g, cmdErr.title):splitTemplate[1];

    const embed = new EmbedBuilder()
        .setColor(0xFF4444)
        .setTitle(title)
        .setDescription(err.message[0].toUpperCase() + err.message.substring(1));
    
    return i.deferred?
    i.editReply({ content: null, embeds: [embed] })
    :i.reply({ content: null, embeds: [embed] });
}