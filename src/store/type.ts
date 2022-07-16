import {ILoginType} from "@/store/login/type";
import {ISystemType} from "@/store/main/system/type";
import {IUserInfoType} from "@/store/main/user-info/type";
import {IDashboard} from "@/store/main/analysis/dashboard/type";

interface IDepartment {
    id: number,
    name: string,
    leader: string,
    parentId: number
}

interface IRole {
    id: number,
    name: string,
    intro: string
}

export interface ICategory {
    id: number,
    name: string,
    parentId: number
}

export interface IRootType {
    entireDepartment: IDepartment[],
    entireRole: IRole[],
    entireCategory: ICategory[],
    treeDir: any[]
}

export interface IRootWithModule {
    login: ILoginType,
    system: ISystemType,
    myUserInfo: IUserInfoType,
    dashboard: IDashboard
}

export type IStoreType = IRootType & IRootWithModule;

