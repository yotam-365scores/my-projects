import { Constructor, GConstructor } from "./common";

export type Position = {x: number, y: number}
export const defaultPosition: Position = {x: 0, y: 0};

export class Spirit {
    constructor(
        public name: string, 
        public position: Position = defaultPosition) { }
}

function Scale<TypBase extends Constructor>(Base:TypBase) {
    return class Scaling extends Base {
        //constructor(parameters) { }
        private _scale = 1;
        
        public get scale() : number {
            return this._scale;
        }

        setScale(scale: number) {
            this._scale = scale;
        }
        
    }
    
}

const bit8 = Scale(Spirit);
const fs = new bit8('bird');
fs.setScale(0.8);

type PositionAble = GConstructor<{ 
    setPosition: (position: Position) => void, 
    getPosition: () => Position 
}>;
type LoggAble = GConstructor<{ 
    print: (name: string) => void 
}>;

function JumpAble<TypBase extends PositionAble>(Base: TypBase) {
    return class JumpAble extends Base {
        //constructor(parameters) { }
        private _scale = 1;
        
        public get scale() : number {
            return this._scale;
        }

        setScale(scale: number) {
            this._scale = scale;
        }
        
    }
    
}
