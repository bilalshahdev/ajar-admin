"use client";

import TableActions from "./Actions";
import Container from "./Container";
import { DataTable } from "./custom/DataTable";
import { TableCell } from "./ui/table";
import ContactDetailForm from "./forms/ContactDetailForm";
import { useContacts, useDeleteContact } from "@/hooks/useContact";
import Tooltip from "./Tooltip";
import TableSkeleton from "./skeletons/TableSkeleton";
import ResponseError from "./ResponseError";

const ContactDetails = () => {
  const { data: contacts, isLoading, error } = useContacts();
  const { mutate: deleteContact, isPending: deleteLoading } =
    useDeleteContact();
  const cols = ["phone", "email", "address", "order", "actions"];

  const row = ({ phone, email, address, order, _id }: any) => (
    <>
      <TableCell>{phone}</TableCell>
      <TableCell>{email}</TableCell>
      <Tooltip content={address}>
        <TableCell className="w-20 truncate">{address}</TableCell>
      </Tooltip>
      <TableCell>{order}</TableCell>
      <TableCell>
        <TableActions
          id={_id}
          baseRoute="/contact-details"
          module="Contact"
          actions={["edit", "delete"]}
          onDelete={(id, closeDialog) =>
            deleteContact(id, {
              onSuccess: () => {
                closeDialog();
              },
            })
          }
          deleteLoading={deleteLoading}
          editDialog={{
            title: "Edit Contact",
            description: "Edit contact details",
            content: <ContactDetailForm id={_id} />,
          }}
        />
      </TableCell>
    </>
  );

  if (isLoading) {
    return <TableSkeleton cols={cols.length} rows={10} />;
  }

  if (error) {
    return <ResponseError error={error.message} />;
  }

  return (
    <Container
      subtitle="Contact Details"
      addBtnTitle="Contact"
      isDialog
      dialogContent={<ContactDetailForm />}
    >
      <DataTable data={contacts?.data || []} cols={cols} row={row} />
    </Container>
  );
};

export default ContactDetails;
