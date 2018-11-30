import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FileElement } from 'src/app/shared/file-element.model';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { faFile} from '@fortawesome/free-solid-svg-icons';
import { FilesService } from 'src/app/services/files-service.service';
import { DownloadMediaService } from 'src/app/services/download-media.service';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

  faFolder = faFolder;
  faFile = faFile;

  @Input() element: FileElement;
  @Output() navigated = new EventEmitter<FileElement>();
  @Output() fileDownloaded = new EventEmitter<FileElement>();

  constructor() { }

  ngOnInit() {
  }

  // triggered through double click on a FileElement
  onDoubleClick(file: FileElement): void {
    if (file.isFolder) {
      // folder clicked -> navigate into it
      this.navigated.emit(file);
    } else {
      // file clicked -> download it
      this.fileDownloaded.emit(file);
    }
  }
}
