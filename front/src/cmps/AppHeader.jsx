import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'

export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()

	async function onLogout() {
		try {
			await logout()
			navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	return (
		<header className="app-header full">
			<nav>
				<NavLink to="/" className="logo">
					JaMoveo
				</NavLink>

				{user && user.isAdmin && (
					<span className="admin-badge">Admin</span>
				)}

				{!user && <NavLink to="login" className="login-link">Login</NavLink>}
				{user && (
					<div className="user-info">
						<Link to={`user/${user._id}`}>
							<span className="user-name">
								{user.fullname.charAt(0).toUpperCase() + user.fullname.slice(1)}
							</span>
							{user.instrument && <span className="instrument">{user.instrument}</span>}
						</Link>
						<button onClick={onLogout} className="logout-btn">Logout</button>
					</div>
				)}
			</nav>
		</header>
	)
}
