import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Task3Service } from './task3.service';

@Component({
  selector: 'app-task3',
  templateUrl: './task3.component.html',
  styleUrls: ['./task3.component.scss'],
})
export class Task3Component {
  constructor(private task3Service: Task3Service) {}
  randomNumbers$$: Observable<number[]> = this.task3Service.randomNumbers$$;
  isHttpLoading$$: Observable<boolean> = this.task3Service.isLoading$$;
  countNumbers$$: Observable<number> = this.task3Service.countNumbers$$;
  minNumber$$: Observable<number> = this.task3Service.minNumber$$;
  maxNumber$$: Observable<number> = this.task3Service.maxNumber$$;
  average$$: Observable<number> = this.task3Service.average$$;

  onAddRandomNumber() {
    this.task3Service.addRandomNumber$();
  }
}
