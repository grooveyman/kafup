

interface DataTableProps<T> {
    headings: string[];
    data: T[];
    renderRow: (item: T, index: number) => React.ReactNode;
    className?: string;
}


export const DataTable = <T,>({ headings, data, renderRow, className = "" }: DataTableProps<T>) => {
    return (
        <div className="table-responsive">
                <table className={`table align-middle modern-table ${className}`.trim()}>
                    <thead>
                        <tr>
                            {headings.map((heading, index) => (
                                <th key={index} scope="col">{heading}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, index) => renderRow(item, index))}
                    </tbody>
                </table>
        </div>
    );
};