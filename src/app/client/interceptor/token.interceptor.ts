
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';



@Injectable()
export class LoginInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = JSON.parse(this.userService.getToken());

        // If there is no token!
        if (!token) { token = ''; }

        const headers = new HttpHeaders({
            // 'access-control-expose-headers': 'x-total-count',
            'Authorization': token,
            // 'Content-Type': 'application/x-www-form-urlencoded, application/text, application/json',
            // 'Cache-Control': 'no-cache, no-store, must-revalidate',
            // 'Access-Control-Allow-Credentials': 'true',
            // 'Pragma': 'no-cache',
            // 'Expires': '0',
        });

        const newRequest = req.clone({
            headers
        })
        // console.warn('INTERCEPTOR ', newRequest.headers);

        return next.handle(newRequest);
    }
}