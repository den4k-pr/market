import { FC } from 'react'

import { IProduct } from '@/types/product.interface'

import Loader from '../Loader'

import ProductItem from './product-item/ProductItem'

interface ICatalog {
	products: IProduct[]
	isLoading?: boolean
	title?: string
	isPagination?: boolean
}

const Catalog: FC<ICatalog> = ({ products, isLoading }) => {
	if (isLoading) return <Loader />

	return (
		<section className='catalog'>
			{products.length ? (
				<>
					<div className='catalog__products'>
						{products.map(product => (
							<ProductItem key={product.id} product={product} />
						))}
					</div>
				</>
			) : (
				<div className='emptyProducts'>There are no products</div>
			)}
		</section>
	)
}

export default Catalog
