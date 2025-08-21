import { useParams, useNavigate } from "react-router-dom";
import { useCareers } from "./hooks/useCareers";
import { FaUserCircle } from "react-icons/fa";

const CareerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { careers, isLoading } = useCareers({ page: 1, search: "", statusFilter: "All" });

  const navigate = useNavigate();

  // Convert id to number before finding
  const career = careers.find((c) => c.id === Number(id));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!career) {
    return <p className="text-red-500 text-center mt-10">Career not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10">
      <div className="bg-white shadow-md rounded-md overflow-hidden">
        {/* Header */}
        <div className="bg-gray-300 flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-800 text-white rounded-full p-2 text-xl">
              <FaUserCircle />
            </div>
            <span className="font-medium text-gray-700">{career.title}</span>
          </div>
          <button
            className="text-sm text-blue-600 font-medium hover:underline"
            onClick={() => navigate(`/admin/edit-vaccancy/${career.id}`)}
          >
            Edit
          </button>
        </div>

        {/* Job Info */}
        <div className="p-5 space-y-2">
          <div>
            <strong className="text-gray-800">Job Title:</strong>{" "}
            <span className="text-gray-700">{career.title}</span>
          </div>
          <div>
            <strong className="text-gray-800">Department:</strong>{" "}
            <span className="text-gray-700">{career.department}</span>
          </div>
          <div>
            <strong className="text-gray-800">Job Type:</strong>{" "}
            <span className="text-gray-700">{career.job_type}</span>
          </div>
          <div>
            <strong className="text-gray-800">Vacancies:</strong>{" "}
            <span className="text-gray-700">{career.vacancies}</span>
          </div>
          <div>
            <strong className="text-gray-800">Qualification:</strong>{" "}
            <span className="text-gray-700">{career.qualification}</span>
          </div>
          <div>
            <strong className="text-gray-800">Apply By:</strong>{" "}
            <span className="text-gray-700">{career.last_date}</span>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-white border-t p-5 space-y-4">
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-1">Job Description</h4>
            {career.job_description_pdf ? (
              <a
                href={career.job_description_pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Download Job Description
              </a>
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed">
                No detailed job description provided.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDetail;
