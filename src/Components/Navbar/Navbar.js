import BoltIcon from '@mui/icons-material/Bolt';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import DiamondIcon from '@mui/icons-material/Diamond';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import HexagonIcon from '@mui/icons-material/Hexagon';
import SaveIcon from '@mui/icons-material/Save';
import { Container } from "@mui/material"
import NavItem from './NavItem';
import React, {useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios'
import AppContext from '../AppContext';
function Navbar(props){
    const {state} = useContext(AppContext)
    const [onSave, setOnSave] = useState(false)
    const {resource} = props
    const handleSave = () =>{
        setOnSave(true)
    }
    const handleSaveResource = useCallback(async() => {
        try {
            const res = await axios({
                method: 'put',
                url: `${state.server}/api/place/user`,
                headers:{
                    Authorization: state.token
                },
                data: resource
            })
            console.log(res.data.data)
        } catch (error) {
            console.log(error)
        }
    })
    const keyBind= useCallback((e)=>{
        if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.keyCode == 83) {
            e.preventDefault();
            setOnSave(true)
        }
    })
    useEffect(()=>{
        if(onSave){
            handleSaveResource()
            setOnSave(false)
        }
        document.addEventListener("keydown", keyBind);
        return()=>document.removeEventListener("keydown", keyBind)
    }, [onSave])
    return(
        <div className="Navbar">
            {resource && (<Container className="navbar-brand">
                <NavItem ico={<BoltIcon />} value={resource.energy} title="Energy"/>
                <NavItem ico={<RiceBowlIcon />} value={resource.food} title="Food" />
                <NavItem ico={<PersonIcon />} value={resource.labor} title="Labor" />
                <NavItem ico={<HexagonIcon />} value={resource.gold} title="Gold" />
                <NavItem ico={<DiamondIcon />} value={resource.gem} title="Gem" />
                <NavItem ico={<GroupsIcon />} value={resource.army} title="Army" />
                <NavItem ico={<SaveIcon />} title="Save" save={handleSave} class="pointer" />
            </Container>)}
        </div>
    )
}

export default Navbar