import { loginUser, registerUser } from "@/services/auth";
import { AsyncResponse, LoginSuccessData, ErrorDetails, Login, Signup } from "@/types";
import {
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

type LoginVariables = Login;
type RegisterVariables = Signup;
type RegisterSuccessData = any; // Placeholder

// Options for the useLogin hook itself (e.g., mutationKey)
type UseLoginHookOptions = Omit<
  UseMutationOptions<
    AsyncResponse<LoginSuccessData | null>, // Internal TData
    ErrorDetails,                           // Internal TError
    LoginVariables,                         // Internal TVariables
    unknown                                 // Internal TContext
  >,
  'mutationFn' | 'onSuccess' | 'onError' | 'onSettled' // These are handled by our wrapper
>;

// Options for the wrapped mutate function that the component will call
interface LoginMutateOptions {
  onSuccess?: (data: LoginSuccessData | null, variables: LoginVariables, context: unknown) => void;
  onError?: (error: ErrorDetails, variables: LoginVariables, context: unknown) => void;
  onSettled?: (data: LoginSuccessData | null | undefined, error: ErrorDetails | null, variables: LoginVariables, context: unknown) => void;
}

export const useLogin = (hookOptions?: UseLoginHookOptions) => {
  const mutation = useMutation<
    AsyncResponse<LoginSuccessData | null>,
    ErrorDetails,
    LoginVariables,
    unknown
  >({
    mutationFn: loginUser,
    ...hookOptions, // Pass through other options like mutationKey, retry, etc.
  });

  const mutate = (variables: LoginVariables, callOptions?: LoginMutateOptions) => {
    return mutation.mutate(variables, {
      onSuccess: (response, vars, ctx) => {
        if (response.status === 'success') {
          callOptions?.onSuccess?.(response.data, vars, ctx);
        } else if (response.error) {
          callOptions?.onError?.(response.error, vars, ctx);
        } else { // Should not happen with well-formed AsyncResponse
          callOptions?.onError?.({ message: 'Login failed: Invalid response structure', statusCode: null }, vars, ctx);
        }
      },
      onError: (error, vars, ctx) => { // For network errors or direct throws from loginUser
        const errorDetails: ErrorDetails = (error && typeof error === 'object' && 'message' in error)
          ? error as ErrorDetails
          : { message: 'An unexpected error occurred', statusCode: null };
        callOptions?.onError?.(errorDetails, vars, ctx);
      },
      onSettled: (response, error, vars, ctx) => {
        if (callOptions?.onSettled) {
          if (error) {
            callOptions.onSettled(undefined, error, vars, ctx);
          } else if (response) {
            if (response.status === 'success') {
              callOptions.onSettled(response.data, null, vars, ctx);
            } else {
              callOptions.onSettled(undefined, response.error || { message: 'Unknown error in onSettled', statusCode: null }, vars, ctx);
            }
          } else {
             callOptions.onSettled(undefined, null, vars, ctx);
          }
        }
      },
    });
  };
  // Return all properties of the original mutation (isLoading, isError, data, etc.)
  // but override the mutate function with our wrapped version.
  return { ...mutation, mutate };
};


// Similar structure for useRegister
type UseRegisterHookOptions = Omit<
  UseMutationOptions<
    AsyncResponse<RegisterSuccessData | null>,
    ErrorDetails,
    RegisterVariables,
    unknown
  >,
  'mutationFn' | 'onSuccess' | 'onError' | 'onSettled'
>;

interface RegisterMutateOptions {
  onSuccess?: (data: RegisterSuccessData | null, variables: RegisterVariables, context: unknown) => void;
  onError?: (error: ErrorDetails, variables: RegisterVariables, context: unknown) => void;
  onSettled?: (data: RegisterSuccessData | null | undefined, error: ErrorDetails | null, variables: RegisterVariables, context: unknown) => void;
}

export const useRegister = (hookOptions?: UseRegisterHookOptions) => {
  const mutation = useMutation<
    AsyncResponse<RegisterSuccessData | null>,
    ErrorDetails,
    RegisterVariables,
    unknown
  >({
    mutationFn: registerUser,
    ...hookOptions,
  });

  const mutate = (variables: RegisterVariables, callOptions?: RegisterMutateOptions) => {
    return mutation.mutate(variables, {
      onSuccess: (response, vars, ctx) => {
        if (response.status === 'success') {
          callOptions?.onSuccess?.(response.data, vars, ctx);
        } else if (response.error) {
          callOptions?.onError?.(response.error, vars, ctx);
        } else {
          callOptions?.onError?.({ message: 'Registration failed: Invalid response structure', statusCode: null }, vars, ctx);
        }
      },
      onError: (error, vars, ctx) => {
        const errorDetails: ErrorDetails = (error && typeof error === 'object' && 'message' in error)
          ? error as ErrorDetails
          : { message: 'An unexpected error occurred during registration', statusCode: null };
        callOptions?.onError?.(errorDetails, vars, ctx);
      },
      onSettled: (response, error, vars, ctx) => {
        if (callOptions?.onSettled) {
          if (error) {
            callOptions.onSettled(undefined, error, vars, ctx);
          } else if (response) {
            if (response.status === 'success') {
              callOptions.onSettled(response.data, null, vars, ctx);
            } else {
              callOptions.onSettled(undefined, response.error || { message: 'Unknown error in onSettled', statusCode: null }, vars, ctx);
            }
          } else {
            callOptions.onSettled(undefined, null, vars, ctx);
          }
        }
      },
    });
  };

  return { ...mutation, mutate };
};
