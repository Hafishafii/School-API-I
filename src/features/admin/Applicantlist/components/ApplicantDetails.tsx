import { useParams } from "react-router-dom";
import { useApplicant } from "../hooks/useApplicant";
import { Skeleton } from "../../../../components/ui/skeleton";
import { Button } from "../../../../components/ui/button";
import { Download } from "lucide-react";

const ApplicantDetails = () => {
  const { id } = useParams();
  const { applicant, loading, error } = useApplicant(id);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-md max-w-4xl mx-auto animate-pulse">
        <div className="flex items-center mb-6">
          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-6 w-48" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mt-4">
          <Skeleton className="w-full md:w-1/2 h-[600px] rounded-xl" />
          <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-xl border space-y-4">
            <Skeleton className="h-5 w-40" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error)
    return <div className="text-center text-red-500 p-8">{error}</div>;
  if (!applicant)
    return <div className="text-center p-8">Applicant not found.</div>;

  // Ensure absolute URL for PDF
  const resumeUrl =
    applicant.resume.startsWith("http")
      ? applicant.resume
      : `${import.meta.env.VITE_API_URL}${applicant.resume}`;

  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap">
        <div>
          <p className="text-sm text-gray-500">Applicant info</p>
          <h2 className="text-xl font-semibold">
            {applicant.full_name}
            <span className="font-normal text-sm"> • Job #{applicant.job}</span>
          </h2>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col md:flex-row gap-8 mt-4">
        {/* PDF Viewer + Download */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="h-[600px] border rounded-xl overflow-hidden shadow-sm">
            <embed
              src={resumeUrl}
              type="application/pdf"
              className="w-full h-full"
            />
          </div>

          <div className="mt-4">
            <a
              href={resumeUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full flex items-center justify-center gap-2 bg-gray-400 text-gray-800 hover:bg-gray-300">
                <Download size={16} />
                Download Resume
              </Button>
            </a>
          </div>
        </div>

        {/* General Information */}
        <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-xl border">
          <h3 className="text-lg font-semibold mb-4">General Information</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span className="font-semibold">Full Name:</span>
              <span className="text-black font-medium">{applicant.full_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Email:</span>
              <span>{applicant.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Phone Number:</span>
              <span>{applicant.phone_number}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Years of Experience:</span>
              <span>{applicant.years_of_experience}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Qualification:</span>
              <span>{applicant.qualification}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Current Location:</span>
              <span>{applicant.current_location}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Applied At:</span>
              <span>{new Date(applicant.applied_at).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetails;
