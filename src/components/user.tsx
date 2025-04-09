import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Small, XS } from "./typography";

const User = () => {
  const user = {
    name: "John Doe",
    role: "Admin",
    image: "/user.jpg",
  };
  return (
    <div className="flex items-center gap-2">
      <div className="text-sm text-white">
        <div className="font-medium">{user.name}</div>
        <div className="text-xs">{user.role}</div>
      </div>
      <Avatar className="rounded-lg">
        <AvatarImage src={user.image} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default User;
