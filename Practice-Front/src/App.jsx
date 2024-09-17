import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Home from "./components/auth/Home";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import Jobs from "./components/Jobs";
import JobDescription from "./components/JobDescription";
import UserProfile from "./components/UserProfile";
import Companies from "./components/admin/Companies";
import AddCompany from "./components/admin/AddCompany";
import CompanySetup from "./components/admin/CompanySetup";
import CreateAdminJobs from "./components/admin/CreateAdminJobs";
import AdminJobs from "./components/admin/AdminJobs";
import GetApplicants from "./components/admin/GetApplicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/jobs",
      element: <Jobs />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/description/:id",
      element: <JobDescription />,
    },
    {
      path: "/profile",
      element: <UserProfile />,
    },

    // admin
    {
      path: "/admin/companies",
      element: (
        <ProtectedRoute>
          <Companies />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/companies/create",
      element: (
        <ProtectedRoute>
          <AddCompany />{" "}
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/companies/:id",
      element: (
        <ProtectedRoute>
          <CompanySetup />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/jobs",
      element: (
        <ProtectedRoute>
          {" "}
          <AdminJobs />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/jobs/create",
      element: (
        <ProtectedRoute>
          <CreateAdminJobs />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/jobs/:id/applicants",
      element: (
        <ProtectedRoute>
          {" "}
          <GetApplicants />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
