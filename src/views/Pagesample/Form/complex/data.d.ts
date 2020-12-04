import { TableFormDataType } from "./components/TableForm/data.d";
export interface FormDataType {
  title: string;
  date: string[];
  select: string;
  radio1: string;
  radio2: string;
  checkbox: string[];
  remark: string;
  users?: TableFormDataType[];
}
