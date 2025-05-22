import { z } from 'zod';

export const Account = z.object({
    id: z.string(),
    fullName: z.string().optional(),
    imageUrl: z.string(),
    emailAddresses: z.array(
        z.object({
        id: z.string(),
        emailAddress: z.string(),
        verification: z.object({
            status: z.string().nullable(),
            strategy: z.string().nullable(),
        }).nullable(),
        })
    ),
    externalAccounts: z.array(
        z.object({
            id: z.string(),
            provider: z.string(),
            emailAddress: z.string().nullable(),
            username: z.string().nullable(),
        })
    ),
    hasPassword: z.boolean(),
});


export type Account = z.infer<typeof Account>;