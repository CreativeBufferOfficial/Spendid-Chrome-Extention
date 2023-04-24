import axios from 'axios';

import { defaultConfig } from './config';
// import axiosUtil from './axiosUtils';

export const callAPI = async (
  path,
  method,
  // params,
  data = null,
  options = {},
  headersObj = {}
) => {
  const API_ROOT = defaultConfig.baseAPIUrl + 'api/';
  const url = API_ROOT + path;
  // console.log(`inside API utiles ${localStorage.getItem('accessToken')}`);

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,

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
};

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
