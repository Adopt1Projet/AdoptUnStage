/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NgbDatepickerService } from './datepicker-service';
import { NgbCalendar } from './ngb-calendar';
import { toString } from '../util/util';
import { Key } from '../util/key';
var NgbDatepickerKeyMapService = /** @class */ (function () {
    function NgbDatepickerKeyMapService(_service, _calendar) {
        var _this = this;
        this._service = _service;
        this._calendar = _calendar;
        _service.model$.subscribe(function (model) {
            _this._minDate = model.minDate;
            _this._maxDate = model.maxDate;
            _this._firstViewDate = model.firstDate;
            _this._lastViewDate = model.lastDate;
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    NgbDatepickerKeyMapService.prototype.processKey = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // tslint:disable-next-line:deprecation
        var which = event.which;
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
    };
    NgbDatepickerKeyMapService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NgbDatepickerKeyMapService.ctorParameters = function () { return [
        { type: NgbDatepickerService },
        { type: NgbCalendar }
    ]; };
    return NgbDatepickerKeyMapService;
}());
export { NgbDatepickerKeyMapService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1rZXltYXAtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLWtleW1hcC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzFELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3RDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFHaEM7SUFPRSxvQ0FBb0IsUUFBOEIsRUFBVSxTQUFzQjtRQUFsRixpQkFPQztRQVBtQixhQUFRLEdBQVIsUUFBUSxDQUFzQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQWE7UUFDaEYsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQzdCLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUM5QixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDOUIsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQ3RDLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRUQsK0NBQVU7Ozs7SUFBVixVQUFXLEtBQW9COztRQUV0QixJQUFBLG1CQUFLO1FBQ1osSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDeEIsUUFBUSxLQUFLLEVBQUU7Z0JBQ2IsS0FBSyxHQUFHLENBQUMsTUFBTTtvQkFDYixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxNQUFNO2dCQUNSLEtBQUssR0FBRyxDQUFDLFFBQVE7b0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZELE1BQU07Z0JBQ1IsS0FBSyxHQUFHLENBQUMsR0FBRztvQkFDVixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ3pFLE1BQU07Z0JBQ1IsS0FBSyxHQUFHLENBQUMsSUFBSTtvQkFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQzFFLE1BQU07Z0JBQ1IsS0FBSyxHQUFHLENBQUMsU0FBUztvQkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pDLE1BQU07Z0JBQ1IsS0FBSyxHQUFHLENBQUMsT0FBTztvQkFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7b0JBQy9ELE1BQU07Z0JBQ1IsS0FBSyxHQUFHLENBQUMsVUFBVTtvQkFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxNQUFNO2dCQUNSLEtBQUssR0FBRyxDQUFDLFNBQVM7b0JBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7b0JBQzlELE1BQU07Z0JBQ1IsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUNmLEtBQUssR0FBRyxDQUFDLEtBQUs7b0JBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDNUIsTUFBTTtnQkFDUjtvQkFDRSxPQUFPO2FBQ1Y7WUFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQzs7Z0JBeERGLFVBQVU7Ozs7Z0JBTkgsb0JBQW9CO2dCQUNwQixXQUFXOztJQThEbkIsaUNBQUM7Q0FBQSxBQXpERCxJQXlEQztTQXhEWSwwQkFBMEI7OztJQUNyQyw4Q0FBMEI7O0lBQzFCLDhDQUEwQjs7SUFDMUIsb0RBQWdDOztJQUNoQyxtREFBK0I7O0lBRW5CLDhDQUFzQzs7SUFBRSwrQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VyU2VydmljZX0gZnJvbSAnLi9kYXRlcGlja2VyLXNlcnZpY2UnO1xuaW1wb3J0IHtOZ2JDYWxlbmRhcn0gZnJvbSAnLi9uZ2ItY2FsZW5kYXInO1xuaW1wb3J0IHt0b1N0cmluZ30gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7S2V5fSBmcm9tICcuLi91dGlsL2tleSc7XG5pbXBvcnQge05nYkRhdGV9IGZyb20gJy4vbmdiLWRhdGUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmdiRGF0ZXBpY2tlcktleU1hcFNlcnZpY2Uge1xuICBwcml2YXRlIF9taW5EYXRlOiBOZ2JEYXRlO1xuICBwcml2YXRlIF9tYXhEYXRlOiBOZ2JEYXRlO1xuICBwcml2YXRlIF9maXJzdFZpZXdEYXRlOiBOZ2JEYXRlO1xuICBwcml2YXRlIF9sYXN0Vmlld0RhdGU6IE5nYkRhdGU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VydmljZTogTmdiRGF0ZXBpY2tlclNlcnZpY2UsIHByaXZhdGUgX2NhbGVuZGFyOiBOZ2JDYWxlbmRhcikge1xuICAgIF9zZXJ2aWNlLm1vZGVsJC5zdWJzY3JpYmUobW9kZWwgPT4ge1xuICAgICAgdGhpcy5fbWluRGF0ZSA9IG1vZGVsLm1pbkRhdGU7XG4gICAgICB0aGlzLl9tYXhEYXRlID0gbW9kZWwubWF4RGF0ZTtcbiAgICAgIHRoaXMuX2ZpcnN0Vmlld0RhdGUgPSBtb2RlbC5maXJzdERhdGU7XG4gICAgICB0aGlzLl9sYXN0Vmlld0RhdGUgPSBtb2RlbC5sYXN0RGF0ZTtcbiAgICB9KTtcbiAgfVxuXG4gIHByb2Nlc3NLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICBjb25zdCB7d2hpY2h9ID0gZXZlbnQ7XG4gICAgaWYgKEtleVt0b1N0cmluZyh3aGljaCldKSB7XG4gICAgICBzd2l0Y2ggKHdoaWNoKSB7XG4gICAgICAgIGNhc2UgS2V5LlBhZ2VVcDpcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzTW92ZShldmVudC5zaGlmdEtleSA/ICd5JyA6ICdtJywgLTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtleS5QYWdlRG93bjpcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzTW92ZShldmVudC5zaGlmdEtleSA/ICd5JyA6ICdtJywgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS2V5LkVuZDpcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzKGV2ZW50LnNoaWZ0S2V5ID8gdGhpcy5fbWF4RGF0ZSA6IHRoaXMuX2xhc3RWaWV3RGF0ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS2V5LkhvbWU6XG4gICAgICAgICAgdGhpcy5fc2VydmljZS5mb2N1cyhldmVudC5zaGlmdEtleSA/IHRoaXMuX21pbkRhdGUgOiB0aGlzLl9maXJzdFZpZXdEYXRlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dMZWZ0OlxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKCdkJywgLTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtleS5BcnJvd1VwOlxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKCdkJywgLXRoaXMuX2NhbGVuZGFyLmdldERheXNQZXJXZWVrKCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtleS5BcnJvd1JpZ2h0OlxuICAgICAgICAgIHRoaXMuX3NlcnZpY2UuZm9jdXNNb3ZlKCdkJywgMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgS2V5LkFycm93RG93bjpcbiAgICAgICAgICB0aGlzLl9zZXJ2aWNlLmZvY3VzTW92ZSgnZCcsIHRoaXMuX2NhbGVuZGFyLmdldERheXNQZXJXZWVrKCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtleS5FbnRlcjpcbiAgICAgICAgY2FzZSBLZXkuU3BhY2U6XG4gICAgICAgICAgdGhpcy5fc2VydmljZS5mb2N1c1NlbGVjdCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxufVxuIl19