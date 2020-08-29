import React from 'react';
const Products = (props) => {
    console.log(props.products)
    const renderProducts = () => {
        return props.products.map(product => {
            return <li key={product._id}>
                <img src={product.image}></img>
                <p><a href='#'>{product.title}</a></p>
                <p><strong>${product.price}.00</strong></p>
                <button>ADD TO CART</button>
            </li>
        })
    }

    return ( 
    <div>
        <ul>
            {
                renderProducts()
            }
        </ul>
    </div>
     );
}
 
export default Products;
// <li key={product._id}>
            //     <div>
            //         <a href={"#" + product}>
            //             <img src={product.image} alt={product.title}></img>
            //             <p>
            //                 {product.title}
            //             </p>
            //         </a>
            //         <div>
            //             {product.price}
            //         </div>
            //         <button>
            //             Add To Cart
            //         </button>
            //     </div>
            // </li>