import { useSelector } from 'react-redux'

export function AppFooter() {
	const count = useSelector(storeState => storeState.userModule.count)

	return (
		<footer className="app-footer full">
			<div className="footer-content">
				<span>Isaac Levy</span>
			</div>
		</footer>
	)
}