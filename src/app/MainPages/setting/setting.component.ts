import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FileUploader} from 'ng2-file-upload';
import {UrlConfig} from '../../../configs/UrlConfig';
import {CookieService} from 'ngx-cookie-service';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styles: []
})
export class SettingComponent implements OnInit {

    public email = '';
    public loading = false;
    public uploader: FileUploader;

    constructor(
        private storage: CookieService,
        private http: HttpClient,
    ) {
        this.http.get(`${UrlConfig.API}/setting`).toPromise().then((data: any) => {
            this.email = data.email;
        });
        const token = this.storage.get('auth');
        this.uploader = new FileUploader({
            url: `${UrlConfig.API}/setting`,
            itemAlias: 'file',
            authToken: `Bearer ${token}`
        });
    }


    ngOnInit() {
        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            if (status !== 200) {
                alert('Произошла ошибка');
                return;
            }
            alert('Файл успешно загружен');
        };
    }

    save() {
        this.loading = true;
        this.http.post(`${UrlConfig.API}/setting`, {
            email: this.email
        }).toPromise()
            .then(() => {
                alert('Email успшно установлен');
                this.loading = false;
            })
            .catch(() => {
                alert('Произошла ошибка');
                this.loading = false;
            });
    }
}
