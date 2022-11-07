import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { Task2Service } from './task2.service';

@Component({
  selector: 'app-task2',
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.scss'],
})
export class Task2Component implements OnInit {
  constructor(private task2Service: Task2Service) {}
  randomNumbers$$: Observable<number[]> = this.task2Service.randomNumbers$$;
  randomNumbersSub: Subscription | undefined;
  stats$$ = new BehaviorSubject<{
    count: number | null;
    min: number | null;
    max: number | null;
    average: number | null;
  }>({ count: null, min: null, max: null, average: null });

  ngOnInit(): void {
    this.randomNumbersSub = this.randomNumbers$$
      .pipe(
        tap((randomNumbers) => {
          this.stats$$.next({
            count: randomNumbers.length,
            min:
              randomNumbers.length > 0
                ? Math.min.apply(null, randomNumbers)
                : 0,
            max:
              randomNumbers.length > 0
                ? Math.max.apply(null, randomNumbers)
                : 0,
            average:
              randomNumbers.length > 0
                ? randomNumbers.reduce((a, b) => {
                    return a + b;
                  }, 0) / randomNumbers.length
                : 0,
          });
        })
      )
      .subscribe();
  }

  onAddNumber() {
    this.task2Service.addRandomNumber();
  }
}
