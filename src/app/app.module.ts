import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CockpitComponent } from './cockpit/cockpit.component';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { HighlightDirective } from './directives/highlight.directive';
import { ElementComponent } from './file-explorer/element/element.component';


@NgModule({
  declarations: [
    AppComponent,
    CockpitComponent,
    FileExplorerComponent,
    HighlightDirective,
    ElementComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
