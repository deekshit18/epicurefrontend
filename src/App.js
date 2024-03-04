import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authntication from './components/Authntication';
import Home from './pages/Home';
import Addrecipe from './pages/Addrecipe';
import Items from './pages/Items';
import Profile from './pages/Profile';
import { isadmincontext, isauthtokencontext } from './context/Contextshare';
import { useContext } from 'react';
import Messenger from './pages/Messenger';
import Adminpage from './pages/Adminpage';
import Allprofiles from './pages/Allprofiles';
import Forgot from './pages/Forgot';
import Veg from './pages/Veg';
import Nonveg from './pages/Nonveg';

function App() {
  const {istokenres,setistokenres}=useContext(isauthtokencontext)
  const { isadminres, setisadminres } = useContext(isadmincontext);

  return (
    <div className="App">
<Routes>
  <Route path="/" element={  <Home/>
}></Route>
<Route path="/adminpro" element={isadminres?  <Allprofiles/>:<Home/>
}></Route>
  <Route path="/login" element={  <Authntication/>
}></Route>
  <Route path="/addrecipe" element={ istokenres?!isadminres? <Addrecipe/>:<Home/>:<Home/>
}></Route>
  {/* <Route path="/recipes" element={istokenres?  <Recipes/> : <Home/> */}
{/* }></Route> */}
  <Route path="/register" element={  <Authntication reg/>
}></Route>
<Route path="/items" element={istokenres?  <Items/>:<Home/>
}></Route><Route path="/vegitems" element={istokenres?  <Veg/>:<Home/>
}></Route><Route path="/nonvegitems" element={istokenres?  <Nonveg/>:<Home/>
}></Route>
<Route path="/profile" element={ istokenres?!isadminres? <Profile/>:<Home/>:<Home/>}></Route>
<Route path="/mesg" element={ istokenres? <Messenger/>:<Home/>}></Route>
<Route path="/forgot" element={istokenres?!isadminres?<Forgot/>:<Home/>:<Home/>}></Route>

{/* <Route path="/updaterec" element={  <Updaterec/>}></Route> */}

</Routes>

    </div>
  );
}

export default App;
