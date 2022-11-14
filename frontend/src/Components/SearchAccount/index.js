import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SearchAccount.css';
import { faMagnifyingGlass,faCircleCheck } from '@fortawesome/free-solid-svg-icons';



function SearchAccount() {
    return (
        <div className='wrapperSearchAccount'>
            <img src='https://i.pinimg.com/474x/3a/1a/f0/3a1af036c33cf8815e98e4b78020b22c.jpg' alt='avatar account' className='avatarSearchAccount' />
            <div className='infoAccount'>
                <h4 className='nameAccount'>
                    <span>Bui Ngoc Thanh</span>
                     <FontAwesomeIcon icon={faCircleCheck } className='checkAccount'/>
                    </h4>
                    
                   

                <span className='userNameSA'>BNT</span>
                {/* <FontAwesomeIcon icon={faMagnifyingGlass} className=''/> */}
                
            </div>
        </div>
      );
}

export default SearchAccount;