import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AplicationCard = ({ app }) => {
    const { id } = useParams();

  const mutation = useMutation({
    mutationFn: ({ data, id }) => {
      console.log("Mutation data:", data);
      return axios.put(`http://localhost:4000/applications/update/${id}`, { status:data });
    },
    onSuccess: () => {
      console.log("Status updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating status:", error);
    }
  });

  const UpdateStatus = (value, id) => {
    console.log("Selected status:", value);
    mutation.mutate({ data: value, id });
  };

    return (
        <tr key={app._id} className="border-t hover:bg-blue-50">
            <td className="py-2 px-4">{app.job_title}</td>
            <td className="py-2 px-4">{app.userName}</td>
            <td className="py-2 px-4">{new Date(app.submitted_At).toLocaleString()}</td>
            <td className="py-2 px-4 capitalize">
               
                <select onChange={(e) => UpdateStatus(e.target.value, app._id)} name="review"  required className="w-full border border-blue-300 rounded-lg p-4">
                {/* <option disabled selected value="">{app.status}</option> */}
                <option value="Rejected">Rejected</option>
                <option value="ShortListed">ShortListed</option>
                <option value="Hired">Hired</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                
               </select></td>
            <td className="py-2 px-4">
                <button
                    onClick={() => handleWithdraw(app._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                    Withdraw
                </button>
            </td>
        </tr>
    );
};

export default AplicationCard;