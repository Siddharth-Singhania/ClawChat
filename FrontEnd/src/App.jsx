
import './App.css'
import Chat from './components/Chat/Chat.jsx'
import Detail from './components/Detail/Detail.jsx'
import List from './components/List/List.jsx'
import Login from './components/Login/Login.jsx'
import Notification from './components/Notification/Notification.jsx'
import { useAuthContext } from './context/AuthContext.jsx'


function App() {
  const {authUser} = useAuthContext();


  return (
    <>
    <div className='container'>
      {
        authUser ? (<>
        <List/>
        <Chat/>
        <Detail/></>):(<Login/>)
      }
      <Notification/>
    </div>
    </>
  )
}

export default App
