import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { Task2Service } from './task2.service';

@Component({
  selector: 'app-task2',
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.scss'],
})
export class Task2Component {
  randomNumbers$$: Observable<number[]> = this.task2Service.randomNumbers$$;
  countNumbers$$: Observable<number> = this.task2Service.countNumbers$$;
  minNumber$$: Observable<number> = this.task2Service.minNumber$$;
  maxNumber$$: Observable<number> = this.task2Service.maxNumber$$;
  average$$: Observable<number> = this.task2Service.average$$;

  constructor(private task2Service: Task2Service) {}

  onAddRandomNumber() {
    this.task2Service.addRandomNumber();
  }
}
