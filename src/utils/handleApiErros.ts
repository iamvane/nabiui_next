export const getError = (e: any, type?: string | string[]): string => {
  if (e.response && e.response.data) {
    const {data} = e.response;
    if (type && Array.isArray(type)) {
      const errorType = type.find((errorType) => {
        return data.errors[errorType];
      });

      return data.errors[errorType][0];
    }
    if (data.message) {
      return data.message;
    }
    if (data.detail) {
      return data.detail;
    } else if (data['__all__']) {
      return data['__all__'][0];
    } else if (data['non_field_errors']) {
      return data['non_field_errors'][0];
    } else if (data.error) {
      if (type) {
        return data.error[type as string][0];
      }
    }
  }
  return e.message;
};
