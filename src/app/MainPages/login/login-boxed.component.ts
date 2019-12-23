import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlConfig} from '../../../configs/UrlConfig';

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

    constructor(private http: HttpClient) {
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
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    ngOnInit() {
    }

}
