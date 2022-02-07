import mountain from '../assets/imgs/mountains.png'
import castle from '../assets/imgs/castle.png'
import factory from '../assets/imgs/factory_64.png'
import barracks from '../assets/imgs/military-barracks.png'
import mRank from '../assets/imgs/military-rank.png'
import treasure from '../assets/imgs/treasure.png'
import mountain_lava from '../assets/imgs/lava.png'
import trash from '../assets/imgs/trash.png'
import lake from '../assets/imgs/lake.png'
import ponds from '../assets/imgs/pond.png'
import gold_ore from '../assets/imgs/gold-ore.png'
import {useEffect, useState} from 'react'
import { CardMedia } from '@mui/material'
export default function TypeImage(props){
    const [name, setName] = useState()
    useEffect(()=>{
        switch (props.type) {
            case 1:
                setName(ponds)
                break;
            case 2:
                setName(gold_ore)
                break;
            case 3:
                setName(factory)
                break;
            case 4:
                setName(lake)
                break;
            case 5:
                setName(mountain_lava)
                break;
            case 6:
                setName(barracks)
                break;
            case 7:
                setName(trash)
                break;
            case 8:
                setName(treasure)
                break;
            case 9:
                setName(castle)
                break;
            case 10:
                setName(null)
                break;

            default:
                setName(null)
                break;
        }
    }, [])
    if(props.typeObj===2){
        return <CardMedia image={name} component="img" />
    }else{
        return <img src={name} className="ico" />
    }
}