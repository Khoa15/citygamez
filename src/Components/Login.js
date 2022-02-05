import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import AppContext from './AppContext'
export default function Login(){
    const navigate = useNavigate()
    const [userInput, setUserInput] = useState({email:'', password:''})
    const [errorMessage, setErrorMessage] = useState(null)
    const {state} = useContext(AppContext)
    const handleChangeInput = (e)=>{
        setUserInput({...userInput, [e.target.name]:e.target.value})
    }
    const handleSubmitLogin = async (e)=>{
        e.preventDefault()
        document.getElementById("btnSubmit").disabled = true
        try {
            const option = {
                url: state.server+'/api/auth/login',
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
    const handleDirectSignUp = ()=>{
        navigate(`${state.client}/register`)
    }
    useEffect(()=>{
        document.title = "Login"
        if(state.user){
            navigate(`${state.client}/board`)
        }
    }, [])
    return (
        <div style={{margin:'auto',display: "table", marginTop: '50px'}}>
            <form onSubmit={handleSubmitLogin}>
                {errorMessage && <p style={{color: '#e74c3c'}}>{errorMessage}</p>}
                <input type="email" name="email" required placeholder="Email" onChange={handleChangeInput} style={{display:'block', marginTop:'10px',padding: '10px'}} />
                <input type="password" name="password" required placeholder="Password" onChange={handleChangeInput} style={{display:'block', marginTop:'10px',padding: '10px'}} />
                <a href="#" onClick={handleDirectSignUp} style={{display:'block',marginTop:'10px', textDecoration: 'none', color:'#bdc3c7', fontSize: '13px'}}>Don't have an account? Sign Up</a>
                <input type="submit" id="btnSubmit" value="Submit" style={{display:'block', marginTop:'10px', padding: '10px'}}/>
            </form>
        </div>
    )
}