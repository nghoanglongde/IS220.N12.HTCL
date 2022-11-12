import Header from './Header'
import styles from './Mainpage.css';


function HeaderMainpage({children}) {
    return (
        <div>
 
            <div className="containerMainPage">
                
                 <div className="contentMainPage">{children}</div>
            </div>  
        </div>
    );
}

export default HeaderMainpage;