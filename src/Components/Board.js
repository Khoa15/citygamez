import axios from "axios"
import { useCallback, useContext, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import {DragDropContext,Droppable,Draggable  } from 'react-beautiful-dnd'
import AppContext from "./AppContext"
import TypeImage from "./TypeImage"
import InfoPlace from "./Place/InfoPlace"
import AddIcon from '@mui/icons-material/Add';
import BoltIcon from '@mui/icons-material/Bolt';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import DiamondIcon from '@mui/icons-material/Diamond';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import HexagonIcon from '@mui/icons-material/Hexagon';
import { Container } from "@mui/material"
function Place(){
    const navigate = useNavigate()
    const {state} = useContext(AppContext)
    const [mapel, setMapel] = useState([])
    const [place, setPlace] = useState([])
    const [open, setOpen] = useState(false)
    const handleOpenDialog = (index)=>{
        setPlace(mapel[index])
        setOpen(true)
    }
    const handleCloseDialog = ()=>{
        setOpen(false)
    }
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
            <>
                <div className="Navbar">
                    <Container className="navbar-brand">
                        <div className="nav-item">
                            <BoltIcon />
                            999.999.999
                        </div>
                        <div className="nav-item">
                            <RiceBowlIcon />
                            999.999.999
                        </div>
                        <div className="nav-item">
                            <DiamondIcon />
                            999.999.999
                        </div>
                        <div className="nav-item">
                            <PersonIcon />
                            999.999.999
                        </div>
                        <div className="nav-item">
                            <GroupsIcon />
                            999.999.999
                        </div>
                        <div className="nav-item">
                            <HexagonIcon />
                            999.999.999
                        </div>
                        
                        
                    </Container>
                </div>
                <div className="game">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable" >
                            {(provided)=>(
                                <div className="board" {...provided.droppableProps} ref={provided.innerRef}>
                                    {mapel.map((m, i)=>{
                                        if(m.resource.typeObject) return (
                                        <Draggable key={m._id} draggableId={m._id} index={i}>
                                            {(provided)=>(
                                            <div onClick={()=>handleOpenDialog(i)} className="square" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                {m.resource && <TypeImage type={m.resource.typeObject} />}
                                            </div>
                                            )}
                                        </Draggable>)
                                    })}
                                {provided.placeholder}
                                    <button className="square">
                                        <AddIcon style={{color: 'white'}} className="ico" />
                                    </button>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <InfoPlace open={open} close={handleCloseDialog} info={place} />
                </div>
            </>
        )}
        </>
    )
}

export default Place