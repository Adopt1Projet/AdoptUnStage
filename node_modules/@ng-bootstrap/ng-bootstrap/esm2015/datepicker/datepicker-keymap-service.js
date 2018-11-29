/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NgbDatepickerService } from './datepicker-service';
import { NgbCalendar } from './ngb-calendar';
import { toString } from '../util/util';
import { Key } from '../util/key';
export class NgbDatepickerKeyMapService {
    /**
     * @param {?} _service
     * @param {?} _calendar
     */
    constructor(_service, _calendar) {
        this._service = _service;
        this._calendar = _calendar;
        _service.model$.subscribe(model => {
            this._minDate = model.minDate;
            this._maxDate = model.maxDate;
            this._firstViewDate = model.firstDate;
            this._lastViewDate = model.lastDate;
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    processKey(event) {
        // tslint:disable-next-line:deprecation
        const { which } = event;
        if (Key[toString(which)]) {
            switch (which) {
                case Key.PageUp:
                    this._service.focusMove(event.shiftKey ? 'y' : 'm', -1);
                    break;
                case Key.PageDown:
                    this._service.focusMove(event.shiftKey ? 'y' : 'm', 1);
                    break;
                case Key.End:
                    this._service.focus(event.shiftKey ? this._maxDate : this._lastViewDate);
                    break;
                case Key.Home:
                    this._service.focus(event.shiftKey ? this._minDate : this._firstViewDate);
                    break;
                case Key.ArrowLeft:
                    this._service.focusMove('d', -1);
                    break;
                case Key.ArrowUp:
                    this._service.focusMove('d', -this._calendar.getDaysPerWeek());
                    break;
                case Key.ArrowRight:
                    this._service.focusMove('d', 1);
                    break;
                case Key.ArrowDown:
                    this._service.focusMove('d', this._calendar.getDaysPerWeek());
                    break;
                case Key.Enter:
                case Key.Space:
                    this._service.focusSelect();
                    break;
                default:
                    return;
            }
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
NgbDatepickerKeyMapService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgbDatepickerKeyMapService.ctorParameters = () => [
    { type: NgbDatepickerService },
    { type: NgbCalendar }
];
if (false) {
    /** @type {?} */
    NgbDatepickerKeyMapService.prototype._minDate;
    /** @type {?} */
    NgbDatepickerKeyMapService.prototype._maxDate;
    /** @type {?} */
    NgbDatepickerKeyMapService.prototype._firstViewDate;
    /** @type {?} */
    NgbDatepickerKeyMapService.prototype._lastViewDate;
    /** @type {?} */
    NgbDatepickerKeyMapService.prototype._service;
    /** @type {?} */
    NgbDatepickerKeyMapService.prototype._calendar;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1rZXltYXAtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLWtleW1hcC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3RDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFJaEMsTUFBTSxPQUFPLDBCQUEwQjs7Ozs7SUFNckMsWUFBb0IsUUFBOEIsRUFBVSxTQUFzQjtRQUE5RCxhQUFRLEdBQVIsUUFBUSxDQUFzQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQWE7UUFDaEYsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsS0FBb0I7O2NBRXZCLEVBQUMsS0FBSyxFQUFDLEdBQUcsS0FBSztRQUNyQixJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN4QixRQUFRLEtBQUssRUFBRTtnQkFDYixLQUFLLEdBQUcsQ0FBQyxNQUFNO29CQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hELE1BQU07Z0JBQ1IsS0FBSyxHQUFHLENBQUMsUUFBUTtvQkFDZixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDdkQsTUFBTTtnQkFDUixLQUFLLEdBQUcsQ0FBQyxHQUFHO29CQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDekUsTUFBTTtnQkFDUixLQUFLLEdBQUcsQ0FBQyxJQUFJO29CQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDMUUsTUFBTTtnQkFDUixLQUFLLEdBQUcsQ0FBQyxTQUFTO29CQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakMsTUFBTTtnQkFDUixLQUFLLEdBQUcsQ0FBQyxPQUFPO29CQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDL0QsTUFBTTtnQkFDUixLQUFLLEdBQUcsQ0FBQyxVQUFVO29CQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLE1BQU07Z0JBQ1IsS0FBSyxHQUFHLENBQUMsU0FBUztvQkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztvQkFDOUQsTUFBTTtnQkFDUixLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQ2YsS0FBSyxHQUFHLENBQUMsS0FBSztvQkFDWixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUM1QixNQUFNO2dCQUNSO29CQUNFLE9BQU87YUFDVjtZQUVELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDOzs7WUF4REYsVUFBVTs7OztZQU5ILG9CQUFvQjtZQUNwQixXQUFXOzs7O0lBT2pCLDhDQUEwQjs7SUFDMUIsOENBQTBCOztJQUMxQixvREFBZ0M7O0lBQ2hDLG1EQUErQjs7SUFFbkIsOENBQXNDOztJQUFFLCtDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJTZXJ2aWNlfSBmcm9tICcuL2RhdGVwaWNrZXItc2VydmljZSc7XG5pbXBvcnQge05nYkNhbGVuZGFyfSBmcm9tICcuL25nYi1jYWxlbmRhcic7XG5pbXBvcnQge3RvU3RyaW5nfSBmcm9tICcuLi91dGlsL3V0aWwnO1xuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ2JEYXRlcGlja2VyS2V5TWFwU2VydmljZSB7XG4gIHByaXZhdGUgX21pbkRhdGU6IE5nYkRhdGU7XG4gIHByaXZhdGUgX21heERhdGU6IE5nYkRhdGU7XG4gIHByaXZhdGUgX2ZpcnN0Vmlld0RhdGU6IE5nYkRhdGU7XG4gIHByaXZhdGUgX2xhc3RWaWV3RGF0ZTogTmdiRGF0ZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBOZ2JEYXRlcGlja2VyU2VydmljZSwgcHJpdmF0ZSBfY2FsZW5kYXI6IE5nYkNhbGVuZGFyKSB7XG4gICAgX3NlcnZpY2UubW9kZWwkLnN1YnNjcmliZShtb2RlbCA9PiB7XG4gICAgICB0aGlzLl9taW5EYXRlID0gbW9kZWwubWluRGF0ZTtcbiAgICAgIHRoaXMuX21heERhdGUgPSBtb2RlbC5tYXhEYXRlO1xuICAgICAgdGhpcy5fZmlyc3RWaWV3RGF0ZSA9IG1vZGVsLmZpcnN0RGF0ZTtcbiAgICAgIHRoaXMuX2xhc3RWaWV3RGF0ZSA9IG1vZGVsLmxhc3REYXRlO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvY2Vzc0tleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkZXByZWNhdGlvblxuICAgIGNvbnN0IHt3aGljaH0gPSBldmVudDtcbiAgICBpZiAoS2V5W3RvU3RyaW5nKHdoaWNoKV0pIHtcbiAgICAgIHN3aXRjaCAod2hpY2gpIHtcbiAgICAgICAgY2FzZSBLZXkuUGFnZVVwOlxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKGV2ZW50LnNoaWZ0S2V5ID8gJ3knIDogJ20nLCAtMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS2V5LlBhZ2VEb3duOlxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKGV2ZW50LnNoaWZ0S2V5ID8gJ3knIDogJ20nLCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLZXkuRW5kOlxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXMoZXZlbnQuc2hpZnRLZXkgPyB0aGlzLl9tYXhEYXRlIDogdGhpcy5fbGFzdFZpZXdEYXRlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLZXkuSG9tZTpcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzKGV2ZW50LnNoaWZ0S2V5ID8gdGhpcy5fbWluRGF0ZSA6IHRoaXMuX2ZpcnN0Vmlld0RhdGUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtleS5BcnJvd0xlZnQ6XG4gICAgICAgICAgdGhpcy5fc2VydmljZS5mb2N1c01vdmUoJ2QnLCAtMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS2V5LkFycm93VXA6XG4gICAgICAgICAgdGhpcy5fc2VydmljZS5mb2N1c01vdmUoJ2QnLCAtdGhpcy5fY2FsZW5kYXIuZ2V0RGF5c1BlcldlZWsoKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS2V5LkFycm93UmlnaHQ6XG4gICAgICAgICAgdGhpcy5fc2VydmljZS5mb2N1c01vdmUoJ2QnLCAxKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dEb3duOlxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKCdkJywgdGhpcy5fY2FsZW5kYXIuZ2V0RGF5c1BlcldlZWsoKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS2V5LkVudGVyOlxuICAgICAgICBjYXNlIEtleS5TcGFjZTpcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzU2VsZWN0KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG59XG4iXX0=