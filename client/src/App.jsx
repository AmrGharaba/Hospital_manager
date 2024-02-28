import { useState, useEffect } from 'react'
import './App.css'
import PatientForm from '../components/PatientForm'
import Patients from '../components/Patients'
import UpdatePatient from '../components/UpdatePatient'
import { Routes, Route, useNavigate } from 'react-router-dom'
import PatientDetails from '../components/PatientDetails'
import axios from 'axios'

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const [patients, setPatients] = useState([]);
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    axios.get('http://localhost:8000/api/patients')
      .then(res => {
        console.log(res.data);
        setPatients(res.data.Patients);
        setNumber(patients.length)
        setLoaded(true);
      })
      .catch(err => {
        console.log(err);
      })
  }, [navigate])

  const createPatient = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/patients', {
      age, name, symptoms,
    })
      .then(res => {
        navigate('/patients')
      })
      .catch(err => {
        console.log(err)
        const errorResponse = err.response.data.errors; // Get the errors from err.response.data
        const errorArr = []; // Define a temp error array to push the messages in
        for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
          errorArr.push(errorResponse[key].message)
        }
        setErrors(errorArr);
        console.log(errorResponse)
      })
    setName("");
    setAge("");
    setSymptoms("");
  }


  return (
    <>
      <Routes>
        <Route element={<UpdatePatient />} path='/:id/edit'></Route>
        <Route element={<PatientForm
          onSubmitProp={createPatient}
          name={name}
          setName={setName}
          age={age}
          setAge={setAge}
          symptoms={symptoms}
          setSymptoms={setSymptoms}
          errors={errors}
          number={number}
          loaded={loaded}
        />} path='/'></Route>
        <Route element={<Patients />} path='/patients'></Route>
        <Route element={<PatientDetails />} path={'/:id/details'} />
      </Routes>
    </>
  )
}

export default App
