export const phoneValidationToApi = (phoneNumber: string, verificationChannel: string) => ({
  phone_number: phoneNumber,
  channel: verificationChannel,
});

export const tokenValidationToApi = (phoneNumber: string, token: string) => ({
  phone_number: phoneNumber,
  code: token,
});
