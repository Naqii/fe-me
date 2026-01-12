import DashboardLayout from "@/components/layouts/DashboardLayout";
import Category from "@/components/views/Admin/Category";

const AdminCategoryPage = () => {
  return (
    <DashboardLayout
      title="Category"
      description="List of all Category, create new Category, and manage existing Categorys."
      type="admin"
    >
      <Category />
    </DashboardLayout>
  );
};

export default AdminCategoryPage;
