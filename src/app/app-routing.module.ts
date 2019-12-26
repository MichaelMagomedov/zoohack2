import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {InfoCardsComponent} from './MainPages/infoCards/info-cards.component';
import {InfoCardComponent} from './MainPages/infoCard/info-card.component';
import {LoginBoxedComponent} from './MainPages/login/login-boxed.component';
import {RecordMicComponent} from './MainPages/record/record-mic.component';

const routes: Routes = [
    {
        path: 'card',
        component: BaseLayoutComponent,
        children: [
            {path: '', component: InfoCardsComponent},
            {path: 'card/:id', component: InfoCardComponent},
        ]
    },
    {path: 'rec', component: RecordMicComponent},
    {path: '', component: LoginBoxedComponent},
    {path: '**', redirectTo: 'card'}
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
