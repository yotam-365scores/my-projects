"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spirit = exports.defaultPosition = void 0;
exports.defaultPosition = { x: 0, y: 0 };
class Spirit {
    constructor(name, position = exports.defaultPosition) {
        this.name = name;
        this.position = position;
    }
}
exports.Spirit = Spirit;
function Scale(Base) {
    return class Scaling extends Base {
        constructor() {
            super(...arguments);
            //constructor(parameters) { }
            this._scale = 1;
        }
        get scale() {
            return this._scale;
        }
        setScale(scale) {
            this._scale = scale;
        }
    };
}
const bit8 = Scale(Spirit);
const fs = new bit8('bird');
fs.setScale(0.8);
function JumpAble(Base) {
    return class JumpAble extends Base {
        constructor() {
            super(...arguments);
            //constructor(parameters) { }
            this._scale = 1;
        }
        get scale() {
            return this._scale;
        }
        setScale(scale) {
            this._scale = scale;
        }
    };
}
//# sourceMappingURL=tests.js.map