import { api } from "@/lib/axios";

// ---------------- Types ----------------

export interface ZoneFormSetting {
  commissionType: "fixed" | "percentage";
  leaserCommission: number;
  renterCommission: number;
  tax: number;
  expiry: string; // ISO format
}

export interface ZoneFormField {
  _id: string;
  name: string;
  label: string;
  type: string;
  placeholder: string;
  isMultiple: boolean;
  options?: string[];
  order?: number;
  tooltip?: string;
  visible: boolean;
  defaultValue?: string;
  readonly: boolean;
  validation?: {
    required?: boolean;
  };
  min?: number;
  max?: number;
  language: string;
  languages?: any[];
}

export interface ZoneForm {
  _id: string;
  name: string;
  description: string;
  language: string;
  subCategory: string | any;
  zone: string | any;
  fields: ZoneFormField[];
  setting: ZoneFormSetting;
  languages?: Array<{
    locale: string;
    translations: {
      name: string;
      description: string;
    };
    _id: string;
  }>;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetZoneFormsResponse {
  success: boolean;
  message: string;
  data: {
    forms: ZoneForm[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface GetZoneFormDetailsResponse {
  success: boolean;
  message: string;
  data: ZoneForm;
}

// ---------------- API Services ----------------

export const getAllZoneForms = async (): Promise<GetZoneFormsResponse> => {
  const response = await api.get("/forms");
  return response.data;
};

export const getZoneFormById = async (
  formId: string
): Promise<GetZoneFormDetailsResponse> => {
  const response = await api.get(`/forms/${formId}`);
  return response.data;
};

export const getZoneFormByZoneAndSubCategory = async (
  zoneId: string,
  subCategoryId: string
): Promise<GetZoneFormDetailsResponse> => {
  const response = await api.get(`/forms/form`, {
    params: {
      zone: zoneId,
      subCategory: subCategoryId,
    },
  });
  return response.data;
};

export const addZoneForm = async (formData: Omit<ZoneForm, "_id">) => {
  const response = await api.post("/forms", formData);
  return response.data;
};

export const updateZoneForm = async (
  formId: string,
  formData: Partial<ZoneForm>
) => {
  const response = await api.patch(`/forms/${formId}`, formData);
  return response.data;
};

export const deleteZoneForm = async (formId: string) => {
  const response = await api.delete(`/forms/${formId}`);
  return response.data;
};
