const analytics =  typeof window !== 'undefined' && (window as any)['analytics'];

export const page = (str: string, obj: Object) => {
  if (typeof window !== 'undefined' && typeof analytics !== 'undefined') {
    analytics.page(str, obj);
  }
};

export const track = (str: string, obj: Object) => {
  if (typeof window !== 'undefined' && typeof analytics !== 'undefined') {
    analytics.track(str, obj);
  }
};

export const identify = (str: string, obj: Object) => {
  if (typeof window !== 'undefined' && typeof analytics !== 'undefined') {
    analytics.identify(str, obj);
  }
};
