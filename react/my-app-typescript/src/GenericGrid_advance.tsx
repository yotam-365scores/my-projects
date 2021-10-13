import React from "react";


interface IHeaderCol {
    title: string;
    isLazy?: boolean;
    display?: string;
    render(obj: any): JSX.Element;
}

class HeaderCol implements IHeaderCol {
    static init(partial: Partial<HeaderCol>) {
        return Object.assign(new HeaderCol(), partial);
    }

    title!: string;
    isLazy?: boolean;
    display?: string;
    render(obj: any): JSX.Element {
        //return obj.name;
        if (this.display) {
            //return <React.Fragment>{String.raw(this.display, obj)}</React.Fragment>;
            
            //let interpolationFunc = template(this.display);
            //return <React.Fragment>{interpolationFunc(obj)}</React.Fragment>;

            return <React.Fragment>{this.display}</React.Fragment>;
        } else {
            return <React.Fragment>{obj[this.title]}</React.Fragment>
        }
    }
}

export const tableHeader: HeaderCol[] = [
    HeaderCol.init({ title: 'first col', isLazy: false, display: `n = ${'name'}` }),
    HeaderCol.init({ title: 'name', isLazy: false })
]

export function GentericGrid<Typ>(props: {
    table: Typ[],
    //tableHeader: HeaderCol[]
}): JSX.Element {

    let thead: JSX.Element[] = tableHeader.map(headerCol =>
        <th>{headerCol.title}</th>
    );

    let tbody = props.table.map(tableItem => {
        return <tr>{tableHeader.map(headerCol =>
            <td>{headerCol.render(tableItem)}</td>
        )}</tr>
    });



    return (
        <div className="Genteric-grid">
            <table>
                <thead><tr>{thead}</tr></thead>
                <tbody>{tbody}</tbody>;
            </table>
        </div>
    );
}
