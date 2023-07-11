import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'

import { TypePaginationProducts } from '@/types/product.interface'

import Loader from '../Loader'

import SortDropdown from './SortDropdown'
import ProductItem from './product-item/ProductItem'
import { ProductService } from '@/services/product/product.service'
import { EnumProductSort } from '@/services/product/product.types'
import Sidebar from '../layout/sidebar/Sidebar'
import Heading from '../Heading'
import Search from '../layout/header/Search'

interface ICatalogPagination {
	data: TypePaginationProducts
	title?: string
}

const CatalogPagination: FC<ICatalogPagination> = ({ data, title }) => {
	const [page, setPage] = useState(1)

	const [sortType, setSortType] = useState<EnumProductSort>(
		EnumProductSort.NEWEST
	)

	const { data: response, isLoading } = useQuery(
		['products', sortType, page],
		() =>
			ProductService.getAll({
				page,
				perPage: 6,
				sort: sortType
			}),
		{
			initialData: data,
			keepPreviousData: true
		}
	)

	if (isLoading) return <Loader />

	return (
		<section className='catalog'>
			<div className="container">
				<div className='catalog__left'>
					<Heading>{title}</Heading>
					<Sidebar />
				</div>
				<div className='catalog__right'>
					<SortDropdown sortType={sortType} setSortType={setSortType} />
					<Search />
					{response.products.length ? (
						<>
							<div className='catalog__products'>
								{response.products.map(product => (
									<ProductItem key={product.id} product={product} />
								))}
							</div>
							<div style={{paddingBottom: '50px', gap: '20px', display: 'flex', justifyContent: 'center'}}>
								{Array.from({ length: response.length / 6 }).map((_, index) => {
									const pageNumber = index + 1
									return (
										<button onClick={() => setPage(pageNumber)} className='button'>{pageNumber}</button>
									)
								})}
							</div>
						</>
					) : (
						<div className='emptyProducts'>There are no products</div>
					)}
				</div>
			</div>
		</section>
	)
}

export default CatalogPagination
