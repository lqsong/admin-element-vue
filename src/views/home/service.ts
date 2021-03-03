import request from '@/utils/request';
import { TableListQueryParams } from './data.d';

export async function dailynewArticles(): Promise<any> {
  return request({
      url: '/home/articles/dailynew',
      method: 'get'
  });
}

export async function weeknewWorks(): Promise<any> {
  return request({
      url: '/home/works/weeknew',
      method: 'get'
  });
}

export async function monthnewTopics(): Promise<any> {
  return request({
      url: '/home/topics/monthnew',
      method: 'get'
  });
}

export async function annualnewLinks(): Promise<any> {
  return request({
      url: '/home/links/annualnew',
      method: 'get'
  });
}

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