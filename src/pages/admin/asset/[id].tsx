import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailAsset from "@/components/views/Admin/DetailAsset";

const AdminDetailAssetPage = () => {
  return (
    <DashboardLayout
      title="Detail Asset"
      description="Manage Information of Detail Asset."
      type="admin"
    >
      <DetailAsset />
    </DashboardLayout>
  );
};

export default AdminDetailAssetPage;
