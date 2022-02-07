import BoltIcon from '@mui/icons-material/Bolt';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import DiamondIcon from '@mui/icons-material/Diamond';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import HexagonIcon from '@mui/icons-material/Hexagon';
import { Container } from "@mui/material"
import NavItem from './NavItem';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext';

function Navbar(props){
    const {resource} = props
    return(
        <div className="Navbar">
            {resource && (<Container className="navbar-brand">
                <NavItem ico={<BoltIcon />} value={resource.energy} title="Energy"/>
                <NavItem ico={<RiceBowlIcon />} value={resource.food} title="Food" />
                <NavItem ico={<PersonIcon />} value={resource.labor} title="Labor" />
                <NavItem ico={<HexagonIcon />} value={resource.gold} title="Gold" />
                <NavItem ico={<DiamondIcon />} value={resource.gem} title="Gem" />
                <NavItem ico={<GroupsIcon />} value={resource.army} title="Army" />
            </Container>)}
        </div>
    )
}

export default Navbar