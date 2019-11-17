import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {InfoCardsComponent} from './MainPages/infoCards/info-cards.component';
import {InfoCardComponent} from './MainPages/infoCard/info-card.component';

const routes: Routes = [
    {
        path: '',
        component: BaseLayoutComponent,
        children: [
            {path: '', component: InfoCardsComponent},
            {path: 'card/:id', component: InfoCardComponent},
        ]

    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes,
        {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
        })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
