import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authntication from './components/Authntication';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Addrecipe from './pages/Addrecipe';
import Items from './pages/Items';
import Profile from './pages/Profile';
import Updaterec from './pages/Updaterec';

function App() {
  return (
    <div className="App">
<Routes>
  <Route path="/" element={  <Home/>
}></Route>
  <Route path="/login" element={  <Authntication/>
}></Route>
  <Route path="/addrecipe" element={  <Addrecipe/>
}></Route>
  <Route path="/recipes" element={  <Recipes/>
}></Route>
  <Route path="/register" element={  <Authntication reg/>
}></Route>
<Route path="/items" element={  <Items/>
}></Route>
<Route path="/profile" element={  <Profile/>}></Route>
<Route path="/updaterec" element={  <Updaterec/>}></Route>

</Routes>

    </div>
  );
}

export default App;
