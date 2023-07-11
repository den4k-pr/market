import { FC, PropsWithChildren, useEffect, useState } from 'react'

import Header from './header/Header'
import { Footer } from './footer/Footer';
import { gsap } from 'gsap';


const Layout: FC<PropsWithChildren> = ({ children }) => {
	const [isSmallScreen, setIsSmallScreen] = useState(false);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const tl = gsap.timeline();

		const loadingTimeout = setTimeout(() => {
		setLoading(false);
		tl.to('.loading-page', {
			opacity: 0,
			duration: 1.5,
			display: 'none',
		}).fromTo(
			'.logo-name',
			{
			y: 50,
			opacity: 0,
			},
			{
			y: 0,
			opacity: 1,
			duration: 2,
			delay: 0.5,
			}
		);
		}, 3000);

		return () => clearTimeout(loadingTimeout);
	}, []);

	useEffect(() => {
		
		if(window.innerWidth <= 1000) {
			setIsSmallScreen(true)
		} else {
			setIsSmallScreen(false)
		}

		console.log(isSmallScreen)
	}, []);

	return (
		<>
			{
				loading === true ? 
					<section className='loader'>
						<nav className='loader-spiner'></nav>
			  		</section>
				 : 
				<>
					<Header />
						<main>{children}</main>
					<Footer />
				</>
			}
		</>
	)
}

export default Layout
