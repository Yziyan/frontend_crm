

export interface ILoginType {
    token: string,
    userInfo: {},
    DIR: any,
    Permissions: string[]
}

export interface IUserInfo {
    department: Object,
    roles: any[],
    user: Object
}
