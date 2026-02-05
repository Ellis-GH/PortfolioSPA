import { useState, useEffect } from "react";

const TableBody = ({ tableData, columns, setTableData, query, fetchData }) => {
    // New state: Use this to track the table cell being edited
    const [editCell, setEditCell] = useState({});
    const [editedRows, setEditedRows] = useState([]);
    const [fkOptions, setFkOptions] = useState({});
    const [newRow, setNewRow] = useState({});

    const fetchOptions = async (optionsQuery) => {
        //alert("Fetching " + optionsQuery);
        const response = await fetch(`${optionsQuery}`);
        //alert(`${optionsQuery}`);
        if (!response.ok) {
            //alert("NOT OK!");
            //throw new Error("Failed fetch TickerStrings");
        }
        else {
            const data = await response.json();
            //alert(JSON.stringify(data));
            return data;
        }
    }

    const updateNewRow = (accessor, value, type) => {

        const newValue = type == "boolean" ? (value != "false") : value;

        setNewRow(prev => ({ ...prev, [accessor]: newValue }))
    }

    useEffect(() => {
        const loadFKOptions = async () => {
            const result = {};

            for (const column of columns) {
                if (column.fk === "" || column === undefined) { continue; }
                //alert("This is working!");
                console.log("Column.fk: " + column.fk);
                result[column.accessor] = await fetchOptions(column.fk);
                //alert(column.accessor + " is being assigned " + result[column.accessor]);
            }

            setFkOptions(result);
        };

        loadFKOptions();
    }, [tableData]);
    /*
    useEffect(() => {
        alert(JSON.stringify(newRow));
    }, [newRow])
    */
    // New event handler
    const handleChange = (inputValue, accessor, dataType) => {
        const newDataState = [...tableData];

        // Find the row and update the property
        const row = newDataState.find((row) => row.id === editCell.id);

        row[accessor] = dataType == "boolean" ? (inputValue != "false") : inputValue;

        // Update the state
        setTableData(newDataState);
        if (editedRows.find(editedRow => editedRow.id === row.id) == undefined) {
            const newEditedRows = editedRows;
            newEditedRows.push(row);
            setEditedRows(newEditedRows);
        }

        setEditCell({});
    };

    const saveEdit = async (rowID) => {
        const editedRow = editedRows.find(editedRowI => editedRowI.id === rowID);
        if (editedRow !== undefined) {
            const newEditedRows = editedRows.filter(editedRow => editedRow.id !== rowID);
            setEditedRows(newEditedRows);

            const response = await fetch(`${query}/${editedRow.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedRow),
            });

            if (!response.ok) {
                alert("NOT OK! ");
                throw new Error("Failed to update row");
            }
        }
    }

    const deleteRow = async (rowID) => {
        const response = await fetch(`${query}/DeleteRow/${rowID}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            alert("NOT OK! ");
            throw new Error("Failed to delete row " + rowID);
        }

        fetchData(query); //Bad, should update the data onscreen seperately, rather than fetching
    }

    const handleAddNewRow = async () => {
        //alert(JSON.stringify(newRow));
        const response = await fetch(query + "/AddRow", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newRow),
        });

        if (!response.ok) {
            alert("Failed to add row");
            throw new Error("Failed to update row");
        }

        //const createdRow = await response.json();

        // update table state
        //setRows(prev => [...prev, createdRow]);

        // clear inputs for next row
        setNewRow({ TickerString: "", Quantity: "", Cost: "", Buy: true });

        fetchData(query);
    };



    return (
        <>
            <tbody id={tableData.length}>
                {tableData.map((data) => {//For each data record in the table (row)
                    const beenEdited = editedRows.find(row => row.id === data.id) !== undefined;

                    return ( //Return a table row
                        <tr key={data.id}>
                            {columns.map(({ accessor, fk, type}) => { //For each column, as defined in  App.jsx, get their accessor (columnName)
                                const isFK = fk !== "" ? true : false;

                                //const FKOptions = isFK ? fetchOptions(fk) : [];
                                //if (isFK) { alert(fkOptions['tickerString']); }


                                const isEditing =
                                    editCell.id === data.id && editCell.accessor === accessor; //If the cell targeted for editing is this cell

                                const tData = data[accessor].toString() //If the value in this cell is not null? then keep it, else if we're editing it then make it empty, else fill it with --
                                    ? data[accessor].toString()
                                    : isEditing
                                        ? ""
                                        : "";

                                return ( //Return a tableData (a cell)
                                    <td
                                        key={accessor} //unsure of the impact of this line tbh
                                        onClick={() => setEditCell({ id: data.id, accessor })} //Embedded onClick function, sets editCell to be this cell
                                    >
                                        {isEditing ? //If editiing
                                            isFK ? /// and IS FK
                                                (
                                                    <select
                                                        key={accessor}
                                                        value={tData}
                                                        onChange={(e) => handleChange(e.target.value, accessor)}
                                                        onBlur={() => setEditCell({})}
                                                        autoFocus
                                                    >
                                                        {fkOptions[accessor]?.map(option => (
                                                            <option
                                                                key={option}
                                                                value={option}
                                                                //onChange={(e) => handleChange(e.target.value, accessor)}
                                                            >
                                                                {option}
                                                            </option>
                                                        ))}

                                                    </select>
                                                ) : ( // and NOT FK
                                                    <input //An input field
                                                        defaultValue ={tData} //Using the previous data as the default input
                                                        //onChange = {(e) => handleChange(e.target.value, accessor, type)} //an embedded onChange event, (whenever there was a change in the input box)
                                                        //onBlur = {() => setEditCell({})} //an embedded onBlur event (when something else is clicked on/this box loses focus), sets editCell to be no cell
                                                        onBlur = {(e) => handleChange(e.target.value, accessor, type)}
                                                        autoFocus //idk
                                                    />
                                                ) : (
                                                    tData //Else, the new cell data
                                            )}
                                    </td>
                                );
                            })}
                            {beenEdited ? (
                                <td>
                                    <button onClick={() => saveEdit(data.id)}>Save Changes</button>
                                </td>
                            ) : <></>}
                            <td>
                                <button onClick={() => deleteRow(data.id)}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
                <tr>
                    {columns.map(({ accessor, fk, type }) => { //For each column, as defined in  App.jsx, get their accessor (columnName)
                        const isFK = fk !== "" ? true : false;
                        return (
                            <td>
                                { isFK ? /// if IS FK
                                    (
                                        <select
                                            key={accessor}
                                            onChange={e => updateNewRow(accessor, e.target.value, type)}
                                            //onChange={(e) => handleChange(e.target.value, accessor)}
                                            //onBlur={e => setNewRow(prev => ({ ...prev, [accessor]: e.target.value }))}
                                            autoFocus
                                        >
                                            {fkOptions[accessor]?.map(option => (
                                                <option
                                                    key={option}
                                                    value={option}
                                                    onChange={e => updateNewRow(accessor, e.target.value, type)}
                                                >
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    ) : ( // if NOT FK
                                        <input //An input field
                                            defaultValue={newRow[accessor]}
                                            onChange={e => updateNewRow(accessor, e.target.value, type)} //an embedded onChange event, (whenever there was a change in the input box)
                                            //onBlur={() => setEditCell({})} //an embedded onBlur event (when something else is clicked on/this box loses focus), sets editCell to be no cell
                                            autoFocus //idk
                                        />
                                    )
                                }
                            </td>
                        )
                    })}
                    <td>
                        <button onClick={handleAddNewRow}>Add New</button>
                    </td>
                </tr>
            </tbody>
        </>
    );
};

export default TableBody;