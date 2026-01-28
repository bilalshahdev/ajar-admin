import AuthForm from "@/components/forms/AuthForm";
import SignupForm from "@/components/forms/SignupForm";

const SignupPage = () => {
  return (
    <AuthForm type="signup">
      <SignupForm />
    </AuthForm>
  );
};

export default SignupPage;
