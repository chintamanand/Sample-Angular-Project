import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChildComponentComponent } from './child-component/child-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter-pipe';
import { Routes, RouterModule } from '@angular/router';
import { ThreeComponentComponent } from './three-component/three-component.component';

const routes: Routes = [
  { path: '/home', component: AppComponent },
  { path: '/child', component: ChildComponentComponent },
];
@NgModule({
  declarations: [AppComponent, ChildComponentComponent, FilterPipe, ThreeComponentComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
