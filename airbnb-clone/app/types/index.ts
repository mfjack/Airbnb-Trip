import { Listing, User } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
    createdAt: string;
};

export type SafeUser = Omit<
    User,
    "createdAt" | "updateAt" | "emailVerified"
> & {
    createAt: string;
    updateAt: string;
    emailVerified: string | null;
};
