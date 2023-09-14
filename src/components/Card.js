import React ,{forwardRef} from 'react';

const  Card = forwardRef((props, ref) => {
    const data = props.product;
    return (
        <div className='card-box' ref={ref}>
           <img src={data.thumbnail}/>
           <div className='title'>
           <h2>{data.title}</h2>
           <h3>{data.brand}</h3>
           <p>{data.description}</p>
           <div>
           rating : <span> {data.rating}</span>
           </div>
           <div>
           price : <span> {data.price}</span>
           </div>
           </div>
         
        </div>
    );
}
)

export default Card;