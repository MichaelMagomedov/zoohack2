import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class RequestProcessInterceptor implements HttpInterceptor {

    constructor(
        private storage: CookieService,
        private router: Router
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.storage.get('auth');
        const authReq = req.clone({
            setHeaders: {
                ['Authorization']: `Bearer ${token}`,
            }
        });
        return next.handle(authReq).pipe(
            tap(
                event => {
                    if (event instanceof HttpResponse) {
                        console.log('Server response');
                    }
                },
                err => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status == 401) {
                            const interval = this.storage.get('cards');
                            clearInterval(Number(interval));
                            this.router.navigateByUrl('/');
                        }
                    }
                }
            )
        );
    }
}
