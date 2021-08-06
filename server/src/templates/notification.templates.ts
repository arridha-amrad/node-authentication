const registerSuccess = (email: string): string =>
   `An email has been sent to ${email}, please follow the instruction to verify your account.`;
const forgotPassword = (email: string): string =>
   `An email has been sent to ${email}. Please follow to reset your password.`;
const emailVerified = (username: string): string =>
   `Welcome ${username}! Your email verification is successful. You can login with your account.`;
const duplicateData = (data: string): string =>
   `Failed. ${data} has been registered.`;
const invalidPassword = 'Invalid password';
const userNotFound = 'user not found';
const emailNotVerified = 'please verify your email';
const resetPassword =
   'Congratulations! Your password have changed successfully. Now you can login with your new password.';

export {
   registerSuccess,
   duplicateData,
   invalidPassword,
   userNotFound,
   emailNotVerified,
   forgotPassword,
   emailVerified,
   resetPassword,
};
