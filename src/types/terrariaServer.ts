export default interface ITerrariaServer {
    id: string;
    version: string;

    ownerId: string;
    admins?: string[];
    
    // Config parameters
    port: number;
    password?: string;
    
    worldname?: string;
    seed?: string;
    difficulty?: string;
}