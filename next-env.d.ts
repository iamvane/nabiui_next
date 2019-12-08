/// <reference types="next" />
/// <reference types="next/types/global" />
declare global {
    interface Window {
        analytics: any;
        __insp: any;
    }
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.gif'
