import DashboardLayout from "@/components/layouts/DashboardLayout";
import Work from "@/components/views/Admin/Work";

const AdminWorkPage = () => {
  return (
    <DashboardLayout
      title="Work"
      description="List of all Work, create new Work, and manage existing Works."
      type="admin"
    >
      <Work />
    </DashboardLayout>
  );
};

export default AdminWorkPage;
