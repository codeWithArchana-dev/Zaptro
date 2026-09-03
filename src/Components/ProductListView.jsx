import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useCart} from '../Context/CartContext.jsx'

const ProductListView = ({product}) => {

const navigate = useNavigate()
 const {addToCart} = useCart()
  return (
    <div className='space-y-4 mt-2 rounded-md'>
      <div className='bg-gray-100 flex gap-7 items-center p-2 rounded-md'>
        <img src={product.image} alt={product.title}  className='md:h-60 md:w-60 h-25 w-25 rounded-md cursor-pointer
        ' onClick={() => navigate(`/products/${product.id}`)}/>
        <div className='space-y-2'>
          <h1 className='font-bold md:text-xl text-lg hover:text-red-400  md:w-full line-clamp-3 w-[220px] '>{product.title}</h1>
          <p className='font-semibold md:text-lg text-sm flex items-center'>
            <span className='md:text-4xl text-xl'>${product.price}</span></p>
            <p className='text-sm'>FREE delivery <span className='font-semibold'>Fri, 18 apr </span><br />
              Or fastest delivery  <span className='font-semibold'>Tomarrow, 17 apr</span>
            </p>
            <button onClick={()=>addToCart(product)} className='bg-red-500 text-white rounded-md px-3 py-1'>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductListView
