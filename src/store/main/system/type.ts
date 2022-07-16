import {ICategory} from "@/store/type";

export interface IUserType {
    id: number;
    name: string;
    nickname: string;
    cellphone: string;
    createdTime: number;
    enable: number;
    roleIds: number[];
    departmentId: number;
}

export interface IRoleType {
    id: number,
    name: string,
    intro: string
}

export interface IDepartment {
    id: number,
    name: string,
    leader: string
}

export interface ISystemType {
    userCount: number,
    userList: IUserType[],
    roleCount: number,
    roleList: IRoleType[],
    goodsCount: number,
    goodsList: any[],
    dirMenu: any[],
    query: Object,
    categoryList: ICategory[],
    departmentCount: number,
    departmentList: IDepartment[]
}
