

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) {
        return null;
    }

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    return (
        <>
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">

                    {/* Previous */}
                    <li
                        className={`page-item ${currentPage === 1 ? "disabled" : ""
                            }`}
                    >
                        <button
                            className="page-link"
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                    </li>

                    {/* Pages */}
                    {pages.map((page) => (
                        <li
                            key={page}
                            className={`page-item ${currentPage === page ? "active" : ""
                                }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </button>
                        </li>
                    ))}

                    {/* Next */}
                    <li
                        className={`page-item ${currentPage === totalPages ? "disabled" : ""
                            }`}
                    >
                        <button
                            className="page-link"
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </li>

                </ul>
            </nav>
        </>
    );
};