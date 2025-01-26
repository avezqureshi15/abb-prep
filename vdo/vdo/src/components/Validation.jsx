import React, { useRef, useState } from 'react'

const Validation = () => {
    const [formData, setFormData] = useState({ name: '', email: '' })
    const [errors, setErrors] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
    }
    const nameRef = useRef();
    const emailRef = useRef();
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const validationRules = {
        name: [
            { test: (value) => value.length >= 3, message: 'Name must be atleast 3 char' },
            {
                test: (value) => value.trim() != '',
                message: 'Name is required'
            }

        ],
        email: [
            { test: (value) => regex.test(value), message: 'Please enter valid email address' },
            { test: (value) => value.trim() != '', message: 'Email is required' }
        ]
    }

    const validateField = (field, value) => {
        const rules = validationRules[field];
        for (let rule of rules) {
            if (!rule.test(value)) {
                return rule.message;
            }
        }
        return ''
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};
        for (let field in formData) {
            const error = validateField(field, formData[field])
            if (error) {
                newErrors[field] = error;
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            if (newErrors.name) {
                nameRef.current.focus();
            }
            else if (newErrors.email) {
                emailRef.current.focus();
            }
        } else {
            setErrors({});
            alert('Form submittde succesfully')
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    name='name'
                    type='text'
                    value={formData.name}
                    placeholder='Enter ur name'
                    onChange={handleChange}
                    ref={nameRef}
                />
                {errors.name && <p style={{ color: 'red' }} >{errors.name}</p>}

                <input
                    name='email'
                    type='email'
                    value={formData.email}
                    placeholder='Enter ur email'
                    onChange={handleChange}
                    ref={emailRef}
                />
                {errors.email && <p style={{ color: 'red' }} >{errors.email}</p>}
                <button type='submit' >Submit</button>
            </form>
        </>
    )
}

export default Validation