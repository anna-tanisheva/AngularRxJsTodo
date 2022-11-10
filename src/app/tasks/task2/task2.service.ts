import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';

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

  public numbersStats$$: Observable<{
    count: number;
    min: number;
    max: number;
    average: number;
  }> = this._store.pipe(
    map((store) => {
      store.randomNumbers;
      return {
        count: store.randomNumbers.length,
        min:
          store.randomNumbers.length > 0
            ? Math.min.apply(null, store.randomNumbers)
            : 0,
        max:
          store.randomNumbers.length > 0
            ? Math.max.apply(null, store.randomNumbers)
            : 0,
        average:
          store.randomNumbers.length > 0
            ? store.randomNumbers.reduce((a, b) => {
                return a + b;
              }, 0) / store.randomNumbers.length
            : 0,
      };
    })
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
