import React, { useState } from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom";


const Login = ({ loggedIn, setLoggedIn, email, setEmail, password, setPassword }) => {
    const history = useHistory();

    const [error, setError] = useState(null);

    const handleInputChange = (input) => (e) => {
        input === "email" ? setEmail(e.target.value) : setPassword(e.target.value);
    }

    const submitPostRequest = () => {
        axios.post("http://127.0.0.1:8000/authentication_token", { email, password })
            .then(res => {
                sessionStorage.setItem("token", res.data.token);
                setLoggedIn(!loggedIn);
                history.push("/");
            })
            .catch(err => { setError(err.message) })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        submitPostRequest();
    }

    return (
        <div className="background-dark">
            <h1>Login Page</h1>
            <form className="container-fluid col-xs-9 col-sm-6" onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Adresse Email</label>
                    <input type="email" name="email" className="form-control" id="emailInput" aria-describedby="emailHelp" onChange={handleInputChange("email")} />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Mot de passe</label>
                    <input type="password" name="password" className="form-control" id="passwordInput" onChange={handleInputChange("password")} />
                </div>
                <button type="submit" className="btn btn-success">Se connecter</button>
                {error ? (<div class="form-text text-danger">{error}</div>) : null}


            </form>
        </div>
    )
}

export default Login
