import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormItemComponent, NzFormLabelComponent, NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule } from 'ng-zorro-antd/table'; // Import NzTableModule
import { LocalStorageService } from '../../services/local-storage.service';
import { NzSelectModule } from 'ng-zorro-antd/select'; // Import NzSelectModule
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgxCurrencyDirective } from "ngx-currency";
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Vehicle } from '../../shared/models/Vehicle';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports:[
    CommonModule,
    NzIconModule,
    NzFormModule,
    NgxCurrencyDirective,
    ReactiveFormsModule, 
    NzSelectModule,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputNumberModule,
    NzCheckboxModule,
    NzButtonModule,
    NzInputModule,
    NzTableModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  itemForm!: FormGroup;
  isEditMode = false;
  isSubmitted: boolean = false;
  itemId?: number;
  data:any;

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(70)]],
      category: [null, Validators.required],
      quantity: [null, Validators.required],
      price: [null, Validators.required],
      isActive: [true, Validators.required]
    });

    this.itemForm.get('isActive')?.valueChanges.subscribe(isActive => {
      this.updateValidators(isActive);
    });
  

    if (this.data?.id) {
      this.isEditMode = true;
      this.itemId = +this.data.id;
      const item = this.localStorageService.getItems().find((i: any) => i.id === this.itemId);
      if (item) {
        this.itemForm.patchValue(item);
      }
    }
  }

  updateValidators(isActive: boolean) {
    if (isActive) {
      this.itemForm.get('quantity')?.setValidators([Validators.required]);
      this.itemForm.get('price')?.setValidators([Validators.required]);
    } else {
      this.itemForm.get('quantity')?.clearValidators();
      this.itemForm.get('price')?.clearValidators();
    }
    this.itemForm.get('quantity')?.updateValueAndValidity();
    this.itemForm.get('price')?.updateValueAndValidity();
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.itemForm.invalid) return;

    const itemData: Vehicle = { id: this.itemId, ...this.itemForm.value };
    this.localStorageService.saveItem(itemData);
    this.closeModal();
    this.message.success('Item cadastrado com sucesso!');
  }

  closeModal(): void {
    this.modalRef.destroy(); // Fecha a modal
  }
}