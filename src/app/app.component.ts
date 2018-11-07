import { Component } from '@angular/core';
import { Folder } from './shared/folder.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  onFolderCreated(folder: Folder) {
    console.log(folder);
  }
  
}
