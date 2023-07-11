import { Dispatch, FC, SetStateAction } from 'react'

import { EnumProductSort } from '@/services/product/product.types'

interface ISortDropdown {
  sortType: EnumProductSort
  setSortType: Dispatch<SetStateAction<EnumProductSort>>
}

const SortDropdown: FC<ISortDropdown> = ({ setSortType, sortType }) => {
  const sortOptions = Object.values(EnumProductSort)

  return (
    <div className='sortDropdown'>
      <ul className='sortDropdown-list'>
        {sortOptions.map(option => (
          <li
            key={option}
            className={`sortDropdown-list-item ${
              sortType === option ? 'active' : ''
            }`}
            onClick={() => setSortType(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SortDropdown
