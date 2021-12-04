import {Observable, throwError} from 'rxjs';

import {environment} from '../../environments/environment';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

export class AbstractService {

    protected http: HttpClient;
    public headers: HttpHeaders;
    public readonly API_URL = environment.apiUrl;

    constructor(http: HttpClient) {
        this.http = http;
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
    }

    public handleError(err: HttpErrorResponse): Observable<never> {
        return throwError(err);
    }
}