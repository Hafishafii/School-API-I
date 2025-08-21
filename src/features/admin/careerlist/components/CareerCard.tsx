// src/features/admin/careerlist/components/CareerCard.tsx
import type { Career } from "../types";
import { Link } from "react-router-dom";

const CareerCard = ({
  id,
  title,
  department,
  subject,
  job_type,
  vacancies,
  qualification,
  posted_at,
  last_date,
  is_active,
}: Career) => {
  return (
    <div className="rounded-lg shadow overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gray-200 text-center py-2">
        <h4 className="text-gray-800 font-semibold text-sm">{title}</h4>
      </div>

      <div className="bg-white p-5 space-y-2">
        <h3 className="text-md font-bold text-gray-800">{subject}</h3>
        <p className="text-sm text-gray-600">Department: {department}</p>
        <p className="text-sm">Job Type: {job_type}</p>
        <p className="text-sm">Vacancies: {vacancies}</p>
        <p className="text-sm">Qualification: {qualification}</p>
        <p className="text-sm">Posted: {new Date(posted_at).toLocaleDateString()}</p>
        <p className="text-sm text-gray-500">Apply by: {new Date(last_date).toLocaleDateString()}</p>

        {/* Status */}
        <p
          className={`text-sm font-semibold ${
            is_active ? "text-green-600" : "text-red-500"
          }`}
        >
          {is_active ? "Open" : "Closed"}
        </p>

        {/* Buttons */}
        <div className="flex justify-between items-center pt-2">
          <Link to={`/admin/career/${id}/applicants`}>
            <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded shadow hover:bg-gray-800">
              View Applicants
            </button>
          </Link>

          <Link to={`/admin/career/${id}`}>
            <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded shadow hover:bg-gray-800">
              View More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CareerCard;
