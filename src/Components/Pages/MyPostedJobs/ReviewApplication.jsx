import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import AplicationCard from './AplicationCard';

const ReviewApplication = () => {
    const {id} = useParams()
    const {data, isSuccess, refetch} = useQuery({
        queryKey: ['myAplication', id],
        queryFn: ({ queryKey }) => {
          return axios.get(`http://localhost:4000/applications/${queryKey[1]}`);
        }
      });

console.log(data?.data);


    return (
        <div>
            <div className="max-w-6xl mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-6">Submitted Applications</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-xl">
            <thead className="bg-blue-100 text-left">
              <tr>
                <th className="py-3 px-4">Job Title</th>
                <th className="py-3 px-4">Applicant</th>
                <th className="py-3 px-4">Submitted At</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {isSuccess&& data?.data.map((app) => <AplicationCard key={app._id} app={app}></AplicationCard>)}
              {isSuccess&& data.data.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
            {/* {isSuccess&& data.data.map(applicationData=> <div> {applicationData.job_id}</div>)} */}
        </div>
    );
};

export default ReviewApplication;