import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'

import HeaderProfile from './HeaderProfile'
import HeaderCart from './cart/HeaderCart'
import { useProfile } from '@/hooks/useProfile'
import { useActions } from '@/hooks/useActions'
import { useRouter } from 'next/router'
import { FiLogIn, FiLogOut } from 'react-icons/fi'

const Header: FC = () => {
	const { profile } = useProfile()
	const { logout } = useActions()

	const router = useRouter();

	const clickReload = () => {
		router.reload()
	}

	return (
		<header className='header'>
			<div className="header__top">
				<Link href='/'>
					<h2 className='header__top__logo'>• Market •</h2>
				</Link>
				<div className='header__top__icons'>
					<div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
						<Link href='/favorites'>
							<AiOutlineHeart fill='#ffdd00' size={28} />
						</Link>
						<HeaderCart />
					</div>
					{profile && <HeaderProfile />}
					{profile ?
						<div className='header__top-auth'>
							
							<button className='header__top-auth_link'
								onClick={() => (logout(), clickReload())}
							>
								<FiLogOut />
								<span>Logout</span>
							</button>
						</div> 
						: 
						<>
							<Link href='/auth' className='header__top-auth_link'>
								<FiLogIn />
								<span>Login</span>
							</Link>
						</>
					}
				</div>
			</div>
			<div className="header__bottom">
				<div className="header__bottom-Container">
					<ul className='header__bottom-Container__list'>
						<li>
							<Link className='header__bottom-Container__list-link' href='/'>
								Catalog
							</Link>
						</li>
						<li>
							<Link className='header__bottom-Container__list-link' href='/about'>
								About us
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</header>
	)
}

export default Header
