import React from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss"
import { SearchContext } from "../../App";

const Search = () => {
    const [value, setValue] = React.useState();
    const { searchValue, setSearchValue } = React.useContext(SearchContext);
    const inputRef = React.useRef();


    const updateSearchValue = React.useCallback(
        debounce((str) => {
            setSearchValue(str);
        }, 250), []
    )

    const onChangeInput = (evt) => {
        setSearchValue(evt.target.value);
        updateSearchValue(evt.target.value);
    }

    const onClickClear = () => {
        setSearchValue('');
        setValue('');
        inputRef.current.focus();
    }

    return (
        <div className={styles.root}>
            {searchValue && (<svg onClick={onClickClear
            } className={styles.icon} width="35px" height="35px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/></g></g></svg>)}
            <input ref={inputRef} value={value} onChange={onChangeInput} className={styles.input} placeholder="Поиск пиццы..."/>
        </div>
    )
}

export default Search;