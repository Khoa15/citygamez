import axios from "axios"
import { useCallback, useContext, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import AppContext from "./AppContext"
import Square from "./Place"
function Place(){
    const navigate = useNavigate()
    const {state} = useContext(AppContext)
    const [mapel, setMapel] = useState(null)
    const getData = useCallback(async()=>{
        try {
            const option = {
                method: 'get',
                url: state.server+'/api/place',
                headers:{
                    Authorization: state.token
                }
            }
            const response = await axios(option)
            setMapel(response.data.data.place)
            console.log(response.data.data.place)
        } catch (error) {
            console.log(error)
        }
    })
    useEffect(()=>{
        if(state.token === 'Bearer null'){
            navigate(`${state.client}/login`)
        }
    }, [state.token])
    useEffect(()=>{
        getData();
    }, [])
    return (
        <>
        {state.user && 
        (
            <div className="game">
                <div className="board">
                    <Square loops={100} />
                </div>
            </div>
        )}
        </>
    )
}

export default Place