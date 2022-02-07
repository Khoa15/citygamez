import axios from "axios"
import { useCallback, useContext, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import AppContext from "./AppContext"
import TypeImage from "./TypeImage"
import InfoPlace from "./Place/InfoPlace"
import AddIcon from '@mui/icons-material/Add';
import Navbar from "./Navbar/Navbar"
import NewPlace from "./Place/NewPlace"
import dataPlace from "./Place/places.json"
import bcryptjs, { hash } from 'bcryptjs'
function Place(){
    const navigate = useNavigate()
    const {state} = useContext(AppContext)
    const [resource, setResource] = useState({})
    const [clicked, setClicked] = useState(false)
    const [mapel, setMapel] = useState([])
    const [place, setPlace] = useState([])
    const [index, setIndex] = useState(null)
    const [open, setOpen] = useState(false)
    const [openNewPlace, setOpenNewPlace] = useState(false)
    const handleOpenDialog = (index)=>{
        setPlace(mapel[index])
        setIndex(index)
        setOpen(true)
    }
    const handleOpenDialogNewPlace = ()=>{
        setOpenNewPlace(true)
    }
    const handleCloseDialogNewPlace = ()=>{
        setOpenNewPlace(false)
    }
    const handleCloseDialog = ()=>{
        setOpen(false)
    }
    const handleUpLevel = () =>{
        setClicked(true)
    }
    const handleInUpLevel = () => {
        setClicked(false)
    }
    const handleNewPlace = (i) =>{
        const placeAdded = dataPlace.filter(r=>r.id===i)[0],
        index = mapel.filter(r=>r.position.mapel===0).length
        hash(mapel[mapel.length-1]._id, 1).then((res)=>{
            const newPlace = {...placeAdded,_id:res, position:{mapel:0, pos: index}, resource:{...placeAdded.resource, typeObject: i}}
            setMapel([...mapel, newPlace])
            axios({
                method:'',
                url:`${state.server}/`,
                headers:{
                    Authorization: state.token
                },
                data: newPlace
            })
        })
    }
    useEffect(()=>{
        if(clicked){
            const interval = setInterval(()=>{
                setPlace({...place, level: place.level+1, resource:{...place.resource, coefficient: place.resource.coefficient+0.1}})
                
                    let items = [...mapel]
                    let item = {...items[index]}
                    item = place
                    items[index] = item
                    setMapel(items)
            }, 100)
            return () => clearInterval(interval)
        }
    })
    const onDragEnd = (result)=>{
        if (!result.destination) return;
        const items = Array.from(mapel)
        const [reorderItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderItem)
        setMapel(items)
        axios({
            method:'post',
            url:`${state.server}/api/place/user`,
            headers:{
                Authorization: state.token
            },
            data:{
                id: result.draggableId,
                npos: result.destination.index,
                opos: result.source.index
            }
        })
    }
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
            const data = response.data.data.place
            setMapel(data)
            setResource(data[0].resource)
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
    useEffect(()=>{
        if(mapel.length>0){
            const interval = setInterval(()=>{
                
                mapel.map((r, i)=>{
                    if(!r.position.mapel){
                            setResource(resource=>({...resource, 
                                energy: (resource.energy + r.resource.energy*(1+r.resource.coefficient)),
                                food: (resource.food + r.resource.food*(1+r.resource.coefficient)),
                                labor: (resource.labor + r.resource.labor*(1+r.resource.coefficient)),
                                gold: (resource.gold + r.resource.gold*(1+r.resource.coefficient)),
                                gem: (resource.gem + r.resource.gem*(1+r.resource.coefficient)),
                                army: (resource.army + r.resource.army*(1+r.resource.coefficient)) 
                            }))
                        }
                    })
                // fetch.map(r=>setResource(r))
            }, 1000)
            return ()=>clearInterval(interval)
        }
    }, [mapel])
    return (
        <>
        {state.user && 
        (
            <>
                <Navbar data={mapel} resource={resource} />
                <div className="game">
                                <div className="board">
                                    {mapel.map((m, i)=>{
                                        if(m.resource.typeObject) return (
                                            <div key={m._id} onClick={()=>handleOpenDialog(i)} className="square">
                                                {m.resource && <TypeImage type={m.resource.typeObject} />}
                                            </div>
                                        )
                                    })}
                                    <button className="square" onClick={handleOpenDialogNewPlace}>
                                        <AddIcon style={{color: 'white'}} className="ico" />
                                    </button>
                                </div>
                            
                    <InfoPlace open={open} close={handleCloseDialog} info={place} upLevel={handleUpLevel} inUpLevel={handleInUpLevel} />
                    <NewPlace open={openNewPlace} close={handleCloseDialogNewPlace} clickBuy={handleNewPlace} />
                </div>
            </>
        )}
        </>
    )
}

export default Place