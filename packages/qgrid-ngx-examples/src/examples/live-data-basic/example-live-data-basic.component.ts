import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';
import { DataService, Quote } from '../data.service';
import { of, Subject, timer } from 'rxjs';
import { repeat, switchMap, takeUntil } from 'rxjs/operators';

const EXAMPLE_TAGS = ['live-data-basic', 'Table data updates in real time'];

@Component({
  selector: 'example-live-data-basic',
  templateUrl: 'example-live-data-basic.component.html',
  styleUrls: ['example-live-data-basic.component.scss'],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ExampleLiveDataBasicComponent implements OnDestroy {
  static tags = EXAMPLE_TAGS;

  private destroy$: Subject<void> = new Subject();

  title = EXAMPLE_TAGS[1];
  rows: Quote[];

  constructor(private dataService: DataService, private cd: ChangeDetectorRef) {
    this.dataService.getQuotes().subscribe(quotes => {
      this.rows = quotes;
      this.cd.detectChanges();

      of(null).pipe(
        takeUntil(this.destroy$),
        switchMap(() => timer(this.random(300, 5000))), // calculates random delay time for every iteration
        repeat(),
      ).subscribe(() => {
        // rowIndices is a random length array of random row indices
        const rowIndices = new Array(this.random(1, 3)).fill(0).map(() => this.random(0, this.rows.length - 1));
        const uniqRowIndices = new Set(rowIndices);

        this.updateQuotes(uniqRowIndices);
      });
    });
  }

  updateQuotes(rowIndices: Set<number>) {
    const rows = [...this.rows];

    for (const idx of rowIndices) {
      const quote = rows[idx];
      const rnd = this.random(-50000, 50000);
      quote.last += rnd;
      quote.ask += rnd;
      quote.ldn1 = this.randomTime(quote.ldn1);
    }

    this.rows = rows;
  }

  random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  randomTime(time: string): string {
    if (time.indexOf(':') === -1) {
      return time;
    }
    return time.split(':').map((val, i) => {
      let num = +val;
      if (i === 0) {
        num += this.random(-5, 5);
        if (num > 23 || num < 0) {
          num = Math.sqrt(Math.pow(num % 24, 2));
        }
      } else if (i === 1) {
        num += this.random(-20, 20);
        if (num > 59 || num < 0) {
          num = Math.sqrt(Math.pow(num % 60, 2));
        }
      }
      return num.toString().padStart(2, '0');
    }).join(':');
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
