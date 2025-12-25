import Link from "next/link";
import MyImage from "../custom/MyImage";

const AuthForm = ({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "login" | "signup";
}) => {
  const login = type === "login";
  return (
    <div className="h-screen flex items-center justify-center md:gap-8 bg-secondary/50">
      <MyImage
        src={`/images/${type}.png`}
        alt={type}
        width={500}
        height={500}
        className="hidden md:block"
      />

      <div className="space-y-4 p-4 md:p-8 bg-background rounded">
        <div className="flex flex-col items-center justify-center gap-4">
          <MyImage
            src="/images/brand.png"
            alt="Login"
            width={100}
            height={100}
          />
          <p>{login ? "Login to your account" : "Create an account"}</p>
        </div>
        <div className="flex flex-col items-center w-xs max-h-80 p-4 overflow-y-auto">
          {children}
        </div>
        <div className="text-center">
          <p className="text-muted-foreground">
            {login ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              href={`/auth/${login ? "signup" : "login"}`}
              className="text-signature font-semibold"
            >
              {login ? "Sign Up" : "Login"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
