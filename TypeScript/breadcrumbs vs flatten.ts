// breadcrumbs vs flatten??
// e.g. react reducers been called for every actions.

class item {
    //constructor(parameters) { }
    arr: Array<item>;
    name: string;
}

const arr :item[] = [
    {name: 'first', arr: []},
    {name: '', arr: []},
    {name: '', arr: []},
    {name: '', arr: []},
    {name: 'first level', arr: [
        {name: '2nd level', arr: [
            {name: '3rd level', arr: []},
            {name: '', arr: []},
            {name: '', arr: []},
            {name: '', arr: []},
            {name: '', arr: []},        
        ]}
    ]},
    {name: '', arr: []},
    {name: '', arr: []},
    {name: '', arr: []},
    {name: '', arr: []},
    {name: '', arr: []},
    {name: '', arr: []},
    {name: '', arr: []},
    {name: '', arr: []},
    {name: '', arr: []},
    {name: '', arr: []},
    {name: '', arr: []},
    {name: '', arr: []},
    {name: '', arr: []},
    {name: '', arr: []},
    {name: '', arr: []},
    {name: '', arr: []},
    {name: '', arr: []},
    {name: 'd', arr: []},

];

