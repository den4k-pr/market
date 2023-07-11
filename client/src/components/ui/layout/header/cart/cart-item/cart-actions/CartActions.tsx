import { FC } from 'react'
import { FiMinus, FiPlus, FiTrash } from 'react-icons/fi'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import { ICartItem } from '@/types/cart.interface'

const CartActions: FC<{ item: ICartItem }> = ({ item }) => {
	const { removeFromCart, changeQuantity } = useActions()

	const { items } = useCart()
	const quantity = items.find(cartItem => cartItem.id === item.id)?.quantity

	return (
		<div className='navigation'>
			<button
				className='navigationButton'
				onClick={() => changeQuantity({ id: item.id, type: 'minus' })}
				disabled={quantity === 1}
			>
				-
			</button>

			<input
				style={{opacity: '0', visibility: 'hidden'}}
				disabled
				readOnly
				value={quantity}
			/>

			<button className='navigationButton' onClick={() => changeQuantity({ id: item.id, type: 'plus' })}>
				+
			</button>

			<button
				onClick={() => removeFromCart({ id: item.id })}
				className='navigationCleen'
			>
				<FiTrash />
			</button>
		</div>
	)
}

export default CartActions
