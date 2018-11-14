import { Component, OnInit, Input } from '@angular/core';
import { FileElement } from 'src/app/shared/file-element.model';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { faFile} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

  faFolder = faFolder;
  faFile = faFile;

  @Input() element: FileElement;

  constructor() { }

  ngOnInit() {
  }

}
