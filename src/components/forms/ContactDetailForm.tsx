"use client";

import {
  useAddContact,
  useContact,
  useUpdateContact,
} from "@/hooks/useContact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import TextInput from "./fields/TextInput";
import { toast } from "sonner";
import Loader from "../Loader";
const ContactDetailForm = ({
  id,
  closeDialog,
}: {
  id?: string;
  closeDialog?: () => void;
}) => {
  const isEditMode = Boolean(id);
  const { data: contact } = useContact(id!, isEditMode);

  const initialData = useMemo(
    () => ({
      phone: contact?.data?.phone || "",
      email: contact?.data?.email || "",
      address: contact?.data?.address || "",
      order: contact?.data?.order || 1,
    }),
    [contact]
  );

  const schema = z.object({
    phone: z.string().min(10).max(15),
    email: z.string().email(),
    address: z.string().min(5, "Address must be at least 5 characters long"),
    order: z.number().min(1, "Order must be at least 1"),
  });

  const { reset, handleSubmit, control } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (contact) {
      reset(initialData);
    }
  }, [contact, reset, initialData]);

  const { mutateAsync: addContactMutation, isPending: addLoading } =
    useAddContact();
  const { mutateAsync: updateContactMutation, isPending: updateLoading } =
    useUpdateContact();

  const isLoading = addLoading || updateLoading;

  // ✅ Only return null later
  if (isEditMode && !contact) {
    toast.error("Contact not found");
    return null;
  }

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      if (isEditMode) {
        await updateContactMutation({ contactId: id!, data });
      } else {
        await addContactMutation(data);
      }

      reset();
      closeDialog?.();
    } catch (error) {
      console.error("Contact mutation error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <TextInput
        name="phone"
        label="Phone"
        placeholder="Enter phone"
        control={control}
      />
      <TextInput
        name="email"
        label="Email"
        placeholder="Enter email"
        control={control}
      />
      <TextInput
        name="address"
        label="Address"
        placeholder="Enter address"
        control={control}
      />
      <TextInput
        name="order"
        label="Order"
        placeholder="Enter order"
        control={control}
      />
      <Button
        type="submit"
        variant="button"
        disabled={isLoading}
        className="w-full mt-4"
      >
        {isLoading ? <Loader /> : id ? "Update" : "Add"}
      </Button>
    </form>
  );
};

export default ContactDetailForm;
