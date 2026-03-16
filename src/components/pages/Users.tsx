"use client";
import Loader from "@/components/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell } from "@/components/ui/table";
import { statusColors } from "@/config/data";
import {
  useDeleteUser,
  useGetUsers,
  useUpdateUserStatus,
} from "@/hooks/useUsers";
import { cn } from "@/lib/utils";
import { User, UserStatus } from "@/types";
import { useState } from "react";
import { IoDocuments } from "react-icons/io5";
import TableActions from "../Actions";
import StatsCard from "../cards/StatsCard";
import { DataTable } from "../custom/DataTable";
import ResponseError from "../ResponseError";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import UserDetailsLazy from "../UserDetails";
import Tooltip from "../Tooltip";
import { useTranslations } from "next-intl";
import { SearchInput } from "../custom/SearchInput";
import { useDebounce } from "@/hooks/use-debounce";
import DateRangePicker from "@/components/DateRangePicker";
import { useSearchParams } from "next/navigation";

const userStatus = ["active", "inactive", "blocked", "unblocked"];
const documentStatuses = ["pending", "approved", "rejected"];

const Users = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  const initialDocumentStatus = searchParams.get("documentStatus") || undefined;

  // Filter states
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [documentStatus, setDocumentStatus] = useState<string | undefined>(initialDocumentStatus);
  const [fromDate, setFromDate] = useState<string | undefined>(undefined);
  const [toDate, setToDate] = useState<string | undefined>(undefined);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, error } = useGetUsers({
    page,
    limit: 10,
    search: debouncedSearch,
    status: statusFilter,
    documentStatus,
    fromDate,
    toDate,
  });
  const { mutate: deleteUser, isPending: deleteLoading } = useDeleteUser();
  const { mutate: updateUserStatus, isPending: updateLoading } = useUpdateUserStatus();

  if (isLoading) return <Loader />;
  if (error) return <ResponseError error={error.message} />;

  const { users, stats, pagination } = data?.data || {};
  const { total, page: currentPage, limit } = pagination || {};

  const handleUpdateUserStatus = (id: string, status: UserStatus) => {
    updateUserStatus({ id, status });
  };

  const {
    totalActiveUsers,
    totalBlockedUsers,
    totalInactiveUsers,
    totalUsers,
  } = stats || {};

  const UserStats = [
    { title: "totalUsers", value: totalUsers?.toString() || "0" },
    { title: "activeUsers", value: totalActiveUsers?.toString() || "0" },
    { title: "inactiveUsers", value: totalInactiveUsers?.toString() || "0" },
    { title: "blockedUsers", value: totalBlockedUsers?.toString() || "0" },
  ];

  const cols = ["userNo", "name", "phone", "email", "status", "documents", "actions"];

  const row = (user: User) => (
    <>
      <TableCell>{user._id.slice(0, 4)}</TableCell>
      <TableCell>{user.name || "—"}</TableCell>
      <TableCell>{user.phone || "—"}</TableCell>
      <TableCell>{user.email || "—"}</TableCell>
      <TableCell>
        <Select
          defaultValue={user.status}
          onValueChange={(value) =>
            handleUpdateUserStatus(user._id, value as UserStatus)
          }
          disabled={updateLoading}
        >
          <SelectTrigger className="capitalize w-[160px]">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  statusColors[user.status as UserStatus] || "bg-gray-300"
                )}
              />
              <SelectValue placeholder={t("translation.selectStatus")} />
            </div>
          </SelectTrigger>
          <SelectContent>
            {userStatus.map((status) => (
              <SelectItem key={status} value={status} className="capitalize">
                {t(`status.${status}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger>
            <Tooltip content="viewDocuments">
              <IoDocuments size={18} className="text-blue-500 cursor-pointer" />
            </Tooltip>
          </DialogTrigger>
          <DialogContent className="max-h-[600px] overflow-scroll">
            <DialogHeader>
              <DialogTitle>{t(`translation.documents`)}</DialogTitle>
            </DialogHeader>
            <UserDetailsLazy userId={user._id} />
          </DialogContent>
        </Dialog>
      </TableCell>
      <TableCell className="flex gap-4">
        <TableActions
          id={user._id}
          baseRoute="/users"
          module="User"
          actions={["delete"]}
          onDelete={(id, close) => {
            deleteUser(id);
            close();
          }}
        />
      </TableCell>
    </>
  );

  return (
    <div className="flex flex-col gap-4 md:gap-8 h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {UserStats.map((data: any) => (
          <StatsCard key={data.title} label={data.title} value={data.value} />
        ))}
      </div>

      {/* Filters row*/}
      <div className="flex items-center justify-end gap-4">

        {/* Filter by document status */}
        <Select
          value={documentStatus ?? "all"}
          onValueChange={(value) => {
            setPage(1);
            setDocumentStatus(value === "all" ? undefined : value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("translation.documentStatus")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("translation.allDocuments")}</SelectItem>
            {documentStatuses.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {t(`status.${s}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DateRangePicker
          fromDate={fromDate}
          toDate={toDate}
          onFromChange={(val) => { setPage(1); setFromDate(val); }}
          onToChange={(val) => { setPage(1); setToDate(val); }}
        />

        {/* Filter by user status */}
        <Select
          value={statusFilter ?? "all"}
          onValueChange={(value) => {
            setPage(1);
            setStatusFilter(value === "all" ? undefined : value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("translation.userStatus")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("translation.allStatuses")}</SelectItem>
            {userStatus.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {t(`status.${s}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search by name */}
        <SearchInput
          className="w-full"
          onChange={(value) => {
            setPage(1);
            setSearch(value || undefined);
          }}
          placeholder="searchUsers"
        />
      </div>

      <DataTable
        data={users || []}
        cols={cols}
        row={row}
        pagination={{
          total: total || 0,
          page: currentPage || 1,
          limit: limit || 10,
          setPage,
        }}
      />
    </div>
  );
};

export default Users;