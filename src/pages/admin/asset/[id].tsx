import DashboardLayout from "@/components/layouts/DashboardLayout";

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
