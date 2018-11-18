import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from "@angular/common/http";
import {ModalModule} from 'ngx-bootstrap';
import { ContextMenuModule } from 'ngx-contextmenu';

import {AppComponent} from './app.component';
import {CockpitComponent} from './cockpit/cockpit.component';
import {FileExplorerComponent} from './file-explorer/file-explorer.component';
import {HighlightDirective} from './directives/highlight.directive';
import {ElementComponent} from './file-explorer/element/element.component';
import {CreateFolderComponent} from './cockpit/modals/create-folder/create-folder.component';
import { RenameFileComponent } from './cockpit/modals/rename-file/rename-file.component';



@NgModule({
    declarations: [
        CockpitComponent,
        FileExplorerComponent,
        HighlightDirective,
        ElementComponent,
        CreateFolderComponent,
        RenameFileComponent,
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FontAwesomeModule,
        ModalModule.forRoot(),
        ContextMenuModule.forRoot({
            useBootstrap4: true,
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
