import { useState } from "react";
import { Link } from "react-router-dom";
import { useApplicants } from "../hooks/useApplicants";
import { Skeleton } from "../../../../components/ui/skeleton";

interface Props {
  jobId: number;
}

const ApplicantListTable = ({ jobId }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { applicants, loading, error, count, next, previous, page_size } = useApplicants(jobId, currentPage);

  const totalPages = Math.ceil(count / page_size);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Applicants</h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-start border-b pb-3">
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p className="text-red-500">{error}</p>;
  if (!applicants.length) return <p>No applicants found for this job.</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Applicants</h2>
      <div className="space-y-4">
        {applicants.map((applicant) => (
          <div key={applicant.id} className="flex justify-between items-start border-b pb-3">
            <div>
              <Link
                to={`/admin/applicants/${applicant.id}`}
                className="text-base font-medium text-blue-800 hover:underline"
              >
                {applicant.full_name}
              </Link>
              <div className="text-sm text-gray-500">Job ID: {applicant.job}</div>
            </div>
            <span className="text-sm text-gray-400">
              {new Date(applicant.applied_at).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {(next || previous) && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            onClick={() => previous && setCurrentPage((p) => p - 1)}
            disabled={!previous}
            className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-4 py-1 text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => next && setCurrentPage((p) => p + 1)}
            disabled={!next}
            className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplicantListTable;
