export interface IPaginationConfig {
	layout?: string;
	total: number;
	current: number;
	pageSize: number;
	sizes?: number[];
	sizeChange: (size: number) => void;
	onChange: (page: number) => void;
}

/**
 * 表格列显示在popver中设置的项
 */
export interface IPopoverTableColumnItem {
	// 名称标题
	label: string;
	// 字段名称，传回数据库
	key: string;
	// 是否显示
	checked: boolean;
	// 是否禁用
	disabled?: boolean;
	/* 以下是显示表格的时候会用到 */
	// 是否fixed
	fixed?: boolean | string;
	// prop
	prop?: string;
	//列宽
	width?: string;
	minWidth?: string;
	// 其他
	[key in string]?: any;
}

// 暴露类型
export interface IDefineExpose {
	setSearchDrawerVisible: (v: boolean) => void;
	setPopoverColumnAllVal: () => void;
}
