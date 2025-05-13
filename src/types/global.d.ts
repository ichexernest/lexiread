export {}
export type Roles = 'admin' | 'user';

declare global {
    interface CostumJwtSessionCliams{
        metadata: {
            role?: Roles
        }
    }
    }