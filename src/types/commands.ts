import { ChatInputCommandInteraction, AutocompleteInteraction, SlashCommandBuilder, User } from 'discord.js';
import IDiscordServer from './discordServer';

type Options = Record<string, any>;
type Filter<T, C> = Pick<T, {[K in keyof T]: T[K] extends C? K : never}[keyof T]>;
type Get<T, C> = (<K extends keyof Filter<T, C>>(name: K, required?: boolean) => T[K]|undefined);

export type CommandInteraction<T extends object = Options> = Omit<ChatInputCommandInteraction, 'options'> & {
    options: Omit<(ChatInputCommandInteraction)['options'], 'getString'|'getNumber'|'getBoolean'|'getInteger'|'getUser'> & {
        getString: Get<T, string>;
        getNumber: Get<T, number>;
        getBoolean: Get<T, boolean>;
        getInteger: Get<T, number>;
        getUser: Get<T, User>;
    }
};

type CommandHandler<T extends Options = any> = (
    (i: CommandInteraction<T>)
    => Promise<unknown>) & { autoComplete?: (i: AutocompleteInteraction, server: IDiscordServer) => Promise<unknown>|unknown};

export type Command = Omit<SlashCommandBuilder, "addSubcommand"|"addSubcommandGroup">;
export type CommandMap = Map<string, CommandHandler>;

export default CommandHandler;