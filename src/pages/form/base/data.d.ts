import type { ModelValueType } from "element-plus";
export interface IFormData {
	name: string;
	date: ModelValueType;
	select: string;
	radio1: string;
	radio2: string;
	checkbox: string[];
	remark: string;
}
