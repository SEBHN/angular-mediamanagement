import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Folder } from "./shared/folder.model";
import { FileElement } from "./shared/file-element.model";
import { FilesService } from "./services/files-service.service";
import { v4 } from 'node_modules/uuid';
import { FileExplorerComponent } from "./file-explorer/file-explorer.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  private fileElements: FileElement[];
  public fileService: FilesService;

  @ViewChild(FileExplorerComponent) fileExplorer;

  constructor(fileService: FilesService) {
    this.fileService = fileService;
  }

  ngOnInit() {
    this.fileElements = [];
    let folder: Folder = new Folder("Manuel", "/");
    let folder1: Folder = new Folder("bogdan", "/");
    let folder2: Folder = new Folder("something", "/");
    let folder3: Folder = new Folder("notCool", "/");
    let folder4: Folder = new Folder("Johanna", "/");
    let folder5: Folder = new Folder("Lilli", "/");
    let folder6: Folder = new Folder("Jessica", "/");
    folder.id = v4();
    folder1.id = v4();
    folder2.id = v4();
    folder3.id = v4();
    folder4.id = v4();
    folder5.id = v4();
    folder6.id = v4();
    this.getFileElements().push(
      folder, folder1, folder2, folder3, folder4, folder5, folder6
    );
  }

  getFileElements(): FileElement[] {
    return this.fileElements;
  }

  addFolder(folder: Folder) {
    this.fileService.add(folder);
    this.fileElements.push(folder);
    this.fileExplorer.updateUi();
  }
}
