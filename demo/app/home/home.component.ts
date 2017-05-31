import { Component, OnInit } from '@angular/core';
import { DataService, Human } from '../../data/data.service';

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
      .map(humans => this.madeIsFeemaleField(humans))
      .map(humans => this.madeEmailSingleField(humans))
      .subscribe((people) => {
        this.rows = people;
      });
  }

  private madeIsFeemaleField(humans: Human[]): Human[] {
    humans.forEach((human: any) => {
      if (human.gender === 'female') {
        human['isFemail'] = true;
      } else {
        human['isFemail'] = false;
      }
    });
    return humans;
  }

  private madeEmailSingleField(humans: Human[]): Human[] {
    humans.forEach((human: any) => {
      var emails: any[] = human.contact.email as any[];
      if (emails) {
         human.contact.singleEmail = emails.join(',');
      }
    });
    return humans;
  }
}
