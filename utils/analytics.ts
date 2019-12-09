const analytics = (window as any)['analytics'];

export const page = (str: string, obj: Object) => {
    if (window && analytics) {
        analytics.page(str, obj);
    }
};

export const track = (str: string, obj: Object) => {
    if (window && analytics) {
        analytics.track(str, obj);
    }
};

export const identify = (str: string, obj: Object) => {
    if (window && analytics) {
        analytics.identify(str, obj);
    }
};
