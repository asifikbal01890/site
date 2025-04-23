import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

const ApplicationList = () => {
  const queryClient = useQueryClient();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:4000/applications");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:4000/applications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["applications"]);
      toast.success("Application withdrawn!");
    },
    onError: () => {
      toast.error("Failed to withdraw application.");
    },
  });

  const handleWithdraw = (id) => {
    toast((i) => (
      <span>
        Are you sure you want to withdraw?
        <div className="mt-2 flex justify-end gap-2">
          <button
            onClick={() => {
              mutation.mutate(id);
              toast.dismiss(i.id);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Yes
          </button>
          <button onClick={() => toast.dismiss(i.id)} className="px-3 py-1 border rounded">
            Cancel
          </button>
        </div>
      </span>
    ));
  };

  if (isLoading) return <p className="text-center py-10">Loading applications...</p>;

  return (
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
            {applications.map((app) => (
              <tr key={app._id} className="border-t hover:bg-blue-50">
                <td className="py-2 px-4">{app.job_title}</td>
                <td className="py-2 px-4">{app.userName}</td>
                <td className="py-2 px-4">{new Date(app.submitted_At).toLocaleString()}</td>
                <td className="py-2 px-4 capitalize">{app.status}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleWithdraw(app._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Withdraw
                  </button>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
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
  );
};

export default ApplicationList;
