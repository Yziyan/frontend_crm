
export interface ITableColumn {
    prop?: string,
    label: string,
    minWidth: string,
    slotName?: string
}

export interface ITable {
    tableList: ITableColumn[],
    showIndexColumn?: boolean,
    showSelectColumn?: boolean,
    title?: string,
    childrenProps?: Object,
    showFooter?: boolean
}

