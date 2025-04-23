import React, { useEffect, useState } from 'react';
import { FaRegClock, FaUsers, FaMoneyBillWave, FaInfoCircle, FaUserGraduate } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SeeAllJobs = () => {
    const [jobsData, setJobsData] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [jobType, setJobType] = useState('');
    const [experience, setExperience] = useState('');
    const [salaryRange, setSalaryRange] = useState(''); 
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:4000/jobs')
            .then(res => res.json())
            .then(data => {
                setJobsData(data);
                setFilteredJobs(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        if (salaryRange) {
            const [min, max] = salaryRange.split('-');
            setMinSalary(min);
            setMaxSalary(max);
        } else {
            setMinSalary('');
            setMaxSalary('');
        }
    }, [salaryRange]);

    useEffect(() => {
        filterJobs();
    }, [searchQuery, jobType, experience, minSalary, maxSalary, jobsData]);

    const filterJobs = () => {
        const filtered = jobsData
            .filter(job => {
                const query = searchQuery.toLowerCase();
                return (
                    job.job_title?.toLowerCase().includes(query) ||
                    job.category?.toLowerCase().includes(query) ||
                    job.location?.toLowerCase().includes(query)
                );
            })
            .filter(job => {
                return jobType ? job.job_type?.toLowerCase() === jobType.toLowerCase() : true;
            })
            .filter(job => {
                return experience ? job.experience_level?.toLowerCase() === experience.toLowerCase() : true;
            })
            .filter(job => {
                let min = 0, max = 0;
                if (typeof job.salary_range === 'string') {
                    [min, max] = job.salary_range.split('-').map(number => parseInt(number));
                }

                 else if (typeof job.salary_range === 'object') {
                    min = job.salary_range.min || 0;
                    max = job.salary_range.max || 0;
                }

                const Min = minSalary ? max >= parseInt(minSalary) : true;
                const Max = maxSalary ? min <= parseInt(maxSalary) : true;

                return Min && Max;
            });

        setFilteredJobs(filtered);
    };

    const handleJobDetails = (id) => {
        navigate(`/jobs/${id}`);
    };

    return (
        <div className='mb-12'>
            <div className="text-center py-10 px-4 md:px-8 lg:px-16 bg-white">
                <h2 className="text-center text-3xl font-bold mb-8">Available Job Listings</h2>
            </div>

            <div className="max-w-6xl mx-auto mb-8 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Search by any Jobs"
                    className="border rounded-lg px-4 py-2 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <select
                    className="border rounded-lg px-4 py-2 w-full"
                    onChange={e => setJobType(e.target.value)}
                >
                    <option value="">All Job Types</option>
                    <option value="fulltime">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="hybrid">Hybrid</option>
                </select>

                <select
                    className="border rounded-lg px-4 py-2 w-full"
                    onChange={e => setExperience(e.target.value)}
                >
                    <option value="">All Experience Levels</option>
                    <option value="entry">Entry</option>
                    <option value="internship">Internship</option>
                    <option value="junior">Junior</option>
                    <option value="midlevel">Midlevel</option>
                    <option value="senior">Senior</option>
                </select>

                <select
                    className="border rounded-lg px-4 py-2 w-full"
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(e.target.value)}
                >
                    <option value="">All Salary Ranges</option>
                    <option value="0-10000">0 - 10,000</option>
                    <option value="10000-20000">10,000 - 20,000</option>
                    <option value="20000-35000">20,000 - 35,000</option>
                    <option value="35000-60000">35,000 - 60,000</option>
                    <option value="60000-100000">60,000 - 100,000</option>
                </select>
            </div>

            <div className="py-10 px-4 bg-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {filteredJobs.map((job) => (
                        <div
                            key={job._id}
                            className="bg-blue-50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-xl text-center font-semibold text-gray-800">{job.jobTitle}</h3>
                                <p className="text-sm text-center text-gray-500 mt-1">{job.location}</p>
                                <div className="flex flex-wrap justify-center gap-2 mt-2 text-sm text-gray-600">
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded">{job.job_type}</span>
                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{job.category}</span>
                                </div>

                                <div className="text-sm text-gray-600 space-y-2 mt-4">
                                    <p className="flex items-center text-center justify-center gap-2">
                                        <FaRegClock className="text-orange-500" />
                                        <strong>Deadline:</strong> {job.deadline}
                                    </p>
                                    <p className="flex items-center text-center justify-center gap-2">
                                        <FaUsers className="text-blue-500" />
                                        <strong>Total Applicants:</strong> {job.totalapplicants}
                                    </p>
                                    <p className="flex items-center text-center justify-center gap-2">
                                        <FaUserGraduate className="text-purple-500" />
                                        <strong>Experience:</strong> {job.experience}
                                    </p>
                                    <p className="flex items-center text-center justify-center gap-2">
                                        <FaMoneyBillWave className="text-green-500" />
                                        <strong>Salary:</strong> {job.salary_range} {job.currency}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleJobDetails(job._id)}
                                className="mt-6 w-full py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-[#206ab1] transition flex items-center justify-center gap-2"
                            >
                                <FaInfoCircle className="text-lg" />
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SeeAllJobs;
