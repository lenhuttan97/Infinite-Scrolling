import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories } from '../data/sliceCategories';
import { loadProducts } from '../data/sliceProduct';



function SearchBar(props) {

  const categories = useSelector((state) => state.categories.categories);
  const isLoading = useSelector((state) => state.categories.loading)
  const dispatch = useDispatch();

  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(loadCategories())
  }, [])

  useEffect(() => {
    dispatch(loadProducts({
      limit: 20,
      skip: 0,
      q: search
    }))
  }, [search])



  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <div className='search-bar'>
      <div className='input'>
        <input type='text' value={search} onChange={handleSearch} />
      </div>

      <ul>
        {
          !isLoading && categories.map((category) => <li key={category}
            onClick={() => dispatch(loadProducts({category: category}))}
          >{category}</li>)
        }
      </ul>
    </div>
  );
}

export default SearchBar;