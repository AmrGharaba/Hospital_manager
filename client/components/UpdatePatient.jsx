import React, { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom';
import PatientForm from './PatientForm';
import axios from 'axios';

function UpdatePatient() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

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
    }, [id]);
    const updatePatient = e => {
        e.preventDefault();
        axios.patch(`http://localhost:8000/api/patients/${id}`, {
            age, name, symptoms,
        })
            .then(res => {
                console.log(res);
                navigate(`/${id}/details`)
            })
            .catch(err => {
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
        axios.get(`http://localhost:8000/api/patients/${id}`)
            .then(res => {
                setName(res.data.Patient.name);
                setAge(res.data.Patient.age);
                setSymptoms(res.data.Patient.symptoms);
                console.log(res.data.Patient.name);
            })
            .catch(err => console.error(err));
    }
    return (
        <PatientForm
            onSubmitProp={updatePatient}
            name={name}
            setName={setName}
            age={age}
            setAge={setAge}
            symptoms={symptoms}
            setSymptoms={setSymptoms}
            errors={errors}
        />
    )
}

export default UpdatePatient