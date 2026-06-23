import { AuthLayout } from "../../components/layout/AuthLayout";
import { RegisterForm } from "../../components/auth/RegisterForm";

export function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start organizing your travel plans in one place."
    >
      <RegisterForm />
    </AuthLayout>
  );
}