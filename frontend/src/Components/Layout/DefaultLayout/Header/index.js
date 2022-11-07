import styles from './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ImageData from '../../../../assets/images/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';




function Header() {
    return (


    <header className='wrapperHeader'>
      <div className='innerHeader'>
        <div className='innerHeaderContainer'>
          <div className='buttonLogoHeader'>
            <div className='logoHeader'>
              
                <img src={ImageData[0]} alt="logotl" className='logotl'/>
                 
    
            </div>
            <button className="buttonHeader buttonHome">
                     <span> Home</span>
            </button>
            <button className="buttonHeader buttonHome">
                     <span> Today</span>
            </button>
            <button className="buttonHeader buttonCreate">
  
                      <span>Create</span>
                      <FontAwesomeIcon icon={faAngleDown} className="iconInButtonCreate"/>
                      
            </button>
          </div>
          <div className='searchInnerHeader'>
          <div className='searchIconbox'><FontAwesomeIcon icon={faMagnifyingGlass} className='iconserch'/></div>
            <input placeholder="Search" spellCheck={false} />

          </div>
          <div className='actionsHeader'>
            <button className='buttonNotification'>
            <FontAwesomeIcon icon={faAngleDown} className="iconInButtonCreate"/>
            </button>

          </div>

              
        </div>
          

      </div>
       

       

    </header>
    )  ;
    
    
    
    
}

export default Header;
