import { Resend } from "resend";

export let baseUrl: string
if (process.env.NODE_ENV !== 'production') {
    baseUrl = process.env.BASE_URL ?? "http://localhost:3000/"
} else {
    baseUrl = process.env.BASE_URL ?? "https://pvc-tms.vercel.app/"
}

export const resend = new Resend(`${process.env.RESEND_API_KEY}`);
