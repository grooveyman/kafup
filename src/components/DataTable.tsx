

interface DataTableProps<T> {
    headings: string[];
    data: T[];
    renderRow: (item: T, index: number) => React.ReactNode;
}


export const DataTable = <T,>({ headings, data, renderRow }: DataTableProps<T>) => {
    return (
        <>
            <div className="table-responsive">
                <table className="table align-middle modern-table">
                    <thead>
                        {/* <tr> */}
                            {headings.map((h, i) => (
                                <th key={i}>{h}</th>
                            ))}
                        {/* </tr> */}
                    </thead>

                    <tbody>
                        {data.map((item, index) => renderRow(item, index))}
                    </tbody>
                </table>
            </div>
        </>
    );
};