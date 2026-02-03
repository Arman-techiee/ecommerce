import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function SingleProductPage() {
    const params = useParams();
    console.log(params);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProduct() {
          try {
            const response = await fetch(`https://fakestoreapi.com/products/${params.id}`);
            const data = await response.json();
            setProduct(data);
          }
          catch(error) {
            console.error('Error fetching product', error);
          }
          finally {
            setLoading(false);
          }
        }
        if (params?.id) fetchProduct();
      }, [params]);

    console.log("item", product)
    console.log("loading", loading)

    if (loading){
      return <div>
        Loading....
      </div>
    }

  return (
    <div>
     <h1>
      {product.title}
     </h1>
     <p>Category : {product.category}</p>
     <div>
      <img
      src={product.image}
      height={400}
      width={400}
      />
     </div>
     <p>Price :${product.price}</p>
     <p>{product.description}</p>
     <p>
      {product.rating.rate}({product.rating.rate})
     </p>
    </div>
  )
}

export default SingleProductPage