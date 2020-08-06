import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ContractService } from '../../../shared/services/contract.service';
import * as contract_validation from '../../../shared/contract-validation.json';
import { StringUtilService } from '../../../shared/services/string-util.service';

@Component({
  selector: 'ngx-contract-item',
  templateUrl: './contract-item.component.html',
  styleUrls: ['./contract-item.component.scss'],
})
export class ContractItemComponent implements OnInit {
  @Input() contract: any;
  @Output() submit = new EventEmitter<void>();
  submitted = false;
  contractNumber: number;
  validation = (contract_validation as any).default;
  STATOOS = ['Em andamento', 'Concluído', 'Arquivado'];
  INTERESTS = [...Array(24).keys()].map((index) => (index + 1).toString());
  paymentIcon = {
    icon: 'dollar-sign',
    pack: 'fa',
  };

  constructor(
    private contractService: ContractService,
    private stringUtil: StringUtilService
  ) {}

  ngOnInit(): void {
    this.contract.interest = this.contract.payments.length;
    this.contract.paid = this.stringUtil.numberToMoney(
      this.contract.payments.reduce(
        (accumulator: number, payment: any) =>
          accumulator + this.stringUtil.moneyToNumber(payment.value),
        0
      )
    );
    console.log(this.contract);
  }

  updateContract(): void {
    this.submitted = true;
    let version = +this.contract.version;
    version += 1;
    this.contract.version = version.toString().padStart(2, '0');
    this.contractService.editContract(this.contract);
    this.submit.emit();
  }

  paymentDialog(event): void {}
}
