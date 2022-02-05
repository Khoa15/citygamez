import { useContext, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import AppContext from './AppContext'
import axios from 'axios'
export default function Login(){
    const [userInput, setUserInput] = useState({name: '',email: '',password:''})
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(null)
    const {state} = useContext(AppContext)
    const handleChangeInput = (e)=>{
        setUserInput({...userInput, [e.target.name]:e.target.value})
    }
    const handleSubmitRegister = async(e)=>{
        e.preventDefault()
        document.getElementById("btnSubmit").disabled = true
        try {
            const option = {
                url: state.server+'/api/auth/register',
                method: 'post',
                data: userInput
                
            }
            const response = await axios(option)
            if(response.data.success){
                localStorage.setItem('token', response.data.accessToken)
                navigate(`${state.client}/board`)
            }
        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
        document.getElementById("btnSubmit").disabled = false
    }
    const handleDirectSignIn = ()=>{
        navigate(`${state.client}/`)
    }
    useEffect(()=>{
        document.title = "Register"
    }, [])
    return (
        <div style={{margin:'auto',display: "table", marginTop: '50px'}}>
            <form onSubmit={handleSubmitRegister}>
                {errorMessage && <p style={{color: '#e74c3c'}}>{errorMessage}</p>}
                <input type="text" name="name" onChange={handleChangeInput} required placeholder="Username" style={{display:'block', marginTop:'10px',padding: '10px'}} />
                <input type="email" name="email" onChange={handleChangeInput} required placeholder="Email" style={{display:'block', marginTop:'10px',padding: '10px'}} />
                <input type="password" name="password" onChange={handleChangeInput} required placeholder="Password" style={{display:'block', marginTop:'10px',padding: '10px'}} />
                <a href="#" onClick={handleDirectSignIn} style={{display:'block',marginTop:'10px', textDecoration: 'none', color:'#bdc3c7', fontSize: '13px'}}>Already have an account? Sign In</a>
                <input type="submit" id="btnSubmit" value="Submit" style={{display:'block', marginTop:'10px', padding: '10px'}}/>
            </form>
        </div>
    )
}