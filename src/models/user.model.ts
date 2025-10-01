export type User = {
    username: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
}

export type FetchedUser = User & { id: string }
export type UpdateUser = Partial<User>
 
export async function UserFetchMany(page: number, count: number): Promise<FetchedUser[]> {}
export async function UserFetch(id: string): Promise<FetchedUser> {}
export async function UserCreate(newUser: User): Promise<void> {}
export async function UserUpdate(id: string, updateUser: UpdateUser): Promise<void> {}
export async function UserDelete(id: string): Promise<void> {}