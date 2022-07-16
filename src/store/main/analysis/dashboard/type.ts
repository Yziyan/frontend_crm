
export interface IGoodsStat {
    id: number,
    name: string,
    goodsCount: number,
    goodsSaleCount: number,
    goodsFavorCount: number
}

export interface IAddressSaleCount {
    address: string,
    addressSaleCount: number
}

export interface IDashboard {
    statGoodsCount: IGoodsStat[],
    statAddressCount: IAddressSaleCount[]
}

