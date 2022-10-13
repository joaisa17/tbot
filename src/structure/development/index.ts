import { PermissionFlagsBits } from 'discord.js';
import { Command } from '@customTypes';

import reloadCommands from './reloadCommands';

const developmentCommands: Command[] = [
    reloadCommands
]

.map(cmd => cmd.setDefaultMemberPermissions(PermissionFlagsBits.Administrator));

export default developmentCommands;