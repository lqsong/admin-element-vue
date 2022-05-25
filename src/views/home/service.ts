import request from '@/utils/request';
import { TableListQueryParams } from './data.d';

export async function hotSearchQueryList(params?: TableListQueryParams): Promise<any> {
  return request({
    url: '/home/searchs/keywords',
    method: 'get',
    params,
  });
}

export async function hotTagsQueryList(params?: TableListQueryParams): Promise<any> {
  return request({
    url: '/home/tags',
    method: 'get',
    params,
  });
}

export async function articleHitQueryList(params?: TableListQueryParams): Promise<any> {
  return request({
    url: '/home/articles',
    method: 'get',
    params,
  });
}

export async function worksHitQueryList(params?: TableListQueryParams): Promise<any> {
  return request({
    url: '/home/works',
    method: 'get',
    params,
  });
}