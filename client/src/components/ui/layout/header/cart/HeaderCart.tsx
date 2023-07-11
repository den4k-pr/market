import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { RiShoppingCartLine } from 'react-icons/ri'

import SquareButton from '@/ui/button/SquareButton'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import { convertPrice } from '@/utils/convertPrice'

import CartItem from './cart-item/CartItem'
import { OrderService } from '@/services/order.service'
import { useOutside } from '@/hooks/useOutside'
import { FC } from 'react'
import { useSecondOutside } from '@/hooks/useSecondOutside'
import { SendEmail } from '@/screens/sendCart/SendCurt'

const Cart: FC = () => {
  	const { ref, isShow, setIsShow } = useOutside(false)
	const { ref2, isShow2, setIsShow2 } = useSecondOutside(false)

	console.log(isShow2)

	const { items, total } = useCart()

	const { reset } = useActions()

	const { push } = useRouter()

	const { mutate } = useMutation(
		['create order and payment'],
		() =>
			OrderService.place({
				items: items.map(item => ({
					price: item.price,
					quantity: item.quantity,
					productId: item.product.id
				}))
			}),
		{
			onSuccess({ data }) {
				push(data.confirmation.confirmation_url).then(() => reset())
			}
		}
	)

	return (
		<section ref={ref} className='cart'>
			<SquareButton
				Icon={RiShoppingCartLine}
				onClick={() => setIsShow(!isShow)}
				number={items.length}
			/>

			<div style={{opacity: isShow === true ? '1' : '0', visibility: isShow === true ? 'visible' : 'hidden', transform: isShow === true ? 'translateX(0)' : 'translateX(100%)'}} className='cart__content'>
				<h3 className='cart__content-title'>My cart</h3>

				<div className='cart__content-list'>
					{items.length ? (
						items.map(item => <CartItem item={item} key={item.id} />)
					) : (
						<div className='cart__content-list_message'>Cart is empty!</div>
					)}
				</div>
				<div className='cart__content-info'>
					<div className='cart__content-info_title'>Total:</div>
					<div className='cart__content-info_total'>{convertPrice(total)}</div>
				</div>
				<div>
					<SendEmail setIsShow2={setIsShow2} ref2={ref2} activeClass={isShow2 === true ? 'activeAuth' : ''} />
					<button ref={ref2} onClick={() => setIsShow2(!isShow2)} className='button'>
						Place order
					</button>
				</div>
			</div>
		</section>
	)
}

export default Cart
