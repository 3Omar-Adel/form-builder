import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

import "./Pagination.css";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => {

    const getPages = () => {
        const pages: (number | "ellipsis")[] = [];

        if (totalPages <= 7) {
            for (
                let page = 1;
                page <= totalPages;
                page++
            ) {
                pages.push(page);
            }

            return pages;
        }

        pages.push(1);

        if (currentPage > 4) {
            pages.push("ellipsis");
        }

        const startPage = Math.max(
            2,
            currentPage - 1,
        );

        const endPage = Math.min(
            totalPages - 1,
            currentPage + 1,
        );

        for (
            let page = startPage;
            page <= endPage;
            page++
        ) {
            pages.push(page);
        }

        if (currentPage < totalPages - 3) {
            pages.push("ellipsis");
        }

        pages.push(totalPages);

        return pages;
    };

    return (
        <nav
            className="pagination"
            aria-label="Pagination"
        >
            <button
                type="button"
                className="pagination-button"
                onClick={() =>
                    onPageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                <KeyboardArrowLeftOutlinedIcon />
            </button>

            <div className="pagination-pages">
                {getPages().map(
                    (page, index) =>
                        page === "ellipsis" ? (
                            <span
                                key={`ellipsis-${index}`}
                                className="pagination-ellipsis"
                            >
                                …
                            </span>
                        ) : (
                            <button
                                key={page}
                                type="button"
                                className={`pagination-page ${
                                    currentPage === page
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() =>
                                    onPageChange(page)
                                }
                                aria-current={
                                    currentPage === page
                                        ? "page"
                                        : undefined
                                }
                            >
                                {page}
                            </button>
                        ),
                )}
            </div>

            <button
                type="button"
                className="pagination-button"
                onClick={() =>
                    onPageChange(currentPage + 1)
                }
                disabled={
                    currentPage === totalPages
                }
                aria-label="Next page"
            >
                <KeyboardArrowRightOutlinedIcon />
            </button>
        </nav>
    );
};

export default Pagination;