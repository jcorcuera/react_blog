import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SortFilters, searchChanged, sortChanged } from "./filtersSlice";

import styles from './filters.module.css'

let searchTimeout

function Filters() {
  const dispatch = useDispatch()

  const searchValue = useSelector(state => state.filters.search)
  const sortValue = useSelector(state => state.filters.sort)

  const [searchText, setSearchText] = useState(searchValue)

  const handleSearchChanged = (e) => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      dispatch(searchChanged(e.target.value))
    }, 250)
    setSearchText(e.target.value)
  }

  const handleSortChanged = (e) => {
    dispatch(sortChanged(e.target.value))
  }

  return (
    <div className={styles.filters}>
      <div className={styles.searchFilter}>
        <input
          placeholder='Search Posts'
          autoFocus={false}
          value={searchText}
          onChange={handleSearchChanged}
        />
      </div>
      <div className={styles.sortFilter}>
        <span>Sort</span>
        <select onChange={handleSortChanged} value={sortValue} data-testid="sorting-select-testid">
          { Object.entries(SortFilters).map(([key, value]) => {
            return <option key={key} alue={key}>{value}</option>
          }) }
        </select>
      </div>
    </div>
  );
}

export default Filters;