import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';

function PatientDetails() {
    const { id } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/patients/${id}`)
            .then(res => {
                console.log(res.data.Patient.name);
                setName(res.data.Patient.name);
                setAge(res.data.Patient.age);
                setSymptoms(res.data.Patient.symptoms);
            })
            .catch(err => {
                console.log(err);
            });
        setLoaded(true);
    }, [id]);

    const deletePatient = () => {
        axios.delete(`http://localhost:8000/api/patients/${id}`)
        navigate('/');
    }
    return (
        <>
            {!loaded ? <p>loading...</p> :
                <>
                    <div className="card ">
                        <div className="card-title d-flex justify-content-around gap-3 mt-2 ">
                            <Link to="/patients"><button type="button" className="btn btn-sm btn-primary me-2" >Home</button></Link>
                            <h5 className="card-title">{name} Details</h5>
                            <Link to={`/${id}/edit`}><button type="button" className="btn btn-sm btn-primary me-2" >Update</button></Link>
                        </div>
                        <div className='row d-flex justify-content-center '>
                            {age < 3 ? <img className="card-img-top img-thumbnail" style={{ width: '200px' }} src="/baby.png" alt="Card image cap" /> :
                                age > 75 ? <img className="card-img-top img-thumbnail " style={{ width: '200px' }} src="/elderly.png" alt="Card image cap" /> : ''}
                        </div>
                        <div className="card-body">
                            <div className="card-body" style={{ width: "18rem" }}>
                            </div>
                            <p className="card-text mt-2">Age : {age}</p>
                            <p className="card-text">Symptoms : {symptoms}</p>
                            <button type="button" onClick={e => { deletePatient() }} className="btn btn-sm btn-danger">Discharge Patient</button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default PatientDetails