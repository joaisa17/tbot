import { model, Schema } from 'mongoose';

export enum Difficulty {
    normal = 0,
    expert = 1,
    master = 2,
    journey = 3
}

export interface ITerrariaServer {
    id: string;
    version: string;

    ownerId: string;
    admins: string[];
    
    // Config parameters
    port: number;
    password?: string;
    
    worldname?: string;
    seed?: string;
    difficulty?: string;
}

export interface IDiscordServer {
    guildId: string;

    servers: ITerrariaServer[];
}

const discordServerSchema = new Schema<IDiscordServer>({
    guildId: { type: 'string', required: true, unique: true },

    servers: [{
        id: { type: 'string', required: true },
        version: { type: 'string' },

        ownerId: 'string',
        admins: ['string'],

        port: { type: 'number', required: true, unique: true },
        password: 'string',
        
        worldname: 'string',
        seed: 'string',
        difficulty: 'string'
    }]
});

const discordServer = model<IDiscordServer>('discordServer', discordServerSchema);
export default discordServer;