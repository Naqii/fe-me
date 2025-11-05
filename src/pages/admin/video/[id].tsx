import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailVideo from "@/components/views/Admin/DetailVideo";

const AdminDetailVideoPage = () => {
  return (
    <DashboardLayout
      title="Detail Video"
      description="Manage Information of Detail Video."
      type="admin"
    >
      <DetailVideo />
    </DashboardLayout>
  );
};

export default AdminDetailVideoPage;
