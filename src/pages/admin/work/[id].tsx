import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailWork from "@/components/views/Admin/DetailWork";

const AdminDetailWorkPage = () => {
  return (
    <DashboardLayout
      title="Detail Work"
      description="Manage Information of Detail Work."
      type="admin"
    >
      <DetailWork />
    </DashboardLayout>
  );
};

export default AdminDetailWorkPage;
