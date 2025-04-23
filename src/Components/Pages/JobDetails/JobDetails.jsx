import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    FaMapMarkerAlt,
    FaBriefcase,
    FaTags,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaBuilding,
    FaTasks,
    FaClipboardList
} from "react-icons/fa";

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState({});

    useEffect(() => {
        fetch(`http://localhost:4000/jobs/${id}`)
            .then((res) => res.json())
            .then((data) => setJob(data))
            .catch((error) => console.error("Error:", error));
    }, [id]);

    return (
        <div className="max-w-4xl mx-auto py-10 px-6">
            <div className="bg-blue-50 rounded-2xl shadow-md p-8">
                <h2 className="text-3xl font-bold mb-6 text-center text-black">
                    {job?.jobTitle}
                </h2>

                <div className="space-y-4 text-gray-700">
                    <p className="flex items-start gap-2">
                        <FaBuilding className="text-rose-400 mt-1" />
                        <span><strong>Company Info:</strong> {job?.companyInformation}</span>
                    </p>

                    <p className="flex items-start gap-2">
                        <FaMapMarkerAlt className="text-red-500 mt-1" />
                        <span><strong>Location:</strong> {job?.location}</span>
                    </p>

                    <p className="flex items-start gap-2">
                        <FaBriefcase className="text-blue-500 mt-1" />
                        <span><strong>Type:</strong> {job?.job_type}</span>
                    </p>

                    <p className="flex items-start gap-2">
                        <FaTags className="text-yellow-500 mt-1" />
                        <span><strong>Category:</strong> {job?.category}</span>
                    </p>

                    <p className="flex items-start gap-2">
                        <FaCalendarAlt className="text-orange-500 mt-1" />
                        <span><strong>Deadline:</strong> {job?.deadline}</span>
                    </p>

                    <p className="flex items-start gap-2">
                        <FaMoneyBillWave className="text-green-500 mt-1" />
                        <span><strong>Salary:</strong> {job?.salary_range} {job?.currency}</span>
                    </p>

                    <p className="flex items-start gap-2">
                        <FaClipboardList className="text-cyan-500 mt-1" />
                        <span><strong>Description:</strong> {job?.jobDescription}</span>
                    </p>

                    <p className="flex items-start gap-2">
                        <FaTasks className="text-indigo-700 mt-1" />
                        <span><strong>Requirements:</strong> {job?.
                            Requirement}</span>
                    </p>

                    <p className="flex items-start gap-2">
                        <FaTasks className="text-gray-500 mt-1" />
                        <span><strong>Responsibilities:</strong> {job?.
                            Responsibility
                        }</span>
                    </p>
                </div>

                {/* Go Back Home Button */}
                <div className="text-center mt-10">
                    <Link
                        to="/"
                        className="inline-block bg-gray-300 text-black font-medium px-6 py-2 rounded-lg shadow hover:bg-gray-400 transition duration-200"
                    >
                        Go Back Home
                    </Link>
                </div>

                {/* Apply Now Button */}
                <div className="text-center mt-4">
                    <Link
                        to={`/application/${job?._id}`}
                        className="inline-block bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-sky-400 transition duration-200"
                    >
                        Application Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
