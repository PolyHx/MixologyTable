import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpClient {
  constructor(private http: Http) {
  }

  createAuthorizationHeader(headers: Headers) {
    const token = localStorage.getItem("token");
    headers.append('x-access-token', token);
  }

  get(url) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    }).toPromise()
      .then((res) => res.json());
  }

  post(url, data) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    }).toPromise()
      .then((res) => res.json());
  }

  put(url, data) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(url, data, {
      headers: headers
    }).toPromise()
      .then((res) => res.json());
  }

  delete(url, data) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
      headers: headers
    }).toPromise()
      .then((res) => res.json());
  }

}
