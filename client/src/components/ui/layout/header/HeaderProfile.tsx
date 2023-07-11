import Image from 'next/image'
import { FC } from 'react'

import { useProfile } from '@/hooks/useProfile'

const HeaderProfile: FC = () => {
	const { profile } = useProfile()

	return (
		<div>
			{profile?.avatarPath && (
				<Image
					width={31}
					height={31}
					src='/images/profile.svg'
					alt='profile'
				/>
			)}
		</div>
	)
}

export default HeaderProfile
