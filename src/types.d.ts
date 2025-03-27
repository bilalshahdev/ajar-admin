import { IconType } from "react-icons/lib";

interface NavMenuItem {
  title: string;
  path: string;
  icon: React.ElementType;
}

type Auth = {
  username: string;
  password: string;
};

type Login = Auth;

type Signup = Auth & {
  confirmPassword: string;
};

type MenuItem = {
  href: string;
  label: string;
  icon: ElementType;
};

type DashboardStat = {
  title: string;
  value: number | string;
  icon: IconType;
  bgColor: string;
};
