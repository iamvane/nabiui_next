/// <reference types="next" />
/// <reference types="next/types/global" />
declare global {
    interface Window {
        analytics: any;
        __insp: any;
    }
}
