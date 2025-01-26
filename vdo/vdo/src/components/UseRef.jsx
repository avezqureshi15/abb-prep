import React, { useRef, useState } from 'react'

const Validation = () => {
    const [formData, setFormData] = useState({ name: '', email: '' })
    const [errors, setErrors] = useState({});
    const nameRef = useRef();
    const emailRef = useRef();
    const formRef = useRef();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const validationRules = {
        name: [
            { test: (value) => value.length >= 3, message: 'Name must be more then 3 characters' },
            { test: (value) => value.trim() != '', message: 'Name is required' }
        ],
        email: [
            { test: (value) => regex.test(value), message: 'Please enter valid email address' },
            { test: (value) => value.trim() != '', message: 'Email is required' }
        ]
    }

    const validateField = (field, value) => {
        const rules = validationRules[field];
        for (let rule of rules) {
            if (!rule.test(value)) return rule.message;
        }
        return '';
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        for (let field in formData) {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            if (newErrors.name) {
                nameRef.current.focus()
            }
            else if (newErrors.email) {
                emailRef.current.focus();
            }
        } else {
            setErrors({});
            alert('Form submitted successfully!');
            formRef.current.reset();
        }
    }


    return (
        <>
            <h1>Form Validation</h1>
            <form ref={formRef} onSubmit={handleSubmit} >
                <input
                    name='name'
                    type='text'
                    ref={nameRef}
                    value={formData.name}
                    onChange={(e) => handleChange(e)}
                    placeholder='Enter ur name'
                />
                {errors.name && <p style={{ color: 'red' }} >{errors.name}</p>}
                <input
                    name='email'
                    type='email'
                    ref={emailRef}
                    value={formData.email}
                    onChange={(e) => handleChange(e)}
                    placeholder='Enter ur email'
                />
                {errors.email && <p style={{ color: 'red' }} >{errors.email}</p>}
                <button type='submit'  >Submit</button>
            </form>
        </>
    )
}

export default Validation