import mountain from '../assets/imgs/mountains.png'
import castle from '../assets/imgs/castle.png'
import factory from '../assets/imgs/factory_64.png'
import barracks from '../assets/imgs/military-barracks.png'
import mRank from '../assets/imgs/military-rank.png'
import mountain_lava from '../assets/imgs/lava.png'
import lake from '../assets/imgs/lake.png'
import ponds from '../assets/imgs/pond.png'
import gold_ore from '../assets/imgs/gold-ore.png'
import {useEffect, useState} from 'react'
export default function TypeImage(props){
    const [name, setName] = useState()
    useEffect(()=>{
        switch (props.type) {
            case 1:
                setName(ponds)
                break;
        
            default:
                setName(castle)
                break;
        }
    }, [])
    return(
        <img src={name} className="ico" />
    )
}