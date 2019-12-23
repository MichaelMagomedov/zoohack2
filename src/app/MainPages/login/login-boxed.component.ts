import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlConfig} from '../../../configs/UrlConfig';
import {NotifierService} from 'angular-notifier';
import {Route, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
    selector: 'app-login-boxed',
    templateUrl: './login-boxed.component.html',
    styles: []
})
export class LoginBoxedComponent implements OnInit {

    private user = {
        email: '',
        password: ''
    };

    constructor(
        private http: HttpClient,
        private router: Router,
        private storage: CookieService,
    ) {
    }

    auth() {
        this.http.post(`${UrlConfig.API}/oauth/token`, {
            grant_type: 'password',
            client_id: '2',
            client_secret: 'uSFGwdlAzuRhc5fQZBSCCmtRnQoxB5IFMD4czmV2',
            username: this.user.email,
            password: this.user.password,
        })
            .toPromise()
            .then((resp: any) => {
                this.storage.set('auth', resp.access_token);
                this.router.navigateByUrl('/card');
            })
            .catch((error) => {
                this.user.email = '';
                this.user.password = '';
                alert('Неверный логин или пароль');
            });
    }

    ngOnInit() {
    }

}
