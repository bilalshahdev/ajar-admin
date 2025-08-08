import { api } from "@/lib/axios";
import { Contact } from "@/types";

export interface GetContactsResponse {
  success: boolean;
  message: string;
  data: Contact[];
}

export interface GetContactResponse {
  success: boolean;
  message: string;
  data: Contact;
}

// ✅ Fetch all contacts
export const getContacts = async (): Promise<GetContactsResponse> => {
  const response = await api.get("/contact-us");
  return response.data;
};

// ✅ Get single contact by ID
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
