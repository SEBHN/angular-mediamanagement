import { Component, OnInit} from "@angular/core";
import { FileElement } from "./shared/file-element.model";
import { FilesService } from "./services/files-service.service";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  faArrowLeft = faArrowLeft;

  private fileElements = new Map<string, FileElement>();
  public fileService: FilesService;

  constructor(fileService: FilesService) {
    this.fileService = fileService;
  }

  ngOnInit() {
    this.fileService.fileElementsChanged
            .subscribe((updatedFileElements: Map<string, FileElement>) => {
              this.fileElements = updatedFileElements;
            });
    this.fileElements = this.fileService.getAll();
  }

  getFileElements(): FileElement[] {
    return Array.from(this.fileElements.values());
  }
}
