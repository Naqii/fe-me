interface ICategory {
  _id?: string;
  name?: string;
  description?: string;
  icon?: {
    url: string;
    publicId: string;
    resourceType: string;
  };
}

interface ICategoryForm extends ICategory {
  url?: string;
  publicId?: string;
  resourceType?: string;
}

export type { ICategory, ICategoryForm };
