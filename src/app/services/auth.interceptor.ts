
import { LoginService } from './login.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { AuthInterceptor } from './auth.interceptor';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
     constructor(private loginService:LoginService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let newReq = req;
        let token = this.loginService.getToken();
        console.log("Interceptor "+token);

        if(token!=null){
           newReq =  newReq.clone({setHeaders:{Authorization:`Bearer ${token}`}})
        }

        return next.handle(newReq);
    }
}