import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("StudioSpace");

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
        autoSignIn: false, // register-এর পর login page-এ যাবে
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },

    trustedOrigins: [
        "http://localhost:3000",
        "https://studio-space-client-five.vercel.app",
    ],
});