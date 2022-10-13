export default interface ITerrariaServer {
    id: string;
    version: string;

    ownerId: string;
    admins?: string[];
    
    // Config parameters
    port: number;
    password?: string;
    
    worldname?: string;
    worldsize?: 'small'|'medium'|'large';
    difficulty?: 'normal'|'expert'|'master'|'journey';
    seed?: string;
}