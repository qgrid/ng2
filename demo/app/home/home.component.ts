import {Component, OnInit} from '@angular/core';
import {DataService, Human} from '../../data/data.service';

@Component({
  selector: 'home',
  providers: [],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public rows: Human[] = [];

  constructor(public dataService: DataService) {
  }

  public ngOnInit() {
    this.dataService
      .getPeople(100)
      .subscribe(people => this.rows = people);
  }
}
