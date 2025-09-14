import useSWRMutation from "swr/mutation";
import { actionFetcher } from "../api/swrconfig";

export const useRegister = () => {
    // SWR mutation hook
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
    // SWR mutation hook
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
    // SWR mutation hook
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
    // SWR mutation hook
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
