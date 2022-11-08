import Header from './Header'


function HeaderMainpage({children}) {
    return (
        <div>
 
            <div className="container">
                
                 <div className="content">{children}</div>
            </div>  
        </div>
    );
}

export default HeaderMainpage;