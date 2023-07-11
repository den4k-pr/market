import { FC } from 'react'

import { ICartItem } from '@/types/cart.interface'

import { convertPrice } from '@/utils/convertPrice'


import CartActions from './cart-actions/CartActions'

const CartItem: FC<{ item: ICartItem }> = ({ item }) => {
	return (
		<div className='item'>
			<img
				className='item-img'
				src={item.product.images[0]}
				alt={item.product.name}
			/>
			<div className='item__info'>
				<div className='item__info-name'>{item.product.name}</div>
				<div className='item__info-price'>{convertPrice(item.product.price)}</div>

				<CartActions item={item} />
			</div>
		</div>
	)
}

export default CartItem
