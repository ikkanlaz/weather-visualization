import { Input, Component } from '@angular/core';

@Component({
  selector: 'ngbd-alert-closeable',
  templateUrl: './alert-closeable.component.html',
  styleUrls: ['./alert-closeable.component.scss']
})
export class AlertCloseableComponent {

  @Input()
  public alerts: Array<IAlert> = [];

  private backup: Array<IAlert>;

  constructor() {
    this.alerts.push({
      id: 1,
      type: 'info',
      message: 'Location already added',
    });
    this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
