

export const Footer = () => {

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
    };

    
    return(
        <footer className="footer">
            <div className="container">
                <p className="footer__text">Copyright &copy; 2023 STAR PASS | All Rights Reserved.</p>
                <button onClick={scrollToTop}></button>
            </div>
        </footer>
    )
}