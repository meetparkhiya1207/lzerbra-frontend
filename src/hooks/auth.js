import useSWRMutation from "swr/mutation";
import { actionFetcher } from "../api/swrconfig";

export const useRegister = () => {
    const { trigger, isMutating, error } = useSWRMutation(
        "/customer/register",
        actionFetcher
    );

    return {
        registerCustomer: trigger,
        isMutating,
        error,
    };
};
export const useLogin = () => {
    const { trigger, isMutating, error } = useSWRMutation(
        "/customer/login",
        actionFetcher
    );

    return {
        loginCustomer: trigger,
        isMutating,
        error,
    };
};

export const useVerifyOTP = () => {
    const { trigger, isMutating, error } = useSWRMutation(
        "/customer/verify-otp",
        actionFetcher
    );

    return {
        verifyOtp: trigger,
        isMutatingOtp: isMutating,
        error,
    };
};
export const useResendOTP = () => {
    const { trigger, isMutating, error } = useSWRMutation(
        "/customer/resend-otp",
        actionFetcher
    );

    return {
        resendOtp: trigger,
        isMutatingResendOtp: isMutating,
        error,
    };
};
export const useForgotPassword = () => {
    const { trigger, isMutating, error } = useSWRMutation(
        "/customer/forgot-password",
        actionFetcher
    );

    return {
        userForgotPasswordTriger: trigger,
        isMutating: isMutating,
        error,
    };
};

export const useResetPassword = () => {
    const { trigger, isMutating, error } = useSWRMutation(
        "/customer/reset-password",
        actionFetcher
    );

    return {
        userResetPasswordTriger: trigger,
        isMutating: isMutating,
        error,
    };
};
