import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {counterReducer} from './counter.reducer';
import { MyCounterComponent } from './my-counter/my-counter.component';
import { ChartComponent } from './chart/chart.component';
import {HttpClientModule} from '@angular/common/http';
import {EntityDataModule} from '@ngrx/data';
import {entityConfig} from './entity-metadata';
import { HeroesComponent } from './heroes/heroes.component';
import {EffectsModule} from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    MyCounterComponent,
    ChartComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({count: counterReducer}, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
