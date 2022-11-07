import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface IStore {
  randomNumbers: number[];
}

@Injectable({ providedIn: 'root' })
export class Task2Service {
  private _store: BehaviorSubject<IStore> = new BehaviorSubject<IStore>({
    randomNumbers: [],
  });

  public randomNumbers$$: Observable<number[]> = this._store.pipe(
    map((store) => store.randomNumbers)
  );

  public addRandomNumber(): void {
    const randomNumbersArr = this._store.getValue().randomNumbers;
    randomNumbersArr.push(this._getRandomNumber());
    this._updateStore({ randomNumbers: randomNumbersArr });
  }

  private _getRandomNumber(max: number = 100): number {
    return Math.floor(Math.random() * max);
  }

  private _updateStore(data: Partial<IStore>): void {
    this._store.next({ ...this._store.getValue(), ...data });
  }
}
