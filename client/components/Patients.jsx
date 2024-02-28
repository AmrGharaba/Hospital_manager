import React, { useState, useEffect } from 'react'
import { Link} from 'react-router-dom'
import axios from 'axios';

function Patients() {

    const [patients, setPatients] = useState([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:8000/api/patients')
            .then(res => {
                console.log(res.data);
                setPatients(res.data.Patients);
                setLoaded(true);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div className="card p-3">
            <div className="card-title d-flex justify-content-around gap-3 ">
                <Link className={location.pathname.includes('add') ? "text-success" : ""} to="/patients"><button type="button" className="btn btn-sm btn-primary me-2" >Home</button></Link>
                <h5 className="card-title">Hospital Manager</h5>
                <Link className={location.pathname.includes('list') ? "text-success" : ""} to="/"><button type="button" className="btn btn-sm btn-primary me-2" >Admit</button></Link>
            </div>
            <div className="card-body d-flex flex-wrap gap-5 justify-content-start  " style={{ width: "62rem" }}>
                {
                    !loaded ? <p>loading...</p> : patients.map((patient, idx) => (
                        <div className="card" style={{ width: "18rem" }} key={idx}>
                            <div className="card-body">
                                <h5 className="card-title" ><Link to={`/${patient._id}/details`}>{patient.name}</Link></h5>
                                <Link to={`/${patient._id}/edit`}><button type="button" className="btn btn-sm btn-primary me-2" >Edit</button></Link>
                                <p className="card-text mt-2">Age : {patient.age}</p>
                                <p className="card-text">Symptoms : {patient.symptoms}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Patients