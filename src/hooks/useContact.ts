import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
} from "@/services/contact";
import { Contact } from "@/types";
import { toast } from "sonner";

// ✅ Get All Contacts
export const useContacts = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });
};

// ✅ Get Single Contact by ID
export const useContact = (contactId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["contact", contactId],
    queryFn: () => getContact(contactId),
    enabled,
  });
};

// ✅ Add New Contact
export const useAddContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Contact added successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

// ✅ Update Contact
export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      contactId,
      data,
    }: {
      contactId: string;
      data: Partial<Contact>;
    }) => updateContact(contactId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Contact updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

// ✅ Delete Contact
export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contactId: string) => deleteContact(contactId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Contact deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};
