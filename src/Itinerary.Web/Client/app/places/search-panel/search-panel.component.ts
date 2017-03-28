﻿import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Autocomplete, GooglePlacesService, Location } from '../../shared';
import { SearchCriteria } from '../search-criteria';

@Component({
  selector: 'search-panel',
  templateUrl: 'search-panel.component.html',
  styleUrls: ['search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  public searchControl: FormControl;
  public filteredPlaces: Autocomplete[];

  public distance: number;
  public rating: number;
  @Output()
  search: EventEmitter<SearchCriteria> = new EventEmitter();

  private location: Location;

  constructor(
    private googlePlacesService: GooglePlacesService) {
    this.searchControl = new FormControl();
    this.distance = 50;
    this.rating = 4.0;
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .debounceTime(200)
      .switchMap((keyword) => this.googlePlacesService.autocomplete(<string>keyword))
      .subscribe((value: Autocomplete[]) => {
        this.filteredPlaces = value;
      });

    this.setCurrentPosition();
  }

  public displayPlace(autocomplete: Autocomplete): string {
    if (autocomplete != null && autocomplete.placeId) {
      this.googlePlacesService
        .location(autocomplete.placeId)
        .subscribe((location: Location) => {
          this.location = location;
          this.raiseSearch();
        });
    }
    return autocomplete ? autocomplete.description : '';
  }

  public changeDistanceHandler({ value }) {
    this.distance = value;
    this.raiseSearch();
  }

  public changeRatingHandler({ value }) {
    this.rating = value;
    this.raiseSearch();
  }

  private setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.location = new Location(position.coords.latitude, position.coords.longitude);
        this.raiseSearch();
      });
    }
  }

  private raiseSearch() {
    const searchCriteria = new SearchCriteria(this.location, this.distance, this.rating);
    this.search.emit(searchCriteria);
  }
}
