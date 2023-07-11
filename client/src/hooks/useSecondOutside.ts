import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

type TypeOut = {
	ref2: any
	isShow2: boolean
	setIsShow2: Dispatch<SetStateAction<boolean>>
}

export const useSecondOutside = (initialIsVisible: boolean): TypeOut => {
	const [isShow2, setIsShow2] = useState(initialIsVisible)
	const ref2 = useRef<HTMLElement>(null)

	const handleClickOutside = (event: any) => {
		if (ref2.current && !ref2.current.contains(event.target)) {
			setIsShow2(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)
		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	})
	return { ref2, isShow2, setIsShow2 }
}
