export type WorldSize = 'small'|'medium'|'large';
export type Difficulty = 'normal'|'expert'|'master'|'journey';

export type ModifiableKey = keyof Omit<ITerrariaServer, 'config'|'admins'|'ownerId'|'id'>;
export const modifiableKeys: ModifiableKey[] = [
    'version'
];

export type ModifiableConfigKey = keyof ITerrariaServerConfig;
export const modifiableConfigKeys: ModifiableConfigKey[] = [
    'port',

    'autocreate',
    'seed',
    'worldname',
    'difficulty',
    'maxplayers',
    'password',
    'motd'
];

export interface ITerrariaServerConfig {
    /** The world file location (.wld) */
    world: string;

    /** Path where all worlds are stored */
    worldpath: string;

    port: number;

    autocreate: number;
    seed?: string;
    worldname?: string;
    difficulty?: number;
    maxplayers?: number;
    password?: string;
    motd?: string;

    /** Ban list file location */
    banlist?: string;

    secure?: number;
    language?: string;
    upnp?: number;
    npcstream?: number;
    priority?: number;

    journeypermission_time_setfrozen?: number;
    journeypermission_time_setdawn?: number;
    journeypermission_time_setnoon?: number;
    journeypermission_time_setdusk?: number;
    journeypermission_time_setmidnight?: number;
    journeypermission_godmode?: number;
    journeypermission_wind_setstrength?: number;
    journeypermission_rain_setstrength?: number;
    journeypermission_time_setspeed?: number;
    journeypermission_rain_setfrozen?: number;
    journeypermission_wind_setfrozen?: number;
    journeypermission_increaseplacementrange?: number;
    journeypermission_setdifficulty?: number;
    journeypermission_biomespread_setfrozen?: number;
    journeypermission_setspawnrate?: number;
}

export default interface ITerrariaServer {
    id: string;
    version: string;

    ownerId: string;
    admins?: string[];
    
    config: ITerrariaServerConfig;
}