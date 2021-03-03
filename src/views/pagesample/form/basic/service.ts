import request from '@/utils/request';
import { FormDataType } from './data.d';

export async function createData(params: FormDataType): Promise<any> {
  return request({
    url: '/pages/form',
    method: 'POST',
    data: params,
  });
}
