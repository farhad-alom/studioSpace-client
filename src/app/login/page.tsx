import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

const LoginPage = () => {
    return (
        <Suspense fallback={<div className="min-h-[70vh]" />}>
            <LoginForm />
        </Suspense>
    );
};

export default LoginPage;