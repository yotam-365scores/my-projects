function TBody<Typ>(tableItem: Typ): JSX.Element {
    let arr = [];
    for (const key in tableItem) {
        if (Object.prototype.hasOwnProperty.call(tableItem, key)) {
            const element = tableItem[key];
            //const toPrint = <td><i>{key}:</i> {element}</td>;
            const toPrint = <td>{element}</td>;
            arr.push(toPrint);
        }
    }

    return (
        <tr>
            {/* <td>{tableItem.name}</td> */}
            {arr}
        </tr>
    );
}

function THead<Typ>(tableItem: Typ): JSX.Element {
    let arr = [];
    for (const key in tableItem) {
        if (Object.prototype.hasOwnProperty.call(tableItem, key)) {
            //const element = tableItem[key];
            arr.push(<th>{key}</th>);
        }
    }

    return (
        <tr>
            {/* <td>{tableItem.name}</td> */}
            {arr}
        </tr>
    );
}

export interface TableHelper {

}

export function GentericGrid<Typ>(props: {
    table: Typ[],
    tableHelper?: TableHelper
}): JSX.Element {

    const thead = <thead>{THead(props.table[0])}</thead>;

    const tbody = <tbody>{props.table.map(TBody)}</tbody>;

    return (
        <div className="Genteric-grid">
            <table>
                {thead}
                {tbody}
            </table>
        </div>
    );
}
