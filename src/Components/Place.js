import mountain from '../assets/imgs/mountains.png'
import castle from '../assets/imgs/castle.png'
import factory from '../assets/imgs/factory_64.png'
import barracks from '../assets/imgs/military-barracks.png'
import mRank from '../assets/imgs/military-rank.png'
import mountain_lava from '../assets/imgs/lava.png'
import lake from '../assets/imgs/lake.png'
import ponds from '../assets/imgs/pond.png'
import gold_ore from '../assets/imgs/gold-ore.png'
import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import AppContext from './AppContext'
function Square(props){
  const {state, dispatch} = useContext(AppContext)
  let [places, setPlaces] = useState([])
  let idx = [null, null]
  const handleDragStart = (index) =>{
    idx[0] = index
  }
  const handleOnDragOver = index => {
    idx[1] = index
  };

  const handleOnDragEnd = async () => {
    const tmp = places[idx[0]]
    places[idx[0]] = places[idx[1]]
    places[idx[1]] = tmp
    console.log(places[idx[0]])
    idx = [null, null]
    await setPlaces(places)
    console.log(places)
  };
    const getData = async ()=>{
        try {
            const option = {
                method: 'get',
                headers:{
                    Authorization: state.token
                },
                url: state.server+'/api/place'
            }
            const response = await axios(option)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleClick = (i)=>{
      console.log(i)
    }
    let image = (name)=>{ return (name && <img src={name} className="ico" />)}
    return(
      <>
        {/* <button draggable onDragStart={()=>handleDragStart(0)} onDragEnd={handleOnDragEnd} onDragOver={()=>handleOnDragOver(0)} key={0} className="square" onClick={()=>handleClick(0)}>
          {image(factory)}
        </button> */}
        hi
      </>
    )
}

export default Square