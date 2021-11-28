import '../styles/globals.css';
import '../public/css/variables.css';
import '../public/css/home.css';
import '../public/css/listings.css';


function MyApp({ Component, pageProps }) {
    return (
        <div className="home__content">
        <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
