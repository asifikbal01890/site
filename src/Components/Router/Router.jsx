import { createBrowserRouter } from "react-router-dom";
import Mainlayouts from "../Layouts/Mainlayouts";
import Error from "../Pages/Error/Error";
import Home from "../Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import JobDetails from "../Pages/JobDetails/JobDetails";
import SeeAllJobs from "../Home/seeAllJobs/seeAllJobs";
import AddJobs from "../Pages/AddJobs/AddJobs";
import JobApplicationForm from "../Pages/JobApplicationForm/JobApplicationForm";
import MyPostedJobs from "../Pages/MyPostedJobs/MyPostedJobs";
import UpdateJob from "../Pages/UpdateJob/UpdateJob";
import PrivateRoute from "./PrivateRoute";
import ReviewApplication from "../Pages/MyPostedJobs/ReviewApplication";


export const router = createBrowserRouter([
    {
        path:"/",
        element:<Mainlayouts></Mainlayouts>,
        errorElement:<Error></Error>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/login",
                element:<Login></Login>
            },
            {
                path:"/register",
                element:<Register></Register>
            },
            {
                path:"/seeAllJobs",
                element:<PrivateRoute><SeeAllJobs></SeeAllJobs></PrivateRoute>
            },
            {
                path:"/jobs/:id",
                element:<PrivateRoute><JobDetails></JobDetails></PrivateRoute>
            },
            {
                path:"/add-jobs",
                element:<PrivateRoute><AddJobs></AddJobs></PrivateRoute>
            },
            {
                path:"/application/:id",
                element:<JobApplicationForm></JobApplicationForm>
            },
            {
                path:"/update-job/:id",
                element:<UpdateJob></UpdateJob>
            },
            {
                path:"/my-job",
                element:<PrivateRoute><MyPostedJobs></MyPostedJobs></PrivateRoute>
            },
            {
                path:"/my-job/:id",
                element:<PrivateRoute><ReviewApplication></ReviewApplication></PrivateRoute>
            },
           
        ]
    }
])