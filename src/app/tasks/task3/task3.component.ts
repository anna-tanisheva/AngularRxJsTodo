import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { Task3Service } from './task3.service';

@Component({
  selector: 'app-task3',
  templateUrl: './task3.component.html',
  styleUrls: ['./task3.component.scss'],
})
export class Task3Component implements OnInit, OnDestroy {
  constructor(private task3Service: Task3Service) {}
  randomNumbers$$: Observable<number[]> = this.task3Service.randomNumbers$$;
  randomNumbersSub: Subscription | undefined;
  stats$$ = new BehaviorSubject<{
    count: number | null;
    min: number | null;
    max: number | null;
    average: number | null;
  }>({ count: null, min: null, max: null, average: null });
  isHttpLoading$$: Observable<boolean> = this.task3Service.isLoading$$;

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

  ngOnDestroy() {
    this.randomNumbersSub?.unsubscribe();
  }

  onAddRandomNumber() {
    this.task3Service.addRandomNumber$().subscribe();
  }
}
