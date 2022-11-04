import styles from './Header.css';
import SearchIcon from '@mui/icons-material/Search';

function Header() {
    return (


    <header className='wrapperHeader'>
        <div className="searchBox">
          <input type="text" placeholder="Search..." />
          <div className="search">
             <SearchIcon/>
          </div>
        </div>

       

    </header>
    )  ;
    
    
    
    
}

export default Header;
