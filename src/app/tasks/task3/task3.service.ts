import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface IStore {
  randomNumbers: number[];
  isHttpLoading: boolean;
}

@Injectable({ providedIn: 'root' })
export class Task3Service {
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

  constructor(private _http: HttpClient) {}

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
        })
      )
      .subscribe();
    return of();
  }

  private _updateStore(data: Partial<IStore>): void {
    this._store.next({ ...this._store.getValue(), ...data });
  }
}
