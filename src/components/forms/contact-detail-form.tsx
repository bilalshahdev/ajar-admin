"use client";

import { contactData } from "@/config/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import TextInput from "./fields/text-input";
const ContactDetailForm = ({ id }: { id?: string }) => {
  const contact = contactData.find((contact) => contact._id === id);

  const initialData = {
    phone: contact?.phone || "",
    email: contact?.email || "",
    address: contact?.address || "",
    order: contact?.order || 1,
  };

  const schema = z.object({
    phone: z.string().min(10).max(15),
    email: z.string().email(),
    address: z.string().min(5, "Address must be at least 5 characters long"),
    order: z.number().min(1, "Order must be at least 1"),
  });

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  const { handleSubmit, control } = methods;
  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="space-y-2"
    >
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
      <Button type="submit" variant="button">
        Submit
      </Button>
    </form>
  );
};

export default ContactDetailForm;
