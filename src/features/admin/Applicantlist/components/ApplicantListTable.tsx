import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useApplicants } from "../hooks/useApplicants";
import { Skeleton } from "../../../../components/ui/skeleton";

interface Props {
  jobId: number;
}

const ApplicantListTable = ({ jobId }: Props) => {
  const {
    applicants,
    loading,
    error,
    setUrl,
    currentPage,
    getVisiblePages,
    previous,
    next,
  } = useApplicants(jobId);

  // Reset when jobId changes
  useEffect(() => {
    setUrl("/applications/");
  }, [jobId, setUrl]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Applicants</h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-start border-b pb-3"
            >
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
  if (!applicants.length)
    return (
      <p className="text-center text-gray-500">No applicants found.</p>
    );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Applicants</h2>
      <div className="space-y-4">
        {applicants.map((applicant) => (
          <div
            key={applicant.id}
            className="flex justify-between items-start border-b pb-3"
          >
            <div>
              <Link
                to={`/admin/applicants/${applicant.id}`}
                className="text-base font-medium text-blue-800 hover:underline"
              >
                {applicant.full_name}
              </Link>
              <div className="text-sm text-gray-500">
                Job ID: {applicant.job}
              </div>
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
          {/* Prev */}
          <button
            disabled={!previous}
            onClick={() =>
              previous && setUrl(previous)
            }
            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Prev
          </button>

          {/* Page Numbers */}
          {getVisiblePages(5).map((page) => (
            <button
              key={page}
              onClick={() => setUrl(`/applications/?page=${page}`)}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            disabled={!next}
            onClick={() =>
              next && setUrl(next)
            }
            className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplicantListTable;
