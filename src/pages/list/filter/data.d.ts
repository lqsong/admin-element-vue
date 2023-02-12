export interface IQueryParams {
	page: number;
	per: number;
}

export interface IPaginationConfig {
	total: number;
	current: number;
	pageSize: number;
}

export interface ITableListItem {
	id: number;
	name: string;
	desc: string;
	href: string;
	type: string;
}

export interface ITableData {
	loading: boolean;
	list: ITableListItem[];
	pagination: IPaginationConfig;
}
