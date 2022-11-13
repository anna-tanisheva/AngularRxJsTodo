import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface IStore {
  randomNumbers: number[];
  isHttpLoading: boolean;
}

@Injectable({ providedIn: 'root' })
export class Task3Service {
  constructor(private _http: HttpClient) {}
  private _store: BehaviorSubject<IStore> = new BehaviorSubject<IStore>({
    randomNumbers: [],
    isHttpLoading: false,
  });
  public randomNumbers$$: Observable<number[]> = this._store.pipe(
    map((store) => store.randomNumbers)
  );
  public isLoading$$: Observable<boolean> = this._store.pipe(
    map((store) => store.isHttpLoading)
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
  public addRandomNumber$(): Observable<void> {
    this._updateStore({ isHttpLoading: true });
    this._http
      .get(
        'http://www.randomnumberapi.com/api/v1.0/random?min=1&max=100&count=1'
      )
      .pipe(
        tap((number) => {
          const randomNumbersArr = this._store.getValue().randomNumbers;
          randomNumbersArr.push(+number);
          this._updateStore({
            randomNumbers: randomNumbersArr,
            isHttpLoading: false,
          });
        }),
        catchError((error) => {
          console.log(error);
          return of(error);
        })
      )
      .subscribe();
    return of();
  }
  private _updateStore(data: Partial<IStore>): void {
    this._store.next({ ...this._store.getValue(), ...data });
  }
}
