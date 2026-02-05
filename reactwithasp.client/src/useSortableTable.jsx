import { useState } from "react";
export const useSortableTable = (data, columns) => {
    const [tableData, setTableData] = useState(getDefaultSorting(data, columns));

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

    return [tableData, setTableData, handleSorting];
};

function getDefaultSorting(defaultTableData, columns) {
    const sorted = [...defaultTableData].sort((a, b) => {
        const filterColumn = columns.filter((column) => column.sortbyOrder);

        // Merge all array objects into single object and extract accessor and sortbyOrder keys
        let { accessor = "id", sortbyOrder = "asc" } = Object.assign(
            {},
            ...filterColumn
        );

        if (a[accessor] === null) return 1;
        if (b[accessor] === null) return -1;
        if (a[accessor] === null && b[accessor] === null) return 0;
        //if (typeof a[accessor] === "boolean") return a[accessor] ? "true" : "false";
        //if (typeof b[accessor] === "boolean") return b[accessor] ? "true" : "false";
        const ascending = a[accessor]
            .toString()
            .localeCompare(b[accessor].toString(), "en", {
                numeric: true,
            });

        return sortbyOrder === "asc" ? ascending : -ascending;
    });
    return sorted;
}