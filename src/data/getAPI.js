import axios from "axios";


export async function getCatelogry(){
    let cancel;
    return axios({
        method: 'GET',
        url: 'https://dummyjson.com/products/categories',
        cancelToken: new axios.CancelToken(c => cancel = c)
    })

    
}

export async function getProductSearch(props){
    let cancel;
    return axios({
        method: 'GET',
        url: 'https://dummyjson.com/products/search',
        params: { q: props.q, limit: props.limit, skip: props.skip},
        cancelToken: new axios.CancelToken(c => cancel = c)
    })
  
}

export async function getProductCategory(props){
    let category = props.category;
    return axios({
        method: 'GET',
        url: 'https://dummyjson.com/products/category/' + category
    })
  
}