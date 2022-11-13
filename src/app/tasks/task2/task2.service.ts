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
  public countNumbers$$: Observable<number> = this._store.pipe(
    map((store) => {
      return store.randomNumbers.length;
    })
  );
  public minNumber$$: Observable<number> = this._store.pipe(
    map((store) => {
      if (store.randomNumbers.length === 0) return 0;
      return Math.min.apply(null, store.randomNumbers);
    })
  );
  public maxNumber$$: Observable<number> = this._store.pipe(
    map((store) => {
      if (store.randomNumbers.length === 0) return 0;
      return Math.max.apply(null, store.randomNumbers);
    })
  );
  public average$$: Observable<number> = this._store.pipe(
    map((store) => {
      if (store.randomNumbers.length === 0) return 0;
      return (
        store.randomNumbers.reduce((a, b) => {
          return a + b;
        }, 0) / store.randomNumbers.length
      );
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
