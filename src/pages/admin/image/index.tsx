import DashboardLayout from "@/components/layouts/DashboardLayout";
import Img from "@/components/views/Admin/Image";

const AdminImagePage = () => {
  return (
    <DashboardLayout
      title="Image"
      description="List of all Image, create new Image, and manage existing images."
      type="admin"
    >
      <Img />
    </DashboardLayout>
  );
};

export default AdminImagePage;
