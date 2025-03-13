import { supabase } from "@infra/databases/supabase";

export function useAuthRepository() {
  /**
   * Signs up a new user with the provided email and password using the Supabase authentication service.
   *
   * @param email - The email address of the new user.
   * @param password - The password for the new user.
   * @returns A Promise that resolves to the sign-up response from Supabase.
   */
  function signUpWithEmailProvider(email: string, password: string) {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          hasProfile: false,
        },
      }
    });
  }

  /**
   * Authenticates a user with an email and password using the Supabase authentication service.
   *
   * @param email - The email address of the user.
   * @param password - The password of the user.
   * @returns A Promise that resolves to the authentication response from Supabase.
   */
  function signInWithEmailProvider(email: string, password: string) {
    return supabase.auth.signInWithPassword({ 
      email,
      password
    });
  }

  /**
   * Retrieves the current authenticated session from the Supabase authentication service.
   *
   * @returns A Promise that resolves to the current authenticated session.
   */
  function getLoggedSession() {
    return supabase.auth.getSession();
  }

  /**
   * Signs out the currently authenticated user from the Supabase authentication service.
   *
   * @returns A Promise that resolves when the user is successfully signed out.
   */
  function logout() {
    return supabase.auth.signOut({ scope: "local" });
  }

  /**
   * Confirms an OTP (one-time password) token sent to the specified email address using the Supabase authentication service.
   * @param email - The email address of the user.
   * @param token - The OTP token sent to the user's email.
   * @returns A Promise that resolves to the response from the OTP token verification.
   */
  function confirmOtpToken(email: string, token: string) {
    return supabase.auth.verifyOtp({
      email,
      token,
      type: "signup"
    });
  }

  /**
     * Sends a password reset email to the specified email address using the Supabase authentication service.
     * @param email - The email address of the user requesting a password reset.
     * @returns A Promise that resolves to the response from the password reset request.
     */
    function sendForgetPasswordToken(email: string) {
      return supabase.auth.resetPasswordForEmail(email, {
        redirectTo: ""
      });
    }
  

  return {
    signUpWithEmailProvider,
    signInWithEmailProvider,
    getLoggedSession,
    logout,
    confirmOtpToken,
    sendForgetPasswordToken
  }
}