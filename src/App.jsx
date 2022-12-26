import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Landing, Home, Dashboard, Analytics, Admin } from "./pages/index.jsx";
import Protected from "./components/Protected.jsx";

const App = () => {
	const [user, setUser] = useState(null);
	const login = () => {
		setUser({
			id: 1,
			name: "John",
			permissions: ['analize'],
			isAdmin: true
		});
	};
	const logout = () => {
		setUser(null);
	};

	return (
		<div className="App">
			<BrowserRouter>
				<Navigation />

				{user ? (
					<button onClick={logout}> Logout </button>
				) : (
					<button onClick={login}> Login </button>
				)}

				<Routes>
					<Route index element={<Landing />} />
					<Route path="/landing" element={<Landing />} />
					<Route element={<Protected isAllowed={!!user} />}>
						<Route path="/home" element={<Home />} />
						<Route path="/dashboard" element={<Dashboard />} />
					</Route>
					<Route
						path="/analytics"
						element={
							<Protected isAllowed={!!user && user.permissions.includes("analize")}>
								<Analytics />
							</Protected>
						}
					/>
					<Route 
					path="/admin"
					element={
						<Protected isAllowed={!!user && !!user.isAdmin} >
							<Admin />
						</Protected>
					 } />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

function Navigation() {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/landing">Landing</Link>
				</li>
				<li>
					<Link to="/home">Home</Link>
				</li>
				<li>
					<Link to="/dashboard">Dashboard</Link>
				</li>
				<li>
					<Link to="/analytics">Analytics</Link>
				</li>
				<li>
					<Link to="/admin">Admin</Link>
				</li>
			</ul>
		</nav>
	);
}

export default App;
