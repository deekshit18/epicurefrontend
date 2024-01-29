import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authntication from './components/Authntication';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Addrecipe from './pages/Addrecipe';
import Items from './pages/Items';
import Profile from './pages/Profile';
import Updaterec from './pages/Updaterec';
import { isauthtokencontext } from './context/Contextshare';
import { useContext } from 'react';
import Messenger from './pages/Messenger';
import Adminpage from './pages/Adminpage';
import Allprofiles from './pages/Allprofiles';
import Forgot from './pages/Forgot';

function App() {
  const {istokenres,setistokenres}=useContext(isauthtokencontext)

  return (
    <div className="App">
<Routes>
  <Route path="/" element={  <Home/>
}></Route>
<Route path="/adminpro" element={  <Allprofiles/>
}></Route>
  <Route path="/login" element={  <Authntication/>
}></Route>
  <Route path="/addrecipe" element={ istokenres? <Addrecipe/>:<Home/>
}></Route>
  {/* <Route path="/recipes" element={istokenres?  <Recipes/> : <Home/> */}
{/* }></Route> */}
  <Route path="/register" element={  <Authntication reg/>
}></Route>
<Route path="/items" element={istokenres?  <Items/>:<Home/>
}></Route>
<Route path="/profile" element={ istokenres? <Profile/>:<Home/>}></Route>
<Route path="/mesg" element={ istokenres? <Messenger/>:<Home/>}></Route>
<Route path="/forgot" element={<Forgot/>}></Route>

{/* <Route path="/updaterec" element={  <Updaterec/>}></Route> */}

</Routes>

    </div>
  );
}

export default App;
