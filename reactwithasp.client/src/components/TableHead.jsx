
const TableHead = ({ columns, handleSortingChange, sortField, order }) => {

    return (
        <thead>
            <tr> 
                {columns.map(({ label, accessor, sortable }) => { //For each column in columns (defined elsewhere)
                    const cl = sortable
                        ? sortField === accessor && order === "asc" //If this column is the sorted one, and is asc
                            ? "up"
                            : sortField === accessor && order === "desc" //Or descending
                                ? "down"
                                : "default" //Then apply this tag, which tells index.css to add arrows
                                : "";
                    return (//Then return a table header
                        <th
                            key={accessor} //The datawise column name
                            onClick={sortable ? () => handleSortingChange(accessor) : null} //An onclick event function, if sortable
                            //If clicked, it calls handleSortingChange, which sets the sortColumn to this one, or flips the dir if already this one, then calls handleSorting from Table from useSortableTable
                            className={cl} //The sort direction tag
                        > {label} {/* The human readable column name */}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};

export default TableHead;