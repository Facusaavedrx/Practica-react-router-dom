import { Navigate, Outlet } from "react-router-dom";

const Protected = ({ isAllowed, children, redirectTo = "/landing" }) => {
	if (!isAllowed) {
		return <Navigate to={redirectTo} />;
	}

	return children ? children : <Outlet /> ;
};

export default Protected;
