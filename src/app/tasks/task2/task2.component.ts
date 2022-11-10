import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { Task2Service } from './task2.service';

@Component({
  selector: 'app-task2',
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.scss'],
})
// implements OnInit, OnDestroy
export class Task2Component {
  constructor(private task2Service: Task2Service) {}
  randomNumbers$$: Observable<number[]> = this.task2Service.randomNumbers$$;
  numbersArrStats$$: Observable<{
    count: number;
    min: number;
    max: number;
    average: number;
  }> = this.task2Service.numbersStats$$;

  onAddRandomNumber() {
    this.task2Service.addRandomNumber();
  }
}
