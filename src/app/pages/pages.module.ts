import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  NbMenuModule,
  NbCardModule,
  NbCheckboxModule,
  NbSelectModule,
  NbInputModule,
  NbButtonModule,
  NbUserModule,
  NbSpinnerModule,
  NbIconModule,
  NbListModule,
  NbTabsetModule,
  NbRadioModule,
  NbTooltipModule,
  NbDatepickerModule,
  NbAlertModule,
} from '@nebular/theme';
import { Ng2CompleterModule } from 'ng2-completer';
import { ThemeModule } from '../@theme/theme.module';
import { NbFileUploaderModule } from '../@theme/components/file-uploader/file-uploader.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { ContractsComponent } from './contracts/contracts.component';
import { ContractDialogComponent } from './contracts/contract-dialog/contract-dialog.component';
import { ContractItemComponent } from './contracts/contract-item/contract-item.component';
import { InvoicesComponent } from './invoices/invoices.component';
import {
  InvoiceItemComponent,
  TextInputDialog,
} from './invoices/invoice-item/invoice-item.component';
import { InvoiceDialogComponent } from './invoices/invoice-dialog/invoice-dialog.component';
import { PaymentItemComponent } from './contracts/contract-item/payment-item/payment-item.component';
import { ContractorsComponent } from './contractors/contractors.component';
import { ContractorDialogComponent } from './contractors/contractor-dialog/contractor-dialog.component';
import { ContractorItemComponent } from './contractors/contractor-item/contractor-item.component';
import { ReceiptItemComponent } from './contracts/contract-item/receipt-item/receipt-item.component';
import { ExpenseItemComponent } from './contracts/contract-item/expense-item/expense-item.component';

@NgModule({
  imports: [
    DashboardModule,
    FormsModule,
    NbAlertModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbFileUploaderModule,
    NbIconModule,
    NbInputModule,
    NbListModule,
    NbMenuModule,
    NbRadioModule,
    NbSelectModule,
    NbSpinnerModule,
    NbTabsetModule,
    NbTooltipModule,
    NbUserModule,
    Ng2SmartTableModule,
    Ng2CompleterModule,
    PagesRoutingModule,
    SharedModule,
    ThemeModule,
  ],
  declarations: [
    PagesComponent,
    ProfileComponent,
    ContractsComponent,
    ContractDialogComponent,
    ContractItemComponent,
    InvoicesComponent,
    InvoiceItemComponent,
    TextInputDialog,
    InvoiceDialogComponent,
    PaymentItemComponent,
    ContractorsComponent,
    ContractorDialogComponent,
    ContractorItemComponent,
    ReceiptItemComponent,
    ExpenseItemComponent,
  ],
})
export class PagesModule {}
