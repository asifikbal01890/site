import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

const JobApplicationForm = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  console.log(id);
  
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => axios.post("http://localhost:4000/applications", data),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const application = {
      userName: user?.displayName,
      userEmail: user?.email,
      userPhoto: user?.photoURL,

      job_id: id,
      job_title: form.job_title.value,
      job_type: form.job_type.value,
      category: form.category.value,
      location: form.location.value,
      deadline: form.deadline.value,
      careerSummary: form.careerSummary.value,
      skills: form.skills.value,
      experience: form.experience.value,
      whyHire: form.whyHire.value,
      salaryRange: form.salaryRange.value,
      portfolio: form.portfolio.value,
      linkedin: form.linkedin.value,
      resume: form.resume.value,
      readyToWork: form.readyToWork.checked,
      skillsAligned: form.skillsAligned.checked,
      confident: form.confident.checked,
      submitted_At: new Date().toISOString(),
      status: "pending",
    };

    toast.promise(
      mutation.mutateAsync(application).then(() => {
        form.reset();
        navigate("/");
      }),
      {
        loading: "Submitting your application...",
        success: "Application submitted successfully!",
        error: "Submission failed. Please try again.",
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-8 bg-blue-50 rounded-2xl shadow-xl space-y-6 mt-10"
    >
      <h2 className="text-3xl font-bold text-blue-600 mb-4">Apply for the Job</h2>

      <textarea
        name="job_title"
        rows="2"
        placeholder="Job Title"
        className="w-full border border-blue-300 rounded-lg p-4"
        required
      />

      <textarea
        name="careerSummary"
        rows="4"
        placeholder="Career Summary"
        className="w-full border border-blue-300 rounded-lg p-4"
        required
      />

      <input
        type="text"
        name="skills"
        placeholder="Skills (comma separated)"
        className="w-full border border-blue-300 rounded-lg p-4"
        required
      />

      <input
        type="text"
        name="experience"
        placeholder="Experience"
        className="w-full border border-blue-300 rounded-lg p-4"
        required
      />

      <textarea
        name="whyHire"
        rows="3"
        placeholder="Why should we hire you?"
        className="w-full border border-blue-300 rounded-lg p-4"
        required
      />

      <select name="salaryRange" required className="w-full border border-blue-300 rounded-lg p-4">
        <option value="" disabled selected>Select Salary Range</option>
        <option value="0-10000">0 - 10,000</option>
        <option value="10000-20000">10,000 - 20,000</option>
        <option value="20000-30000">20,000 - 30,000</option>
        <option value="30000-50000">30,000 - 50,000</option>
        <option value="50000-70000">50,000 - 70,000</option>
        <option value="70000-100000">70,000 - 100,000</option>
        <option value="100000+">100,000+</option>
      </select>


      <input
        type="url"
        name="portfolio"
        placeholder="Portfolio Link"
        className="w-full border border-blue-300 rounded-lg p-4"
      />
      <input
        type="url"
        name="linkedin"
        placeholder="LinkedIn Profile"
        className="w-full border border-blue-300 rounded-lg p-4"
      />
      <input
        type="url"
        name="resume"
        placeholder="Resume Link"
        className="w-full border border-blue-300 rounded-lg p-4"
        required
      />

      <div className="space-y-3">
        <label className="flex gap-3 items-center">
          <input type="checkbox" name="readyToWork" className="accent-blue-500" />
          Ready to work on preferred location
        </label>
        <label className="flex gap-3 items-center">
          <input type="checkbox" name="skillsAligned" className="accent-blue-500" />
          My skills are aligned with job requirements
        </label>
        <label className="flex gap-3 items-center">
          <input type="checkbox" name="confident" className="accent-blue-500" />
          I believe I can fulfill all job responsibilities
        </label>
      </div>

      {/* Hidden fields for now - can also be made visible like job title */}
      <input type="hidden" name="job_type" value="Full-time" />
      <input type="hidden" name="category" value="Software" />
      <input type="hidden" name="location" value="Remote" />
      <input type="hidden" name="deadline" value="2025-05-15" />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-sky-400 text-white text-lg font-semibold py-3 rounded-xl transition duration-300"
      >
        Apply Now
      </button>
    </form>
  );
};

export default JobApplicationForm;
