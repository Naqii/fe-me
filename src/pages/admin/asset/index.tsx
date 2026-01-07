import DashboardLayout from "@/components/layouts/DashboardLayout";
import Asset from "@/components/views/Admin/Asset";

const AdminAssetPage = () => {
  return (
    <DashboardLayout
      title="Asset"
      description="List of all Asset, create new Asset, and manage existing Assets."
      type="admin"
    >
      <Asset />
    </DashboardLayout>
  );
};

export default AdminAssetPage;
