﻿import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';

import { AppSettings } from '../core/appSettings';
import { JoinPipe } from '../shared';
import { PlaceListItemComponent } from './place-list-item/place-list-item.component';
import { PlaceListComponent } from './place-list/place-list.component';
import { PlaceRatingComponent } from './place-rating/place-rating.component';
import { PlacesRoutingModule } from './places-routing.module';
import { PlacesComponent } from './places.component';
import { SearchMapComponent } from './search-map/search-map.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';

@NgModule({
  imports: [
    CommonModule,
    PlacesRoutingModule,
    MaterialModule.forRoot(),
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: AppSettings.googlePlacesApiKey,
      libraries: ['places']
    })
  ],
  exports: [],
  declarations: [
    JoinPipe,
    PlacesComponent,
    SearchPanelComponent,
    SearchMapComponent,
    PlaceListItemComponent,
    PlaceListComponent,
    PlaceRatingComponent
  ],
  providers: []
})
export class PlacesModule {
}
