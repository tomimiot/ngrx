import {Component} from '@angular/core';
import {ConnectableObservable, interval, Observable} from 'rxjs';
import {publish, take} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngrx-test';

  private stream$: Observable<number> = interval(1000).pipe(take(5), publish());

  constructor() {
    (this.stream$ as ConnectableObservable<number>).connect();
    this.stream$.subscribe(data => console.log('first sub', data));
  }

  public getData(): Observable<string> {
    this.stream$.subscribe(data => console.log('second sub', data));

    return new Observable(observer => {
      console.log(`this won't be printed until a subscriber exists`);
      setTimeout(() => {
        observer.next('some data');
        observer.complete();
      }, 3000);
    });
  }

  activateGetData() {
    this.getData().subscribe(data => console.log('data from observer: ', data));
  }
}
