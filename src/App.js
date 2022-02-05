import './style.css'
import Board from './Components/Board'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { useCallback, useEffect, useReducer } from 'react'
import AppReducer from './Reducer/Reducer'
import axios from 'axios'
import Login from './Components/Login'
import Register from './Components/Register'
import AppContext from './Components/AppContext'
function App() {
  window.addEventListener("beforeunload", (ev) => 
  {  
      ev.preventDefault();
      return ev.returnValue;
  });
  const initialState = {user: null, place: null, client:'', server:'http://localhost:5000', token: `Bearer `+localStorage.getItem('token')}
  const [state, dispatch] = useReducer(AppReducer, initialState)
  const checkCurrentUser = useCallback(async()=>{
    try {
      const option = {
        method: 'get',
        url: state.server+'/api/auth/',
        headers:{
          Authorization: state.token
        },
      }
      const response = await axios(option)
      if(response.data.data.user){
        const {name, permission, _id} = response.data.data.user
        dispatch({type: "CURRENT_USER", payload: {name, permission, _id}})
      }else{
      }
    } catch (error) {
      console.log(error)
    }
  })
  useEffect(()=>{
    checkCurrentUser()
  }, [state.token])
  return (
    <BrowserRouter>
      <AppContext.Provider value={{state, dispatch}}>
        <Routes>
          <Route exact path={`${state.client}/`} element={<Login />} />
          <Route exact path={`${state.client}/game`} element={<Board />} />
          <Route exact path={`${state.client}/register`} element={<Register />} />
          <Route exact path='/*'/>
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
