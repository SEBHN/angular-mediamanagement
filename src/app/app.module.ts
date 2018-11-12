import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {CockpitComponent} from './cockpit/cockpit.component';
import {FileExplorerComponent} from './file-explorer/file-explorer.component';
import {HighlightDirective} from './directives/highlight.directive';
import {ElementComponent} from './file-explorer/element/element.component';
import {CreateFolderComponent} from './cockpit/modals/create-folder/create-folder.component';
import {ModalModule} from 'ngx-bootstrap';


@NgModule({
    declarations: [
        CockpitComponent,
        FileExplorerComponent,
        HighlightDirective,
        ElementComponent,
        CreateFolderComponent,
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FontAwesomeModule,
        ModalModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
