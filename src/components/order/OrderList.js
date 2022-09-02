import React, { useContext, useEffect, useState } from 'react'
import PriamryButton from '../button/primaryButton'
import { UserContext } from '../user/UserContext'
import OrderCard from './OrderCard'
import './OrderList.scss'

const droneImage = async (id) => {
    fetch('https://skydrone-api.herokuapp.com/api/v1/images/' + id)
    .then(response => response.blob())
    .then(data => {
        const objectURL = URL.createObjectURL(data)
        return objectURL
})}


export default function OrderList() {
    const [orders, setOrders] = useState([])
    const {user} = useContext(UserContext)
    useEffect (() => {
        fetch('https://skydrone-api.herokuapp.com/api/v1/orders', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
        })
            .then(res => res.json())
            .then(data => {
                setOrders(data.reverse())
            })
    }, [])

  return (
    <div className='row g-3 orderList'>
        <div className='col-12'>
            <h2>Les réservations</h2>
            <hr></hr>
        </div>
        <div className='col-12 listContainer'>
            {orders ? orders.map((order, key) =>
            (
                < OrderCard order={order} key={key} />
            )) : (
                <p>Aucune réservation</p>
            )}
        </div>
        < PriamryButton type='button' id='addOrder' text={'Ajouter une commande'} />
    </div>
  )
}
