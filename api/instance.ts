import axios, {AxiosInstance, AxiosResponse} from "axios";

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_REST_URL,
    timeout: 1000 * 10
})



const customAxios: (
    method: string,
    APIConfig: APIProps
) => Promise<AxiosResponse<any>> = (method: string, APIConfig: APIProps) => {

    const { url, param, multipartUse } = APIConfig;
    const config: any = {
        url: url, // + '?lang=' + nowLanguage()
        timeout: 1000 * 10,
        method: method,
    };

    multipartUse
        ? (config.headers = {
              'Content-Type': 'multipart/form-data; charset=utf-8',
          })
        : (config.headers = {
              'Content-Type': 'application/json; charset=utf-8',
          });
    method === 'get' || method === 'delete'
        ? (config.params = param)
        : (config.data = param);

    return axiosInstance(config);
};

export const apiRequest = {
    get: (APIConfig: APIProps) => {
        return customAxios('get', APIConfig );
    },
    post: (APIConfig: APIProps) => {
        return customAxios('post', APIConfig);
    },
    patch: (APIConfig: APIProps) => {
        return customAxios('patch', APIConfig);
    },
    delete: (APIConfig: APIProps) => {
        return customAxios('delete', APIConfig);
    }
};
