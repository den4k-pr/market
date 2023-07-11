import { FC } from 'react'
import { IconType } from 'react-icons'

interface ISquareButton {
	Icon: IconType
	onClick?: () => void
	number?: number
}

const SquareButton: FC<ISquareButton> = ({ Icon, onClick, number }) => {
	return (
		<button
			onClick={onClick}
			className='busket'
		>
			{!!number && (
				<span className='busket-number'>
					{number}
				</span>
			)}
			<Icon size={26} />
		</button>
	)
}

export default SquareButton
