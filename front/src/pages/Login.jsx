import { useState } from 'react'
import { useNavigate } from 'react-router'
import { login } from '../store/actions/user.actions'

export function Login() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate()

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    async function onLogin(ev) {
        ev.preventDefault()
        try {
            await login(credentials)
            navigate('/')
        } catch (err) {
            alert('Invalid username or password')
        }
    }
    
    return (
        <form className="login-form" onSubmit={onLogin}>
            <h2>Login to JaMoveo</h2>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                name="username"
                value={credentials.username}
                    placeholder="Enter your username"
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
                    placeholder="Enter your password"
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    )
}