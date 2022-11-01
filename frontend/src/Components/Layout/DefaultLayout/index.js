import Header from "./Header";
import styles from './DefaultLayout.css';

function DefaultLayout({children}) {
    return (
        <div className="wrapperContain">
            <Header/>    
            <div className="container">
            </div>  
        </div>
    );
}

export default DefaultLayout;
