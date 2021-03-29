import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { ProjectCardComponent } from './pages/comps/project-card/project-card.component';
import { AddProjectCardComponent } from './pages/comps/add-project-card/add-project-card.component';
import { TaskItemComponent } from './pages/comps/task-item/task-item.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    ProjectCardComponent,
    AddProjectCardComponent,
    TaskItemComponent,
    CreatePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
