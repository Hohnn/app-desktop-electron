import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../user/UserContext'
import { useParams, useNavigate, Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function OrderPage() {
    const { user } = useContext(UserContext)
    const { id } = useParams()
    
    // Fill input
    const [orderValue, setOrderValue] = useState('')
    const [infoValue, setInfoValue] = useState('')
    const [totalPrice, setTotalPrice] = useState('')
    const navigate = useNavigate()
    const displayDate = (date) => {
        return new Date(date).toLocaleDateString('sv')
    }
    const statusName = ['En attente de validation', 'Acceptée', 'Rejetée', 'En cours', 'Terminée']

    const fetchData = async () => {
        const response = await fetch('https://skydrone-api.herokuapp.com/api/v1/orders/' + id, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const data = await response.json()
        setOrderValue(data.order)
        setTotalPrice((calcTotalDays(data.order.startAt_o, data.order.endAt_o) * data.order.drone_id.pricePerDay_d).toFixed(2))
    }

    const calcTotalDays = (startDate, endDate) => {
        let start = new Date(startDate)
        let end = new Date(endDate)
        let diff = end.getTime() - start.getTime()
        return diff / (1000 * 60 * 60 * 24)
    }

    useEffect(() => {
        fetchData()
        fetch('https://skydrone-api.herokuapp.com/api/v1/drones')
            .then(response => response.json())
            .then(data => {
                handleChangeInfo('allDrones', data)
            })
    }, [])




    const handleChange = (event) => {
        const { name, value } = event.target
        setOrderValue(prev => ({
            ...prev,
            [name]: value
        }))
        console.log(name, value)
    }

    const handleChangeInfo = (name, value) => {
        setInfoValue(prev => ({
            ...prev,
            [name]: value
        }))
    }

    

    const showToastMessage = () => {
        toast.success('Commande mise à jour', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch('https://skydrone-api.herokuapp.com/api/v1/orders/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify({
                state_o: orderValue.state_o,
                startAt_o: orderValue.startAt_o,
                endAt_o: orderValue.endAt_o,
                report_o: orderValue.report_o,
                drone_id: orderValue.drone_id
            })
        })

        if (event)
        setTimeout(() => {
            navigate('/orders')
        }, 4000)
    }

    return (
        <>
            <h2>Réservation</h2>
            <hr/>
            <div className="row mt-3">
                <form className="col-12 col-md-8" onSubmit={handleSubmit} >
                    <h3>Détails</h3>
                    <div className="card p-4" >
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Status</label>
                            <div className="form-group">
                                <select className="form-select w-auto" id='state' name='state_o' aria-label="Default select example" onChange={e => handleChange(e)} value={orderValue.state_o}>
                                    {statusName && statusName.map((status, key) => {
                                        return (
                                            <option value={status} key={key}>{status}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="mb-3 d-flex">
                            <div className="me-3">
                                <label htmlFor="startDate" className="form-label">Début</label>
                                <input type="date" className="form-control" name='startAt_o' id="startDate" value={displayDate(orderValue.startAt_o)} onChange={e => handleChange(e)}></input>
                            </div>
                            <div className="">
                                <label htmlFor="endDate" className="form-label">Fin</label>
                                <input type="date" className="form-control" name='endAt_o' id="endDate" value={displayDate(orderValue.endAt_o)} onChange={e => handleChange(e)}></input>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="desc" className="form-label">Description</label>
                            <textarea className="form-control" id="desc" name='report_o' rows="4" placeholder="Information commande" value={orderValue.report_o} onChange={e => handleChange(e)} ></textarea>
                        </div>

                        <div className="mb-0">
                            <label htmlFor="drone" className="form-label">Drone</label>
                            <select className="form-select w-auto" name='drone_id' id='drone' aria-label="Default select example" onChange={e => handleChange(e)} value={orderValue ? orderValue.drone_id._id : ''}>
                                {infoValue && infoValue.allDrones.map((dro, key) => {
                                    return (
                                        <option value={dro._id} key={key}>{dro.name_d} </option>
                                    )
                                })}
                            </select>

                        </div>
                        <div className='col-12 d-flex mt-3'>
                            <Link to={'/orders'}><button className='btn btn-dark'>Retour</button></Link>
                            <button type='submit' onClick={showToastMessage} className='btn btn-primary ms-auto'>Enregistrer</button>
                            <ToastContainer />
                        </div>
                    </div>
                    
                </form>
                <div className="col-12 col-md-4">
                    <h3>Infos client</h3>
                    <div className="card p-4" >
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Client</label>
                            <input type="text" className="form-control" id="name" value={user.user.firstName_u + ' ' + user.user.lastName_u} disabled></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="company" className="form-label">Entreprise</label>
                            <input type="text" className="form-control" id="company" value={user.user.company_u} disabled></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Téléphone</label>
                            <input type="text" className="form-control" id="phone" value={user.user.phone_u} disabled></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Adresse de livraison</label>
                            <input type="text" className="form-control" id="address" value={user.user.address_u} disabled></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Prix total</label>
                            <input type="number" className="form-control" id="price" placeholder="Prix du produit" value={totalPrice} disabled></input>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

