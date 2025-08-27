import { api } from "@/lib/axios";
import { ApiResponse, Contact } from "@/types";

type GetContactsResponse = ApiResponse<Contact[]>;
type GetContactResponse = ApiResponse<Contact>;

export const getContacts = async (): Promise<GetContactsResponse> => {
  const response = await api.get("/contact-us");
  return response.data;
};

export const getContact = async (
  contactId: string
): Promise<GetContactResponse> => {
  const response = await api.get(`/contact-us/${contactId}`);
  return response.data;
};

// ✅ Add a new contact
export const addContact = async (contactData: Partial<Contact>) => {
  const response = await api.post("/contact-us", contactData);
  return response.data;
};

// ✅ Update contact by ID
export const updateContact = async (
  contactId: string,
  contactData: Partial<Contact>
) => {
  const response = await api.patch(`/contact-us/${contactId}`, contactData);
  return response.data;
};

// ✅ Delete contact by ID
export const deleteContact = async (contactId: string) => {
  const response = await api.delete(`/contact-us/${contactId}`);
  return response.data;
};
