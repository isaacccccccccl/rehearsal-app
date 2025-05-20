import { useState } from 'react'
import { useNavigate } from 'react-router'
import { signup } from '../store/actions/user.actions'

export function Signup() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        fullname: '',
        instrument: '',
        isAdmin: false
    })
    const navigate = useNavigate()

    const instruments = [
        'drums',
        'guitars',
        'bass',
        'saxophone',
        'keyboards',
        'vocals'
    ]

    function clearState() {
        setCredentials({
            username: '',
            password: '',
            fullname: '',
            instrument: '',
            isAdmin: false
        })
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }
    
    async function onSignup(ev = null) {
        if (ev) ev.preventDefault()
            
        if (!credentials.username || !credentials.password || !credentials.fullname || !credentials.instrument) {
            alert('Please fill in all required fields')
            return
        }
        await signup(credentials)
        clearState()
        navigate('/')
    }

    return (
        <form className="signup-form" onSubmit={onSignup}>
            <h2>Join JaMoveo</h2>
            
            <div className="form-group">
                <label htmlFor="fullname">Full Name</label>
                <input
                    id="fullname"
                    type="text"
                    name="fullname"
                    value={credentials.fullname}
                    placeholder="Enter your full name"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    value={credentials.username}
                    placeholder="Choose a username"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="Create a password"
                    onChange={handleChange}
                    required
                />
            </div>
            
            <div className="instrument-selection">
                <label>Select your instrument:</label>
                <div className="radio-group">
                    {instruments.map(instrument => (
                        <label key={instrument}>
                            <input
                                type="radio"
                                name="instrument"
                                value={instrument}
                                checked={credentials.instrument === instrument}
                                onChange={handleChange}
                                required
                            />
                            {instrument.charAt(0).toUpperCase() + instrument.slice(1)}
                        </label>
                    ))}
                </div>
            </div>

            <div className="admin-checkbox">
                <label>
                    <input
                        type="checkbox"
                        name="isAdmin"
                        checked={credentials.isAdmin}
                        onChange={handleChange}
                    />
                    Register as Admin
                </label>
            </div>

            <button type="submit">Create Account</button>
        </form>
    )
}