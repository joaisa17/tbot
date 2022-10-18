import { CommandInteraction, modifiableKeys, modifiableConfigKeys, ITerrariaServerConfig, ITerrariaServer } from '@customTypes';

function parseOne<T extends object>(i: CommandInteraction, keys: string[]) {
    const returnValue = <T>{};
    
    keys.forEach(k => {
        const v = i.options.get(k)?.value;
        if (v) returnValue[k] = v;
    });
    
    return returnValue;
}

export function parseOptions(i: CommandInteraction) {
    return parseOne<Omit<ITerrariaServer, 'config'>>(i, modifiableKeys);
}

export function parseConfig(i: CommandInteraction) {
    return parseOne<ITerrariaServerConfig>(i, modifiableConfigKeys);
}

export default function parse(i: CommandInteraction) {
    return {
        config: parseConfig(i),
        options: parseOptions(i)
    }
}