import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlConfig} from '../../../configs/UrlConfig';
import {NotifierService} from 'angular-notifier';

@Component({
    selector: 'app-info-cards',
    templateUrl: './info-cards.component.html',
})
export class InfoCardsComponent implements OnInit {

    private cards = [];
    private categories = [];
    private currentCat = null;
    private timerInterval;

    constructor(
        private http: HttpClient,
        private notifier: NotifierService
    ) {
    }

    private loadCards(handle: boolean): void {
        this.http.get(`${UrlConfig.API}/requests`)
            .subscribe((data: Array<any>) => {
                data.forEach(card => {
                    console.log(this.cards.indexOf((curCard) => curCard.id === card.id));
                    if (this.cards.findIndex((curCard) => curCard.id === card.id) === -1) {
                        card.categories = card.categories.categories.map((cat) => cat.name);
                        card.categories.forEach((cat) => {
                            if (this.categories.indexOf(cat) === -1) {
                                this.categories.push(cat);
                            }
                        });
                        card.text_confidence_value = card.text_confidence - (card.text_confidence % 1);
                        card.text_confidence = card.text_confidence_value + '%';
                        this.cards.push(card);
                        if (handle) {
                            this.notifier.notify('success', 'new request');
                        }
                    }
                });
            });
    }

    ngOnInit() {
        this.loadCards(false);
        this.timerInterval = setInterval(() => {
            this.loadCards(true);
        }, 3000);
    }

    routerOnDeactivate() {
        clearInterval(this.timerInterval);
    }


    filterCards(cards: Array<any>) {
        return cards.filter((card) => {
            return card.categories.indexOf(this.currentCat) !== -1 || this.currentCat == null;
        });
    }
}
