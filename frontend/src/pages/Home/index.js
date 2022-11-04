
import { Add, Chat, Home, Notifications, Person } from '@mui/icons-material';
import { useEffect } from 'react';
import './Home.css';
import MenuContainer from "./MenuContainer";
import Pin from './Pin';


function App() {

  useEffect(()=> {
    const allIcon = document.querySelectorAll(".iconContainer");
   
    function setMenuActive(){
     allIcon.forEach((n)=> n.classList.remove("active"));
     this.classList.add("active");
    }

    allIcon.forEach(n => n.addEventListener('click', setMenuActive));
  }, []);

  return (
    <div className="App">
      <div className="menuContainer">
        <div className="subMenu">
          <div>
          <MenuContainer icon={<Home />}/>
          <MenuContainer icon={<Add />}/>
          </div>
          <div>
          <MenuContainer icon={<Notifications />}/>
          <MenuContainer icon={<Chat />}/>
          <MenuContainer icon={<Person />}/>
          </div>
        </div>
      </div>

      <main>
        
        <div className="mainContainer">

          <Pin pinSize = {'small'} />
          <Pin pinSize = {'medium'} />
          <Pin pinSize = {'large'} />
          <Pin pinSize = {'small'} />
          <Pin pinSize = {'medium'} />
          <Pin pinSize = {'large'} />
          <Pin pinSize = {'small'} />
          <Pin pinSize = {'medium'} />
          <Pin pinSize = {'large'} />
          <Pin pinSize = {'small'} />
          <Pin pinSize = {'medium'} />
          <Pin pinSize = {'large'} />
          <Pin pinSize = {'small'} />
          <Pin pinSize = {'medium'} />
          <Pin pinSize = {'large'} />
          <Pin pinSize = {'small'} />
          <Pin pinSize = {'medium'} />
          <Pin pinSize = {'large'} />
          <Pin pinSize = {'small'} />
          <Pin pinSize = {'medium'} />
          <Pin pinSize = {'large'} />

        </div>
      </main>
    </div>
  );
}

export default App;
