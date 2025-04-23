import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const UpdateJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);

    useEffect(() => {
        // Fetch job by ID
        axios.get(`http://localhost:4000/jobs/${id}`)
            .then(res => setJob(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedJob = {
            jobTitle: e.target.title.value,
            category: e.target.category.value,
            location: e.target.location.value,
            salaryRange: e.target.salaryRange.value,
            deadline: e.target.deadline.value,
            description: e.target.description.value,
            requirements: e.target.requirements.value,
        };

        await axios.put(`http://localhost:4000/jobs/${id}`, updatedJob);
        navigate(`/jobs/${id}`);
    };

    if (!job) {
        return <div className="text-center py-10">Loading job details...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-10 bg-white shadow-2xl rounded-2xl">
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Update Job Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Job Title</label>
                    <input name="title" defaultValue={job.jobTitle} placeholder="Enter job title" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Category</label>
                    <input name="category" defaultValue={job.category} placeholder="Enter category" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Location</label>
                    <input name="location" defaultValue={job.location} placeholder="Enter location" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Salary Range</label>
                    <input name="salaryRange" defaultValue={job.salaryRange} placeholder="Enter salary range" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Application Deadline</label>
                    <input name="deadline" defaultValue={job.deadline} placeholder="Enter deadline" className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Job Description</label>
                    <textarea name="description" defaultValue={job.description || job.jobDescription} placeholder="Enter job description" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-1">Requirements</label>
                    <textarea name="requirements" defaultValue={job.requirements || job.requirement} placeholder="Enter requirements" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>

                <div className="text-center">
                    <button type="submit" className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-blue-700 transition duration-300">
                        Update Job
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateJob;
