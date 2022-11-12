import styles from './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ImageData from '../../../../assets/images/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { ffaAngleDown} from '@fortawesome/free-solid-svg-icons';

import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; 
import { useEffect, useState } from "react";
import { WrapperPP as WrapperSearch } from '../../../Popper';
import SearchAccount from '../../../SearchAccount';








function Header() {

    const [searchResult, setSearchResult] =  useState([])
    useEffect(() => {
      setTimeout(() => {
        setSearchResult([1,2,3])
      },3000)
    },[])
    return (


    <header className='wrapperHeader'>
      <div className='innerHeader'>
        <div className='innerHeaderContainer'>
          <div className='buttonLogoHeader'>
            <div className='logoHeader'>
              
                <img src={ImageData[0]} alt="logotl" className='logotl'/>
                 
    
            </div>
            <div className='ContainerButtonHeader'>
              <button className="buttonHeader buttonHome">
                       <span> Home</span>
              </button>
            </div>
            <div className='ContainerButtonHeader'>
              <button className="buttonHeader buttonCreate">
    
                        <span>Create</span>
                        
              </button>
            </div>
          </div>
          <Tippy 
          interactive
          visible={searchResult.length > 0}
          render={attrs => (
           <WrapperSearch>
              <div className="searchResult" tabIndex="-1" {...attrs}>
                  <h4 className='searchTitle'>Account</h4>
                  <SearchAccount/>
                  <SearchAccount/>
                  <SearchAccount/>
              </div>     
           </WrapperSearch>
          )}
          >
            <div className='searchInnerHeader'>
            <div className='searchIconbox'><FontAwesomeIcon icon={faMagnifyingGlass} className='iconserch'/></div>
              <input placeholder="Search" spellCheck={false} />
  
            </div>

            
          </Tippy>
          <div className='actionsHeader'>
              <div className='ContainerButtonHeader'>
                <button className='buttonRightHeader'>
                <FontAwesomeIcon icon={faBell} className="ButtonNotificationIcon"/>
                </button>
              </div>
              
              <div className='ContainerButtonHeader'>
                <button className='buttonRightHeader'>
                <img src="https://i.pinimg.com/564x/84/f4/f4/84f4f42e07f9a7bcc3e18eeca0fef237.jpg"alt="avatar" className='avatarButtonHeader'/>
                </button>
              </div>
              <div className='ContainerButtonHeader'>
                              <button className='buttonRightHeader'>
                              <FontAwesomeIcon icon={faAngleDown} className="ButtonNotificationIcon"/>
                              </button>
                            </div>
          </div>

              
        </div>
          

      </div>
       

       

    </header>
    )  ;
    
    
    
    
}

export default Header;
