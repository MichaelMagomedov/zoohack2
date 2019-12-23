import {Component, OnInit} from '@angular/core';
import {UrlConfig} from '../../../configs/UrlConfig';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {NotifierService} from 'angular-notifier';

declare var google;

@Component({
    selector: 'app-info-card',
    templateUrl: './info-card.component.html',
})
export class InfoCardComponent implements OnInit {

    private card;
    private location: google.maps.LatLng;
    private answer: string;

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private notifier: NotifierService
    ) {
        const id = this.route.snapshot.paramMap.get('id');
        this.getCard(Number(id));
    }

    getLatLng(address): Promise<google.maps.LatLng | null> {
        return new Promise<google.maps.LatLng>((resolve, reject) => {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({address}, (results, status) => {
                    if (status == google.maps.GeocoderStatus.OK) {
                        console.log(results);
                        const latLng = new google.maps.LatLng(
                            results[0].geometry.location.lat(),
                            results[0].geometry.location.lng()
                        );
                        resolve(latLng);
                        return;
                    }
                    reject();
                }
            );
        });
    }

    getCard(id: number): void {
        this.http.get(`${UrlConfig.API}/requests/` + id).subscribe(async (card: any) => {
            this.card = card;
            this.card.categories = this.card.categories.categories.map((cat) => cat.name);
            card.text_confidence_value = card.text_confidence - (card.text_confidence % 1);
            card.text_confidence = card.text_confidence_value + '%';
            this.card.latlng = [];
            this.card.latlng.push(await this.getLatLng(this.card.location));
            this.card.latlng.push(await this.getLatLng(this.card.text_location));
            this.answer = this.card.answer;
        });
    }

    sendAnswer(answer: string): void {
        this.http.post(`${UrlConfig.API}/answer`, {
            text: answer,
            phone: this.card.phone,
            id: this.card.id,
        }).subscribe(() => {
            this.card.answer = answer;
            this.notifier.notify('success', 'Answer sended');
        });
    }

    ngOnInit() {
    }

}
