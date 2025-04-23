import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const MyPostedJobs = () => {
 
  const { user } = useContext(AuthContext); 
// console.log(user);

const {data, isSuccess, refetch} = useQuery({
  queryKey: ['myJobs', user.email],
  queryFn: ({ queryKey }) => {
    // const [,email] = queryKey;
    return axios.get(`http://localhost:4000/jobs?email=${queryKey[1]}`);
  }
});
console.log(data?.data);


// const [jobs, setJobs] = useState([]);

//   useEffect(() => {
//     if (user?.email) {
//       axios.get(`http://localhost:4000/jobs?email=${user.email}`)
//         .then(res => setJobs(res.data))
//         .catch(error => console.error(error));
//     }
//   }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This job will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:4000/jobs/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              Swal.fire('Deleted!', 'The job has been deleted.', 'success');
              // setJobs(jobs.filter(job => job._id !== id));
              refetch()
            }
          })
          .catch(error => console.error(error));
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="overflow-x-auto w-full max-w-6xl">
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Job Title</th>
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-4">Type</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isSuccess && data?.data?.map(job => (
              <tr key={job._id} className="border-t">
                <td className="py-2 px-4">{job.jobTitle}</td>
                <td className="py-2 px-4">{job.location}</td>
                <td className="py-2 px-4">{job.job_type}</td>
                <td className="py-2 px-4 space-x-2">
                  <Link to={`/my-job/${job._id}`}>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded">Review Application</button>
                  </Link>
                  <Link to={`/update-job/${job._id}`}>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded">Edit Job</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {data?.data?.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  You haven't posted any jobs yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPostedJobs;
