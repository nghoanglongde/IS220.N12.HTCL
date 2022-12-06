import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SearchTitle.css';
import { faMagnifyingGlass,faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';



function SearchTitle({data}) {
    return (
        <Link to={`/search/${data.title}`} className='wrapperSearchAccount'>
          
            <div className='infoAccount'>
                <h4 className='nameAccount'>
                     <FontAwesomeIcon icon={faMagnifyingGlass} className='checkAccount'/>
                    {/* <FontAwesomeIcon icon={faCircleCheck } className='checkAccount'/> */}
                    <span>{data.title}</span>
                   
                     
                    </h4>
                    
                   

                
               
                
            </div>

        </Link>
      );
}

export default SearchTitle;