import { Component, OnInit } from '@angular/core';
import { ConditionUtilisationComponent } from '../Router/ModalConditionUtilisation/condition-utilisation/condition-utilisation.component';
import { SimpleModalService } from 'ngx-simple-modal';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  confirmResult = null;
  
  constructor(private SimpleModalService: SimpleModalService,
    ) { }

  showCgu() {
    console.log();
    this.SimpleModalService.addModal(ConditionUtilisationComponent, { closeOnClickOutside: true }, { closeOnEscape: true })
      .subscribe((isConfirmed) => {

        // Get modal result
        this.confirmResult = isConfirmed;
        if (isConfirmed) {
          this.ngOnInit();
        }

      });
  }

  ngOnInit() {
  }

}
