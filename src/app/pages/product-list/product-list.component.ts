import { Component, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LocalStorageService } from '../../services/local-storage.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { Vehicle } from '../../shared/models/Vehicle';

@Component({
  selector: 'app-item-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [
    NzTableModule,
    NzIconModule,
    NzCardModule,
    NzButtonComponent,
    CommonModule,
    ProductFormComponent,
    NzModalModule,
  ],
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  
  items: Vehicle[] = [];

  constructor(
    private message: NzMessageService,
    private modalService: NzModalService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.items = this.localStorageService.getItems();
  }

  editItem(item: any): void {
    this.openModalForm(item);
  }
  
  openModalConfirm(item: Vehicle): void {
    const modal = this.modalService.confirm({
      nzTitle: 'Deseja realmente deletar este item ?',
      nzContent: `Nome: ${item.name} <br> Tipo: ${item.category}`,
      nzOnOk: () => {
        this.localStorageService.deleteItem(item.id);
        this.loadItems();
        this.message.success('Item excluído com sucesso');
      }
    });
  }

  openModalForm(data?:any) {
    const modal = this.modalService.create({
      nzTitle: 'Cadastro de veículos',
      nzContent: ProductFormComponent,
      nzFooter: null, // Se você não quer o footer padrão
    });

    modal.componentInstance!.data = data;

    modal.afterClose.subscribe(result => {
      this.loadItems();
    });
  }
}