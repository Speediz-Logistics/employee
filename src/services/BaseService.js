import http from '@/axios';

export default class BaseService {
  static get METHOD_GET() {
    return 'GET';
  }

  static get METHOD_POST() {
    return 'POST';
  }

  static get METHOD_PUT() {
    return 'PUT';
  }

  static get METHOD_DELETE() {
    return 'DELETE';
  }

  constructor(prefix) {
    this.prefix = prefix;
  }

  index(data) {
    return this.performRequest(BaseService.METHOD_GET, '', data);
  }

  show(id, params) {
    return this.performRequest(BaseService.METHOD_GET, id, params);
  }

  store(data) {
    return this.performRequest(BaseService.METHOD_POST, '', data);
  }

  update(id, data) {
    return this.performRequest(BaseService.METHOD_POST, id, data);
  }

  destroy(id) {
    return this.performRequest(BaseService.METHOD_DELETE, id);
  }

  performRequest(method, url, data = {}, headers = {}, requestOptions = {}) {
    const endPoint = '/' + this.prefix + (url ? '/' + url : '');
    const options = {
      method,
      url: endPoint,
      data,
      headers,
      ...requestOptions,
    };

    options[method.toUpperCase() === BaseService.METHOD_GET ? 'params' : 'data'] = data;
    return http(options);
  }
}
