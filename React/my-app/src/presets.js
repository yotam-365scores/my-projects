import {getJsonCircularReplacer} from './common';

export const flexRowClasses = "d-flex flex-row justify-content-between align-items-baseline align-content-start flex-wrap"

/* <JSONPretty data={yourJSON} theme={JSONPrettyMon}></JSONPretty> */
export const JSONPrettyMon = require('react-json-pretty/dist/monikai');

export const JSONPretty = {
    theme: JSONPrettyMon,
    style: { textAlign: 'start' }
}

export const JSONPrettyCircular = (data = undefined) => {
    return {...JSONPretty, data: getJsonCircularReplacer(data)}
}