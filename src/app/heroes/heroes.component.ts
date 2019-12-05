import { Component, OnInit } from '@angular/core';
import {HeroService} from '../hero.service';
import {Observable} from 'rxjs';
import {Hero} from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  public loading$: Observable<boolean>;
  public entities$: Observable<Hero[]>;

  constructor(private heroService: HeroService) {
    this.loading$ = heroService.loading$;
    this.entities$ = heroService.entities$;
  }

  ngOnInit() {
    this.getHeroes();
  }

  public add(hero: Hero) {
    this.heroService.add(hero);
  }

  public delete(hero: Hero) {
    this.heroService.delete(hero.id);
  }

  public getHeroes() {
    this.heroService.getAll();
  }

  public update(hero: Hero) {
    this.heroService.update(hero);
  }

}
