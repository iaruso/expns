import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Main from "./pages/Main";
import Auth from "./pages/Auth";

const router = createBrowserRouter(
  createRoutesFromElements(
		<>
      <Route index element={<Main />} />
      <Route path="/auth" element={<Auth />} />
		</>
  )
)

export default function App() {
  return (
		<>
      <RouterProvider router={router}/>
    </>
  );
}