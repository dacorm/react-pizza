import React from "react";
import ReactPaginate from "react-paginate";

import styles from './Paggination.module.scss'

const Paggination = ({ currentPage, onChangePage }) => {
    return(
        <div>
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                nextLabel=">"
                onPageChange={(e) => onChangePage(e.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
                forcePage={currentPage}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </div>
    )
}

export default Paggination