import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ElementComponent } from './element/element.component';
import {RecipeService} from "./services/recipe.service";
import {HttpClient} from "./utils/httpclient";

@NgModule({
  declarations: [
    AppComponent,
    ElementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    HttpClient,
    RecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
