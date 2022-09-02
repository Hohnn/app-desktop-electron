import React, {useState, useEffect} from 'react'
import './DronesList.scss'
import { Link } from 'react-router-dom'
import DroneCard from './DroneCard'
import PriamryButton from '../button/primaryButton'
import {baseUrl} from '../../utils/globalVariables'

const droneImage = async (id) => {
    fetch('https://skydrone-api.herokuapp.com/api/v1/images/' + id)
    .then(response => response.blob())
    .then(data => {
        const objectURL = URL.createObjectURL(data);
        return objectURL;
})}


export default function DroneList({style}) {
    const [drones, setDrones] = useState([])
    useEffect (() => {
        fetch('https://skydrone-api.herokuapp.com/api/v1/drones')
            .then(res => res.json())
            .then(data => {
                setDrones(data)
            })
    }, [])
   
    

  return (
    <div className='row g-3 droneList'>
        <div className='col-12'>
            <h2>Les drones</h2>
            <hr></hr>
        </div>
        {drones.map((drone, key) =>
        (
            < DroneCard drone={drone} key={key} style={style}/>
        ))}
        { style !== 'mini' ? 
        <div className='col-sm-12 col-md-6 col-xl-3 d-flex justify-content-center align-items-center'>
            <Link to={'../product/newDrone'} className="d-flex ">
                < PriamryButton type='button' id='addDrone' text='Ajouter un Drone' />
            </Link>
        </div>
        : null }
    </div>
  )
}
