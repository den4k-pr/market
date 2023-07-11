import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FC, useEffect, useRef, useState } from 'react'

import Loader from '@/ui/Loader'

import { CategoryService } from '@/services/category.service'

const Sidebar: FC = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null)

  const { data, isLoading } = useQuery(
    ['get categories'],
    () => CategoryService.getAll(),
    {
      select: ({ data }) => data
    }
  )

  const router = useRouter()

  useEffect(() => {
    if (activeButton) {
      const timeout = setTimeout(() => {
        setActiveButton(null)
      }, 600)

      return () => clearTimeout(timeout)
    }
  }, [activeButton])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : data ? (
        <div className='categories'>
          <ul className='categories__list'>
            {data.map(category => (
              <li key={category.id}>
                <button
                  className={`categories__list-category ${activeButton === category.slug ? 'active' : ''}`}
                  onClick={() => (router.push(`/category/${category.slug}`), setActiveButton(category.slug))}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className='categories-message'>Categories not found!</div>
      )}
    </>
  )
}

export default Sidebar
