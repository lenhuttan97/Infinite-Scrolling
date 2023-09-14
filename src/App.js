import SearchBar from './components/SearchBar';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef, useCallback } from 'react';
import { loadProducts } from './data/sliceProduct';
import Card from './components/Card';

function App() {

  const productsNew = useSelector((state) => state.products.products)

  const [products, setProducts] = useState(productsNew);

  const isLoading = useSelector((state) => state.products.loading)

  const category = useSelector((state) => state.products.category)


  const search = useSelector((state) => state.products.search)

  const [isSearch, setIsSearch] = useState(search);
  
  const hasMore = useSelector((state) => state.products.hasMore)

  const [nextPage, setNextPage] = useState({ limit: 20, skip: 0 });

  const dispatch = useDispatch();


  const observer = useRef();

  const lastBookElementRef = useCallback(node => {
    if (isLoading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        let skip = nextPage.skip + 20;
        setNextPage({
          limit: nextPage.limit, skip: skip
        })
      }
    })
    if (node) observer.current.observe(node)
  }, [isLoading])

  useEffect(() => {
    dispatch(loadProducts(
      {
        limit: nextPage.limit,
        skip: nextPage.skip,
        q: search
      }
    ))
  }, [nextPage])

  useEffect(() => {

    if (!isLoading) {

     if( isSearch !== search){
      
        setIsSearch(search)
      } else {

        if (category ) {
          setProducts(productsNew)
        } else {
          var ids = new Set(products.map(d => d.id));
          var merged = [...products, ...productsNew.filter(d => !ids.has(d.id))];
          setProducts(merged)
        }
      }
    
    }
  }, [productsNew])

  return (
    <>
      <SearchBar />
      <div className='list-product'>
        {
          products.map((product, index) => {
            if (products.length === index + 1) {
              return <Card product={product} key={product.id} ref={lastBookElementRef} />
            } else {
              return <Card product={product} key={product.id} />
            }
          })
        }
      </div>
    </>
  );
}

export default App;
