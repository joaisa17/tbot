import CommandHandler from '@customTypes/commands';
import configureStructure from '@/structure';

const reloadCommands: CommandHandler = async i => {
    await configureStructure(true);

    i.reply({
        content: 'Successfully reloaded all slash commands!',
        ephemeral: true
    });
};

export default reloadCommands;