import { RouterProvider, createHashRouter } from 'react-router-dom';
import Main from "./pages/Main";
import Auth from "./pages/Auth";

const router = createHashRouter([
	{ path: '/', element: <Main/> },
	{ path: '/auth', element: <Auth/> },
]);

export default function App() {
  return (
		<RouterProvider router={router}/>
	)
}