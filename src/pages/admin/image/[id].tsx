import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailImage from "@/components/views/Admin/DetailImage";

const AdminDetailImagePage = () => {
  return (
    <DashboardLayout
      title="Detail Image"
      description="Manage Information of Detail Image."
      type="admin"
    >
      <DetailImage />
    </DashboardLayout>
  );
};

export default AdminDetailImagePage;
