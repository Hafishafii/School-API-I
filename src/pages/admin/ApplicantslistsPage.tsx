import { useParams } from "react-router-dom";
import ApplicantListTable from "../../features/admin/Applicantlist/components/ApplicantListTable";

const ApplicantslistsPage = () => {
  const { jobId } = useParams<{ jobId: string }>();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ApplicantListTable jobId={Number(jobId)} />
    </div>
  );
};

export default ApplicantslistsPage;
