import { CommandResolver } from '..';

import deleteSlashCommands from './deleteSlashCommands';

const developmentCommands: CommandResolver = () => [
    deleteSlashCommands
];

export default developmentCommands;