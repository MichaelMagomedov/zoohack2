import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FileUploader} from 'ng2-file-upload';
import {UrlConfig} from '../../../configs/UrlConfig';

@Component({
    selector: 'app-record-mic',
    templateUrl: './record-mic.component.html',
    styles: []
})
export class RecordMicComponent implements OnInit {

    public uploader: FileUploader = new FileUploader({
        url: `${UrlConfig.API}/oauth/token`,
        itemAlias: 'audio'
    });

    ngOnInit() {
        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            if(status !== 200){
                alert('Произошла ошибка');
                return;
            }
            alert('Файл успешно загружен');
        };
    }
}
