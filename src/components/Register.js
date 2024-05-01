import React, { useRef, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase.js"
import { setDoc, doc } from "firebase/firestore"
import FormField from "./FormField.js"
import './styles.css'

export default function Register() {
    const navigate = useNavigate()

    const fullNameRef = useRef(null),
          emailRef = useRef(null),
          passwordRef = useRef(null),
          confirmPasswordRef = useRef(null)
          
    const [fullNameWarning, setFullNameWarning] = useState(""),
          [emailWarning, setEmailWarning] = useState(""),
          [passwordWarning, setPasswordWarning] = useState(""),
          [confirmPasswordWarning, setConfirmPasswordWarning] = useState(""),
          [errorMessage, setErrorMessage] = useState(""),
          [showErrorMessage, setShowErrorMessage] = useState(false);

    const handleFullNameChange = (e) => {
        if (e.target.value.length === 0) {
            setFullNameWarning("Name should not be empty.")
        } else {
            setFullNameWarning("")
        }
    }

    const handleEmailChange = (e) => {
        if (e.target.value.length === 0) {
            setEmailWarning("Email should not be empty.")
        } else if (!e.target.value.toLowerCase().match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            setEmailWarning("Invalid email.")
        } else {
            setEmailWarning("")
        }
    }

    const handlePasswordChange = (e) => {
        if (e.target.value.length < 8) {
            setPasswordWarning("Password must be at least 8 characters long.")
        } else {
            setPasswordWarning("")
        }
        if (confirmPasswordRef.current) {
            if (e.target.value !== confirmPasswordRef.current.value) {
                setConfirmPasswordWarning("Passwords do not match.")
            } else {
                setConfirmPasswordWarning("")
            }
        }
    }

    const handleConfirmPasswordChange = (e) => {
        if (passwordRef.current) {
            if (e.target.value !== passwordRef.current.value) {
                setConfirmPasswordWarning("Passwords do not match")
            } else {
                setConfirmPasswordWarning("")
            }
        }
    }

    const getHumanReadableError = (error) => {
        console.log(error);
        switch (error) {
            case 'auth/email-already-in-use':
                return (
                    `The email you provided is already in use. Consider joining us with another one.`
                )
            default:
                return (
                    'Invalid credentials. Please try again.'
                )
        }
    }
    
    const handleSubmit = async () => {
        const options = {
            day: "numeric",
            weekday: "short",
            year: "numeric",
            timeZone: "UTC",
            timeZoneName: "short"
        }

        if (fullNameWarning + emailWarning + passwordWarning + confirmPasswordWarning === "") {
            if (fullNameRef.current && emailRef.current && passwordRef.current) {
                const fullName = fullNameRef.current.value,
                      email = emailRef.current.value,
                      password = passwordRef.current.value
                createUserWithEmailAndPassword(auth, email, password)
                    .then(() => {
                        const date = new Date();
                        setDoc(doc(db, `users/${email}`), {
                            fullName: fullName,
                            email: email,
                            status: 'active',
                            last_login: date.toLocaleTimeString() + " " + date.toLocaleDateString("en-US", options)
                        })
                        navigate('/login');
                    })
                    .catch((error) => {
                        setErrorMessage(getHumanReadableError(error.code));
                        setShowErrorMessage(true);
                    })
            }
        }
    }

    return (
        <div className="container">
            <h1 className="text-center register">Register</h1>
            <form className="register-form mx-auto">
                <FormField
                    type="text"
                    name="full_name"
                    label="Full Name: "
                    value={fullNameRef}
                    onChange={handleFullNameChange}
                    errorMsg={fullNameWarning}
                    onFocus={() => setShowErrorMessage(false)}
                />
                <FormField
                    type="email"
                    name="e-mail"
                    label="E-mail: "
                    value={emailRef}
                    onChange={handleEmailChange}
                    errorMsg={emailWarning}
                    onFocus={() => setShowErrorMessage(false)}
                />
                <FormField
                    type="password"
                    name="pwd"
                    label="Password: "
                    value={passwordRef}
                    onChange={handlePasswordChange}
                    errorMsg={passwordWarning}
                    onFocus={() => setShowErrorMessage(false)}
                />
                <FormField
                    type="password"
                    name="confirm_pwd"
                    label="Confirm Password: "
                    value={confirmPasswordRef}
                    onChange={handleConfirmPasswordChange}
                    errorMsg={confirmPasswordWarning}
                    onFocus={() => setShowErrorMessage(false)}
                />
                {showErrorMessage && <h5 className="text-danger login-error">{errorMessage}</h5>}
                <br/>
                <button type="button" className="btn btn-primary form-control" onClick={handleSubmit}>Register</button>
                <h4 className="register-request">Got an account? <Link className="reg-link text-primary" to='/login'>Log in!</Link></h4>
            </form>
        </div>
    );
}