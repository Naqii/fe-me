import DashboardLayout from "@/components/layouts/DashboardLayout";
import Video from "@/components/views/Admin/Video";

const AdminVideoPage = () => {
  return (
    <DashboardLayout
      title="Video"
      description="List of all Video, create new Video, and manage existing videos."
      type="admin"
    >
      <Video />
    </DashboardLayout>
  );
};

export default AdminVideoPage;
