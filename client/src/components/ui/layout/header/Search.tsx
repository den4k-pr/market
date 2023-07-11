import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { BsSearch } from 'react-icons/bs'

const Search: FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>('')

	const { push } = useRouter()

	return (
		<div>
			<div
				className='search'
			>
				<input
					className='search__input'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					placeholder='Search...'
				/>
				<button
					onClick={() => push(`/q?term=${searchTerm}`)}
					className='search__button'
				>
					<BsSearch fill='#fff' />
				</button>
			</div>
		</div>
	)
}

export default Search
