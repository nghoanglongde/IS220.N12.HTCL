
import { faMagnifyingGlass, faSpinner,faCircleXmark, faBell } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; 
import { WrapperPP as WrapperSearch } from '../../../Popper';
import SearchTitle from '../../../SearchTitle';
import SearchPage from '../../../../pages/SearchPage';
import { useEffect, useState , useRef} from "react";
import styles from '../../DefaultLayout/Header/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {useDebounce} from '../../../../hooks';
import { useHref, useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';




function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] =  useState([]);
    const [showResult, setshowResult] = useState(true);
    const debounce = useDebounce(searchValue, 400);
    const navigate = useNavigate();
    

    const inputRef= useRef()
    useEffect(()=>{
      if(!searchValue.trim()){
       setSearchResult([]);
        return;
      }
      const resData = async () => {
        const response = await axios.post('http://localhost:5000/post/post-search' ,{search_content:debounce});
        console.log(response)
       
        setSearchResult(response.data.message)
        
    }
    resData();
    },[debounce])
      const handleHideResult = ()  => {
            setshowResult(false)
      }
      const handleChange = (e) =>{
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ') ) {
         setSearchValue(searchValue) ;
        }
        
      }
      const searchKeyDown = (e) =>{
          if (e.key ==="Enter"){
            navigate(`/search/${searchValue}`)          
          }
      };
  
    return ( 

       <div>
          <Tippy  
          interactive
          
          visible={showResult && searchResult.length > 0}
          render={attrs => (
           <WrapperSearch>
              <div className="searchResult" tabIndex="-1" {...attrs}>
                 
                  { searchResult.map((result) => (
                    <SearchTitle key={result.post_id} data={result} />
                  ))
                    
                  }

              </div>    
            
           </WrapperSearch>
          )}
          onClickOutside={handleHideResult}
          >
            <div className='searchInnerHeader'>
            <div className='searchIconbox'><FontAwesomeIcon icon={faMagnifyingGlass} className='iconserch'/></div>
              <input 
              ref={inputRef}
              value={searchValue}
              placeholder="Search" 
              spellCheck={false}
               onChange={handleChange }
               onFocus={() => setshowResult(true)} 
               onKeyDown={searchKeyDown}
              
               />
              {!!searchValue &&  (
              <button className='clearBtn' 
                  onClick={()=> {setSearchValue('');
                  setSearchResult([]);
                  inputRef.current.focus();
                  
              
                  }}>
              <FontAwesomeIcon icon={faCircleXmark} className='iconserch'/>
              </button>
              )}
             
              
              
  
              
  
            </div>
  
            
          </Tippy>

       </div> 

    );
}

export default Search;