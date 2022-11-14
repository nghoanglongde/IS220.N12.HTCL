import Header from "./Header";
import styles from './DefaultLayout.css';

function DefaultLayout({children}) {
    return (
        <div className="WrapperContain">
            <Header/>    
            <div className="containerPage">
                
                 <div className="contentPage">  {children} </div>
            </div>  
        </div>
    );
}

export default DefaultLayout;
