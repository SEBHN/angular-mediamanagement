import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FileElement } from 'src/app/shared/file-element.model';
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons';
import { FilesService } from 'src/app/services/files-service.service';
import { Folder } from 'src/app/shared/folder.model';
import { Tag } from 'src/app/shared/tag.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

  faFolder = faFolder;
  faFile = faFile;

  @Input() element: FileElement;
  @Output() elementClicked = new EventEmitter<FileElement>();

  constructor(private filesService: FilesService) { }

  ngOnInit() {
  }

  // triggered through double click on a FileElement
  onDoubleClick(file: FileElement): void {
    if (file.isFolder) {
      // folder clicked -> navigate into it
      this.filesService.navigated.emit(file);
    } else {
      // file clicked -> download it
      this.filesService.fileDownloaded.emit(file);
    }
  }

  onClick(file: FileElement): void {
    this.elementClicked.emit(file);
  }
}
