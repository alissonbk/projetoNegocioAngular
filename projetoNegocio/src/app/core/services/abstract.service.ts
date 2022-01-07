import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';


import {environment} from '../../../environments/environment';
import { LoginService } from './login.service';

export class AbstractService {

    protected http: HttpClient;
    public headers: HttpHeaders;
    public readonly API_URL = environment.apiUrl;

    constructor(http: HttpClient) {
        this.http = http;
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        const loggedUser = JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem('loggedUser'))));
        this.headers = this.headers.set('Authorization', `Bearer ${loggedUser.access_token}`);
    }

    public handleError(err: HttpErrorResponse): Observable<never> {
        return throwError(err);
    }
}