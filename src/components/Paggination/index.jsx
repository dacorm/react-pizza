import React from "react";
import ReactPaginate from "react-paginate";

import styles from './Paggination.module.scss'

const Paggination = ({ onChangePage }) => {
    return(
        <div>
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                nextLabel=">"
                onPageChange={(e) => onChangePage(e.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </div>
    )
}

export default Paggination