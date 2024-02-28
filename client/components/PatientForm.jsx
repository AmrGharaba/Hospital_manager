import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';



function PatientForm(props) {
    const { onSubmitProp, name, setName, age, setAge, symptoms, setSymptoms, errors, number, loaded } = props;
    const { id } = useParams();
    const location = useLocation();
    const [nameError, setNameError] = useState("");
    const [ageError, setAgeError] = useState("");
    const [symptomsError, setSymptomsError] = useState("");

    const handleName = (e) => {
        setName(e.target.value);
        if (e.target.value.length < 1) {
            setNameError("name is required");
        }
        else if (e.target.value < 2 && e.target.value > 0) {
            setAgeError("name must be 2 characters in length");
        }
        else if (e.target.value.length > 40) {
            setNameError("name must not exceed 40 characters");
        }
        else {
            setNameError("");
        }
    }
    const handleSymptoms = (e) => {
        setSymptoms(e.target.value);
        if (e.target.value.length < 1) {
            setSymptomsError("Symptoms are required");
        }
        else if (e.target.value.length < 4 && e.target.value.length > 0) {
            setSymptomsError("Symptoms must atleast be 4 characters long");
        }
        else {
            setSymptomsError("");
        }
    }
    const handleAge = (e) => {
        setAge(e.target.value);
        if (e.target.value.length < 1) {
            setAgeError("age is required");
        }
        else if (e.target.value < 1) {
            setAgeError("age must not be less than 1 year");
        }
        else if (e.target.value > 140) {
            setAgeError("age must not exceed 140 years");
        }
        else {
            setAgeError("");
        }
    }

    return (
        <div className="card" style={{ width: '35rem ' }}>
            <div className="card-body">
                <div className="d-flex justify-content-between ">
                    <Link to={`/patients`}><button type="button" className=" btn btn-sm btn-primary me-2 align-self-end     " >Home</button></Link>
                    {location.pathname.includes('edit') ?
                        <>
                            <h5 className="card-title">edit {name}</h5>
                            <Link to={`/${id}/details`}><button type="button" className="btn btn-sm btn-primary me-2" >details</button></Link>
                        </>
                        :
                        <>
                            <h5 className="card-title ">Admit Patient</h5>
                        </>
                    }
                </div>
                {location.pathname.includes("") ? <h6 className="text-success "> Patients Admitted : {loaded ? number : ""}</h6> : ''}
                <form >
                    <div className="mb-3">
                        <label htmlFor="PatientName" className="form-label">Name : </label>
                        <input type="text" className="form-control" id="PatientName" aria-describedby="nameHelp" onChange={handleName} value={name}></input>
                        <small id="nameHelp" className="form-text text-danger " >{errors.filter(string => string.includes("name"))}</small>
                        <small id="nameHelp" className="form-text text-danger " >{nameError}</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="PatientAge" className="form-label">Age : </label>
                        <input type="number" className="form-control" id="PatientAge" aria-describedby="nameHelp" onChange={handleAge} value={age}></input>
                        <small id="nameHelp" className="form-text text-danger " >{errors.filter(string => string.includes("age" || "Age"))}</small>
                        <small id="nameHelp" className="form-text text-danger " >{ageError}</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="PatientSymptoms" className="form-label">Symptoms : </label>
                        <input type="text" className="form-control" id="PatientSymptoms" aria-describedby="nameHelp" onChange={handleSymptoms} value={symptoms}></input>
                        <small id="nameHelp" className="form-text text-danger " >{errors.filter(string => string.includes("ymptom"))}</small>
                        <small id="nameHelp" className="form-text text-danger " >{symptomsError}</small>
                    </div>
                    <div className="mb-3 text-center" >
                        <button type="submit" onClick={onSubmitProp} className="btn btn-sm btn-primary " disabled={name.length < 2 || name.length > 40 || symptoms.length < 4 || age < 1 || age > 140} >{location.pathname.includes("edit") ? "update" : "Admit"}</button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default PatientForm