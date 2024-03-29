import axios from 'axios';

import { defaultConfig } from './config';
export const callAPIWithoutAuth = async (
  path,
  method,
  data = null,
  params,
  options = {},
  headersObj = {}
) => {
  const API_ROOT = defaultConfig.baseAPIUrl + 'api/';
  const url = API_ROOT + path;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...headersObj,
  };

  return axios({
    method,
    url,
    params,
    // paramsSerializer: (paramObject) => Qs.stringify(paramObject, serializerConfig),
    data,
    headers,
    ...options,
  });
};
export const callAPI = async (
  path,
  method,
  // params,
  data = null,
  options = {},
  headersObj = {}
) => {
  const API_ROOT = defaultConfig.baseAPIUrl2 + 'v1.0/';
  const url = API_ROOT + path;

  const headers = {
    'Content-Type': 'text/plain;charset=UTF-8',
    Accept: '*/*',
    'x-api-key': 'HTDzMgEntXaBYVFZ6SSth2iosFRjVe7F8QtM4HBr',
    // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    // AuthKey: await localStorage.getItem('authkey'),
    ...headersObj,
  };
  return axios({
    method,
    url,
    // params,
    // paramsSerializer: (paramObject) => Qs.stringify(paramObject, serializerConfig),
    data,
    headers,
    ...options,
  });

  // const API_ROOT = defaultConfig.baseAPIUrl + 'api/';
  // const url = API_ROOT + path;

  // const headers = {
  //   'Content-Type': 'application/json',
  //   Accept: 'application/json',
  //   Authorization: `Bearer ${localStorage.getItem('accessToken')}`,

  //   // AuthKey: await localStorage.getItem('authkey'),
  //   ...headersObj,
  // };

  // return axios({
  //   method,
  //   url,
  //   // params,
  //   // paramsSerializer: (paramObject) => Qs.stringify(paramObject, serializerConfig),
  //   data,
  //   headers,
  //   ...options,
  // });
};

export const callAPI2 = async (
  path,
  method,
  // params,
  data = null,
  options = {},
  headersObj = {}
) => {
  const API_ROOT = defaultConfig.baseAPIUrl + 'api/';
  const url = API_ROOT + path;

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    ...headersObj,
  };

  return axios({
    method,
    url,
    data,
    headers,
    ...options,
  });
};
