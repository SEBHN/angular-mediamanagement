import { Component, OnInit } from '@angular/core';
import { faHome, faCloudUploadAlt, faSignOutAlt, faArrowLeft, faFolderPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  // Font Awesome Icons
  faHome = faHome;
  faCloudUploadAlt = faCloudUploadAlt;
  faSignOutAlt = faSignOutAlt;
  faArrowLeft = faArrowLeft;
  faFolderPlus = faFolderPlus;

  constructor() { }

  ngOnInit() {
  }

}
