import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { contexts as allContexts } from './contexts/all.contexts';
import { Context } from './contexts/context';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @ViewChild('menubar') menuBar!: Menubar;

  items: MenuItem[] = [];
  context: Context | undefined = undefined;
  selectContextMenuItem: MenuItem = {
    label: 'Select game...',
    icon: 'pi pi-angle-down',
  };

  private contexts = allContexts;

  ngOnInit(): void {
    this.selectContextMenuItem.items = this.getMenusContexts();

    this.items = [
      {
        label: 'Planner',
        icon: 'pi pi-home',
      },
      this.selectContextMenuItem,
    ];
  }

  private getMenusContexts(): MenuItem[] {
    return this.contexts.map(x => ({
      id: x.id,
      label: x.name,
      command: (e) => this.selectContext(e),
    }));
  }

  private selectContext(event: any) {
    console.log(`Selected context:`, event);
    this.context = this.contexts.find(x => x.id === event.item.id);
    this.selectContextMenuItem.label = this.context?.name || 'Select game...';
  }
}
