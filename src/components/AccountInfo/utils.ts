export const phoneValidationToApi = (phoneNumber: string, verificationChannel: string) => ({
  phone_number: `+1${phoneNumber}`,
  channel: verificationChannel,
});

export const tokenValidationToApi = (phoneNumber: string, token: string) => ({
  phone_number: `+1${phoneNumber}`,
  code: token,
});
