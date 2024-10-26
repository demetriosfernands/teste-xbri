import { Injectable } from '@angular/core';
import { Vehicle } from '../shared/models/Vehicle';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  
  private key = 'itens';

  getItems(): Vehicle[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  saveItem(item: Vehicle) {
    const items = this.getItems();
    if (item.id) {
      const index = items.findIndex((i: any) => i.id === item.id);
      items[index] = item;
    } else {
      item.id = new Date().getTime();
      items.push(item);
    }
    localStorage.setItem(this.key, JSON.stringify(items));
  }

  deleteItem(id: number) {
    const items = this.getItems().filter((item: any) => item.id !== id);
    localStorage.setItem(this.key, JSON.stringify(items));
  }
}