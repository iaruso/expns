import { RouterProvider, createHashRouter } from 'react-router-dom';
import Promo from "./pages/Promo";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import Statistics from "./pages/Statistics";
import Transactions from "./pages/Transactions";

const router = createHashRouter([
	{ path: '/', element: <Promo/> },
	{ path: '/auth', element: <Auth/> },
	{ path: '/main', element: <Main/> },
	{ path: '/statistics', element: <Statistics/> },
	{ path: '/transactions', element: <Transactions/> },
]);

export default function App() {
  return (
		<RouterProvider router={router}/>
	)
}