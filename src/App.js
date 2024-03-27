// import { BrowserRouter, Route, Routes} from 'react-router-dom';
// import './App.css';
// import User from './User';
// import Guard from './Guard';
// import LoginPage from './component/LoginPage';
// import { UserProvider } from './component/UserContext';


// function App() {
//   return (
//     <div className="App">
//    <UserProvider> 
//       <BrowserRouter>
//         <Routes>
//           <Route path='/' element={<LoginPage/>} />
//           {/* Guard */}
//           <Route path='/guard/*' element={<Guard />} />
//           {/* User */}
//           <Route path='/user/*' element={<User />} />
//           <Route path='*' element={<div>Page Not Found</div>} />
//         </Routes>
//       </BrowserRouter>
//       </UserProvider>
//     </div>
//   );
// }
// export default App;

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import User from './User';
import Guard from './Guard';
import LoginPage from './component/LoginPage';
import {  useUser } from './component/UserContext';
 // Assuming you have a UserContext with a useUser hook

function App() {
  const { user } = useUser(); // Assuming isLoggedIn state is provided by the UserContext

  return (
    <div className="App">
      
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <LoginPage />} />
            {/* Guard */}
            <Route path='/guard/*' element={user ? <Guard /> : <Navigate to="/" />} />
            {/* User */}
            <Route path='/user/*' element={user ? <User /> : <Navigate to="/" />} />
            <Route path='*' element={<div>Page Not Found</div>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
