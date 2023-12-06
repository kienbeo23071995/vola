import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import cookie from 'react-cookies';
import { createContext, useReducer } from 'react';
import MyUserReducer from 'reducers/MyUserReducer';
export const MyUserContext = createContext();

function App() {
  const [user, dispatch] = useReducer(
    MyUserReducer,
    cookie.load("user") || null
  );
  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <RouterProvider router={router} />
    </MyUserContext.Provider>
  );
}

export default App;
