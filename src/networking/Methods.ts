import axios from 'axios';

const axiosClient = axios.create();

const _get = async (url: string) => {
  try {
    const response = await axiosClient.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
};

const _post = async (url: string, payload: {}) => {
  try {
    const response = await axiosClient.post(url, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

const _put = async (url: string, id: string) => {
  try {
    const response = await axiosClient.put(`${url}/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

const _delete = async (url: string, id: string) => {
  try {
    const response = await axiosClient.delete(`${url}/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export {_get, _post, _put, _delete};
