import { Component } from '@angular/core';

import { TaskPage } from '../task/task';
import { NewPage } from '../new/new';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TaskPage;
  tab2Root = NewPage;

  constructor() {

  }
}
