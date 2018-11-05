import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { CockpitComponent } from './cockpit/cockpit.component';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { HighlightDirective } from './directives/highlight.directive';


@NgModule({
  declarations: [
    AppComponent,
    CockpitComponent,
    FileExplorerComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
