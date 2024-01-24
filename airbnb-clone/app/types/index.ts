import { User } from "@prisma/client";

export type SafeUser = Omit<User, "createdAt" | "updateAt" | "emailVerified"> & {
    createAt: string;
    updateAt: string;
    emailVerified: string | null;
};
