import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { Task3Service } from './task3.service';

@Component({
  selector: 'app-task3',
  templateUrl: './task3.component.html',
  styleUrls: ['./task3.component.scss'],
})
export class Task3Component {
  constructor(private task3Service: Task3Service) {}
  randomNumbers$$: Observable<number[]> = this.task3Service.randomNumbers$$;
  numbersArrStats$$: Observable<{
    count: number;
    min: number;
    max: number;
    average: number;
  }> = this.task3Service.numbersStats$$;
  isHttpLoading$$: Observable<boolean> = this.task3Service.isLoading$$;

  onAddRandomNumber() {
    this.task3Service.addRandomNumber$().subscribe();
  }
}
