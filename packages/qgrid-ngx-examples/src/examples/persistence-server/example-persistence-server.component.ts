import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { GridModel, Grid, PersistenceStorage } from 'ng2-qgrid';
import { DataService, Atom } from '../data.service';

const EXAMPLE_TAGS = ['persistence-server', 'Settings are stored on server and can be saved/loaded in the save/load menu'];

@Component({
  selector: 'example-persistence-server',
  templateUrl: 'example-persistence-server.component.html',
  styleUrls: ['example-persistence-server.component.scss'],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplePersistenceServerComponent {
  static tags = EXAMPLE_TAGS;
  title = EXAMPLE_TAGS[1];

  gridModel: GridModel;
  rows: Observable<Atom[]>;
  currentUser = 'user1';
  users: Observable<string[]>;

  get storage(): PersistenceStorage {
    return {
      getItem: (id: string) =>
        new Promise<any>(resolve => {
          this.dataService
            .getAtomPresets(id, this.currentUser)
            .subscribe(() => resolve(null));
        }),
      setItem: (id: string, items: any) =>
        new Promise(resolve => {
          this.dataService
            .setAtomPresets(id, this.currentUser, items)
            .subscribe(resolve);
        }),
    };
  }

  constructor(
    private dataService: DataService,
    private qgrid: Grid,
  ) {
    this.rows = dataService.getAtoms();
    this.users = dataService.getUsers();
    this.gridModel = this.qgrid.model();
    this.gridModel.persistence({
      storage: this.storage,
    });
  }
}
