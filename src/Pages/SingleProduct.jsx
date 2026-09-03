import axios from "axios";
import React, { useState , useEffect } from "react";
import loading from "../assets/loading4.webm";
import Breadcrums from "../Components/Breadcrums";
import { useParams } from "react-router-dom";
import {IoCartOutline}  from 'react-icons/io5';
import { useCart } from "../Context/CartContext";


const SingleProduct = () => {
  const params = useParams()
  const [singleProduct, setSingleProduct] = useState("");
  const{addToCart} = useCart()
  const [quantity, setQuantity] = useState(1);

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `https://fakestoreapi.com/products/${params.id}`,
      );
      const product = res.data;
      setSingleProduct(product);
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  };

    useEffect(() => {
    getSingleProduct();
  }, [params.id]);

  return (
    <>
      {singleProduct ? (
        <div className="px-4 pb-4 md:px-0">
          <Breadcrums title={singleProduct.title} />
          <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* product image */}
            <div className="w-full flex justify-center md:justify-start">
              <img
                src={singleProduct.image}
                alt={singleProduct.title}
                className="rounded-2xl object-cover w-[300px]"
              />
            </div>
           {/* product details */}
            <div className="flex flex-col gap-6">
              <h1 className="md:text-3xl  text-xl font-bold text-gray-800">{singleProduct.title}</h1>
              <div className="text-gray-700">{singleProduct.category?.toUpperCase()} / {singleProduct.title?.toUpperCase()}
                 <p className="text-xl text-red-500 font-bold">{singleProduct.price}</p>
                 <p className="text-gray-600">{singleProduct.description}</p>
              </div>
                
            {/* Quantity selectors */}

              <div className="flex items-center gap-4">
              <label htmlFor="" className="text-sm font-medium text-gray-700">Quantity:</label>
              <input type="number" min={1} value={quantity}  onChange={(e) => setQuantity(Number(e.target.value))} className="w-20 border border-gray-300 rounded-lg px-3 py-1
              focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div>
              <button onClick={()=>addToCart(singleProduct , quantity)}  className="px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md">
                <IoCartOutline className="w-6 h-6"/>Add to Cart</button>
            </div>
            </div>
            
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <video muted autoPlay loop>
            <source src={loading} type="video/webm" />
          </video>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
