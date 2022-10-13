import { User, PermissionFlagsBits } from 'discord.js';

import { CommandHandler } from '@customTypes';
import { discordServer } from '@mongoose/schemas';

interface Options {
    id: string;
    user: User;
    action: 'grant'|'revoke';
}

const adminCommand: CommandHandler<Options> = async i => {
    await i.deferReply({ ephemeral: true });

    const guildId = i.guildId;

    const id = i.options.getString('id', true);
    const user = i.options.getUser('user', true);
    const action = i.options.getString('action', true);

    const member = await i.guild.members.fetch(user);
    if (member.permissions.has(PermissionFlagsBits.Administrator)) return i.editReply('Administrators do not need to be authorized!');

    const guild = await discordServer.findOne({ guildId });
    
    const server = guild?.servers.find(s => s.id === id);
    if (!server) return i.editReply('Server does not exist!');

    if (i.user.id === server.ownerId) return i.editReply(`<@${i.user}> is the owner!`);
    
    server.admins ??= [];
    const isAdmin = server.admins.includes(user.id);
    
    if (action === 'grant') {
        if (isAdmin) return i.editReply(`<@${user.id} is already authorized!`);

        server.admins.push(user.id);
        await guild.save();

        i.editReply(`Successfully authorized <@${user.id}>!`);
    }

    else {
        if (!isAdmin) return i.editReply(`<@${user.id}> is not authorized!`);

        server.admins.splice(server.admins.indexOf(user.id), 1);
        await guild.save();

        i.editReply(`Successfully unauthorized <@${user.id}>!`);
    }
}

adminCommand.autoComplete = (i, server) => {
    i.respond(server.servers.map(s => ({
        name: s.id,
        value: s.id
    })));
}

export default adminCommand;