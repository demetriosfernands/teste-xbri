import { Routes } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/listagem', pathMatch: 'full' },
    { path: 'cadastro', component: ProductFormComponent },
    { path: 'listagem', component: ProductListComponent }
];
