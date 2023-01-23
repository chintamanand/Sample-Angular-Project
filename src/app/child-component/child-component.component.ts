import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css'],
})
export class ChildComponentComponent implements OnInit {
  apiUrl: string =
    'https://api.themoviedb.org/3/discover/movie?api_key=e6171b13d4159aa39793cc0b447bbb93';
  customers: Customer[] = [
    {
      name: 'anand',
      gender: 'male',
      location: 'hyderabad',
      income: '90000',
      age: '28',
      id: 1001,
    },
    {
      name: 'kiran',
      gender: 'male',
      location: 'bangalore',
      income: '25000',
      age: '23',
      id: 1002,
    },
    {
      name: 'sabitha',
      gender: 'female',
      location: 'bangalore',
      income: '85000',
      age: '27',
      id: 1003,
    },
    {
      name: 'nikhil',
      gender: 'male',
      location: 'chennai',
      income: '20000',
      age: '20',
      id: 1004,
    },
  ];
  searchText: string = '';
  celsius: string = '';
  fahrenheit: string = '';

  dollar: number = 0;
  yen: number = 0;

  @Input() musicianName1: string | undefined;

  @Input('number1') number1: number = 0;
  @Input('number2') number2: number = 0;

  counter: number = 0;
  @Output('triggerEvent') triggerEvent = new EventEmitter();

  sum: number = 0;

  constructor(private httpClient: HttpClient) {
    console.log('constructor Loaded');
  }

  obs1 = Observable.create((observer: Observer<number>) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.next(4);
    observer.next(5);
    observer.complete();
    observer.next(6);
  });

  ngOnInit() {
    this.obs1.subscribe(
      (num1: number) => {
        console.log('Value is -- ' + num1);
      },
      (error: Error) => {
        console.log('Error is -- ' + error.name);
      },
      () => {
        console.log('Stream Completed');
      }
    );
    this.sum = this.number1 + this.number2;
    console.log('Sum of two number are - ' + this.sum);
  }

  trigger(): void {
    this.counter++;
    console.log('Child Component Event Triggered -- ' + this.counter);
    this.triggerEvent.emit(this.counter);
  }

  onDataChange(value: string | null, type: 'c' | 'f') {
    const temp = Number(value);
    if (type === 'c') {
      this.fahrenheit = (temp * (9 / 5) + 32).toFixed(1);
    } else {
      this.celsius = ((temp - 32) * (5 / 9)).toFixed(1);
    }
  }

  onCurrencyChange(value: string | null, type: 'd' | 'y') {
    if (value === '') {
      this.yen = 0;
      this.dollar = 0;
    } else {
      if (type === 'd') {
        this.yen = Number(value) / 0.009;
      } else if (type === 'y') {
        this.dollar = Number(value) * 110;
      } else {
        this.yen = 0;
        this.dollar = 0;
      }
    }
  }

  //This Function is not used.
  performFilterByName(searchText: string): Customer[] {
    console.log('search Text: ' + searchText);
    if (searchText) {
      searchText = searchText.toLocaleLowerCase();
      return this.customers.filter((cust: Customer) => {
        cust.name.toLocaleLowerCase().indexOf(searchText) !== -1;
        console.log('customer - ' + cust.name);
      });
    } else {
      return this.customers;
    }
  }

  year: number = 0;
  movieResponse1: MovieReponse = new MovieReponse();
  moviesList: Movie[] = [];
  movieFullResult: Observable<MovieReponse> = new Observable();

  getMovieList(): any {
    console.log('Called getMovieList() method');
    this.movieFullResult = this.httpClient.get<MovieReponse>(this.apiUrl);
    return this.movieFullResult;
  }

  getMovieListFromResult(): void {
    this.getMovieList().subscribe(
      (res1: MovieReponse) => {
        this.moviesList = res1.results;
        this.filterDataByYear(this.moviesList, this.year);
      },
      (error: Error) => {
        console.log('Error Name is -- ' + error.name);
      }
    );
  }

  /*getMovieListFromResult(): void {
    this.getMovieList().subscribe({
      next(res1: MovieReponse) {
        this.moviesList = res1.results;
      },
      error(err: Error) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done');
        this.filterDataByYear(this.moviesList, this.year);
      },
    });
  }*/

  movieNames: string[] = [];
  getMovieName(): void {
    for (let i = 0; i < this.moviesList.length; i++) {
      this.movieNames.push(this.moviesList[i].original_title);
    }
  }

  filteredList: Movie[] = [];
  filterDataByYear(movieList: Movie[], year: number): void {
    this.filteredList.length = 0;
    if (movieList != null) {
      for (let i = 0; i < movieList.length; i++) {
        if (
          year != null &&
          movieList[i] != null &&
          movieList[i].release_date != null &&
          movieList[i].release_date.includes(year.toString())
        ) {
          this.filteredList.push(movieList[i]);
        }
      }
    }
    console.log('Count of filtered List -- ' + this.filteredList.length);
    console.log('Filtered List -- ' + JSON.stringify(this.filteredList));
  }
}

export interface Customer {
  name: string;
  gender: string;
  location: string;
  income: string;
  age: string;
  id: number;
}

export class MovieReponse {
  page: string = '';
  results: Movie[] = [];
  total_pages: string = '';
  total_results: string = '';
}

export class Movie {
  adult: string = '';
  backdrop_path: string = '';
  genre_ids: string[] = [];
  id: string = '';
  original_language: string = '';
  original_title: string = '';
  overview: string = '';
  popularity: string = '';
  poster_path: string = '';
  release_date: string = '';
  title: string = '';
  video: string = '';
  vote_average: string = '';
  vote_count: string = '';
}
