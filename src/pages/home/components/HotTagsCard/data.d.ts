export interface IQueryParams {
	page: number;
	per: number;
	sort?: number;
}

export interface IPaginationConfig {
	total: number;
	current: number;
	pageSize: number;
}

export interface ITableListItem {
	id: number;
	name: string;
	hit: number;
	pinyin?: string;
}

export interface ITableData {
	loading: boolean;
	list: ITableListItem[];
	pagination: IPaginationConfig;
}
