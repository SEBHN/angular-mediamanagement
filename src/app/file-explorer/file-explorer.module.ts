import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {  FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    // MatToolbarModule
    // MatIconModule,
    // MatGridListModule,
    // MatMenuModule,
    FlexLayoutModule,
    // MatDialogModule,
    // MatInputModule,
    BrowserAnimationsModule,
    FormsModule
    // MatButtonModule
  ],
  declarations: [FileExplorerModule],
  exports: [FileExplorerModule]
})
export class FileExplorerModule { }
