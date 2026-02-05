import { useState, useEffect } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

//TODO: Make data appear on first load.

const Table = ({ caption, query, columns }) => {
    const [tableData, setTableData] = useState([]);
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");
    //const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData(query);
    }, []);

    const handleSorting = (sortField, sortOrder) => {
        if (sortField) {
            const sorted = [...tableData].sort((a, b) => {
                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;
                //if (typeof a[sortField] === "boolean") return a[sortField] ? "true" : "false";
                //if (typeof b[sortField] === "boolean") return b[sortField] ? "true" : "false";
                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (sortOrder === "asc" ? 1 : -1)
                );
            });
            setTableData(sorted);
        }
    };

    const handleSortingChange = (accessor) => {
        const sortOrder =
            accessor === sortField && order === "asc" ? "desc" : "asc"; //If not sorted, sort asc, else swap asc and desc
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder);
    };

    return (
        <>
            <table className="table">
                <caption>{caption}</caption>
                <TableHead {...{ columns, handleSortingChange, sortField, order }} />
                <TableBody {...{ columns, tableData, setTableData, query, fetchData}} />
            </table>
            <button onClick={fetchData}>Refresh Data</button>
        </>
    );

    async function fetchData() {
        const response = await fetch(query);
        if (response.ok) {
            //alert("Hi there!");
            //alert("Still working! " + JSON.stringify(data));
            const data = await response.json();
            setTableData(data);
            handleSorting(sortField, order);
        }
        else {
            //alert("Response NOT ok");
        }
    }
};

export default Table;