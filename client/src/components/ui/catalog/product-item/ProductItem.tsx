import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { IProduct } from '@/types/product.interface'

import { convertPrice } from '@/utils/convertPrice'

import AddToCartButton from './AddToCartButton'
import ProductRating from './ProductRating'

const DynamicFavoriteButton = dynamic(() => import('./FavoriteButton'), {
	ssr: false
})

const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
	return (
		<div className="product-container">
			<div style={{position: 'relative'}} className='product'>
				<div className='product__top'>
					<div className='product__top-navigation'>
						<DynamicFavoriteButton productId={product.id} />
						<AddToCartButton product={product} />
					</div>
					<Link style={{backgroundImage: `url(${product.images[0]})`}} className='product__top-img' href={`/product/${product.slug}`}>
				
					</Link>
				</div>
				<h3 style={{paddingBottom: '40px'}} className='product-name'>{product.name}</h3>
				<div style={{position: 'absolute', bottom: '0', left: '0'}} className='product-price'>{convertPrice(product.price)}</div>
			</div>
		</div>
	)
}

export default ProductItem
