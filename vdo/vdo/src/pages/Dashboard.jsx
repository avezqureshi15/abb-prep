import React from 'react'
import { NavLink } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div>
            <NavLink to='/add-country' >
                <button>Add Country</button>
            </NavLink>
            <NavLink to='/add-city' >
                <button>Add City</button>
            </NavLink>
            <NavLink to='/view-city' >
                <button>View City</button>
            </NavLink>

        </div>
    )
}

export default Dashboard