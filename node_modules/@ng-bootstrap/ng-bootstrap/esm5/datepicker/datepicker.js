/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { take } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, TemplateRef, forwardRef, EventEmitter, Output, ElementRef, NgZone, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbCalendar } from './ngb-calendar';
import { NgbDate } from './ngb-date';
import { NgbDatepickerService } from './datepicker-service';
import { NgbDatepickerKeyMapService } from './datepicker-keymap-service';
import { NavigationEvent } from './datepicker-view-model';
import { NgbDatepickerConfig } from './datepicker-config';
import { NgbDateAdapter } from './adapters/ngb-date-adapter';
import { NgbDatepickerI18n } from './datepicker-i18n';
import { isChangedDate } from './datepicker-tools';
/** @type {?} */
var NGB_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NgbDatepicker; }),
    multi: true
};
/**
 * The payload of the datepicker navigation event
 * @record
 */
export function NgbDatepickerNavigateEvent() { }
if (false) {
    /**
     * Currently displayed month
     * @type {?}
     */
    NgbDatepickerNavigateEvent.prototype.current;
    /**
     * Month we're navigating to
     * @type {?}
     */
    NgbDatepickerNavigateEvent.prototype.next;
}
/**
 * A lightweight and highly configurable datepicker directive
 */
var NgbDatepicker = /** @class */ (function () {
    function NgbDatepicker(_keyMapService, _service, _calendar, i18n, config, _cd, _elementRef, _ngbDateAdapter, _ngZone) {
        var _this = this;
        this._keyMapService = _keyMapService;
        this._service = _service;
        this._calendar = _calendar;
        this.i18n = i18n;
        this._cd = _cd;
        this._elementRef = _elementRef;
        this._ngbDateAdapter = _ngbDateAdapter;
        this._ngZone = _ngZone;
        /**
         * An event fired when navigation happens and currently displayed month changes.
         * See NgbDatepickerNavigateEvent for the payload info.
         */
        this.navigate = new EventEmitter();
        /**
         * An event fired when user selects a date using keyboard or mouse.
         * The payload of the event is currently selected NgbDate.
         */
        this.select = new EventEmitter();
        this.onChange = function (_) { };
        this.onTouched = function () { };
        ['dayTemplate', 'dayTemplateData', 'displayMonths', 'firstDayOfWeek', 'footerTemplate', 'markDisabled', 'minDate',
            'maxDate', 'navigation', 'outsideDays', 'showWeekdays', 'showWeekNumbers', 'startDate']
            .forEach(function (input) { return _this[input] = config[input]; });
        this._selectSubscription = _service.select$.subscribe(function (date) { _this.select.emit(date); });
        this._subscription = _service.model$.subscribe(function (model) {
            /** @type {?} */
            var newDate = model.firstDate;
            /** @type {?} */
            var oldDate = _this.model ? _this.model.firstDate : null;
            /** @type {?} */
            var newSelectedDate = model.selectedDate;
            /** @type {?} */
            var newFocusedDate = model.focusDate;
            /** @type {?} */
            var oldFocusedDate = _this.model ? _this.model.focusDate : null;
            _this.model = model;
            // handling selection change
            if (isChangedDate(newSelectedDate, _this._controlValue)) {
                _this._controlValue = newSelectedDate;
                _this.onTouched();
                _this.onChange(_this._ngbDateAdapter.toModel(newSelectedDate));
            }
            // handling focus change
            if (isChangedDate(newFocusedDate, oldFocusedDate) && oldFocusedDate && model.focusVisible) {
                _this.focus();
            }
            // emitting navigation event if the first month changes
            if (!newDate.equals(oldDate)) {
                _this.navigate.emit({
                    current: oldDate ? { year: oldDate.year, month: oldDate.month } : null,
                    next: { year: newDate.year, month: newDate.month }
                });
            }
            _cd.markForCheck();
        });
    }
    /**
     * Manually focus the focusable day in the datepicker
     */
    /**
     * Manually focus the focusable day in the datepicker
     * @return {?}
     */
    NgbDatepicker.prototype.focus = /**
     * Manually focus the focusable day in the datepicker
     * @return {?}
     */
    function () {
        var _this = this;
        this._ngZone.onStable.asObservable().pipe(take(1)).subscribe(function () {
            /** @type {?} */
            var elementToFocus = _this._elementRef.nativeElement.querySelector('div.ngb-dp-day[tabindex="0"]');
            if (elementToFocus) {
                elementToFocus.focus();
            }
        });
    };
    /**
     * Navigates current view to provided date.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     * Use 'startDate' input as an alternative
     */
    /**
     * Navigates current view to provided date.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     * Use 'startDate' input as an alternative
     * @param {?=} date
     * @return {?}
     */
    NgbDatepicker.prototype.navigateTo = /**
     * Navigates current view to provided date.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided calendar will open current month.
     * Use 'startDate' input as an alternative
     * @param {?=} date
     * @return {?}
     */
    function (date) {
        this._service.open(NgbDate.from(date ? date.day ? (/** @type {?} */ (date)) : tslib_1.__assign({}, date, { day: 1 }) : null));
    };
    /**
     * @return {?}
     */
    NgbDatepicker.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
        this._selectSubscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    NgbDatepicker.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.model === undefined) {
            ['dayTemplateData', 'displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate',
                'outsideDays']
                .forEach(function (input) { return _this._service[input] = _this[input]; });
            this.navigateTo(this.startDate);
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbDatepicker.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        ['dayTemplateData', 'displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate',
            'outsideDays']
            .filter(function (input) { return input in changes; })
            .forEach(function (input) { return _this._service[input] = _this[input]; });
        if ('startDate' in changes) {
            this.navigateTo(this.startDate);
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDatepicker.prototype.onDateSelect = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this._service.focus(date);
        this._service.select(date, { emitEvent: true });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgbDatepicker.prototype.onKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) { this._keyMapService.processKey(event); };
    /**
     * @param {?} date
     * @return {?}
     */
    NgbDatepicker.prototype.onNavigateDateSelect = /**
     * @param {?} date
     * @return {?}
     */
    function (date) { this._service.open(date); };
    /**
     * @param {?} event
     * @return {?}
     */
    NgbDatepicker.prototype.onNavigateEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        switch (event) {
            case NavigationEvent.PREV:
                this._service.open(this._calendar.getPrev(this.model.firstDate, 'm', 1));
                break;
            case NavigationEvent.NEXT:
                this._service.open(this._calendar.getNext(this.model.firstDate, 'm', 1));
                break;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbDatepicker.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbDatepicker.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onTouched = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgbDatepicker.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) { this._service.disabled = isDisabled; };
    /**
     * @param {?} focusVisible
     * @return {?}
     */
    NgbDatepicker.prototype.showFocus = /**
     * @param {?} focusVisible
     * @return {?}
     */
    function (focusVisible) { this._service.focusVisible = focusVisible; };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbDatepicker.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._controlValue = NgbDate.from(this._ngbDateAdapter.fromModel(value));
        this._service.select(this._controlValue);
    };
    NgbDatepicker.decorators = [
        { type: Component, args: [{
                    exportAs: 'ngbDatepicker',
                    selector: 'ngb-datepicker',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: "\n    <ng-template #dt let-date=\"date\" let-currentMonth=\"currentMonth\" let-selected=\"selected\" let-disabled=\"disabled\" let-focused=\"focused\">\n      <div ngbDatepickerDayView\n        [date]=\"date\"\n        [currentMonth]=\"currentMonth\"\n        [selected]=\"selected\"\n        [disabled]=\"disabled\"\n        [focused]=\"focused\">\n      </div>\n    </ng-template>\n\n    <div class=\"ngb-dp-header bg-light\">\n      <ngb-datepicker-navigation *ngIf=\"navigation !== 'none'\"\n        [date]=\"model.firstDate\"\n        [months]=\"model.months\"\n        [disabled]=\"model.disabled\"\n        [showSelect]=\"model.navigation === 'select'\"\n        [prevDisabled]=\"model.prevDisabled\"\n        [nextDisabled]=\"model.nextDisabled\"\n        [selectBoxes]=\"model.selectBoxes\"\n        (navigate)=\"onNavigateEvent($event)\"\n        (select)=\"onNavigateDateSelect($event)\">\n      </ngb-datepicker-navigation>\n    </div>\n\n    <div class=\"ngb-dp-months\" (keydown)=\"onKeyDown($event)\" (focusin)=\"showFocus(true)\" (focusout)=\"showFocus(false)\">\n      <ng-template ngFor let-month [ngForOf]=\"model.months\" let-i=\"index\">\n        <div class=\"ngb-dp-month\">\n          <div *ngIf=\"navigation === 'none' || (displayMonths > 1 && navigation === 'select')\"\n                class=\"ngb-dp-month-name bg-light\">\n            {{ i18n.getMonthFullName(month.number, month.year) }} {{ i18n.getYearNumerals(month.year) }}\n          </div>\n          <ngb-datepicker-month-view\n            [month]=\"month\"\n            [dayTemplate]=\"dayTemplate || dt\"\n            [showWeekdays]=\"showWeekdays\"\n            [showWeekNumbers]=\"showWeekNumbers\"\n            (select)=\"onDateSelect($event)\">\n          </ngb-datepicker-month-view>\n        </div>\n      </ng-template>\n    </div>\n\n    <ng-template [ngTemplateOutlet]=\"footerTemplate\"></ng-template>\n  ",
                    providers: [NGB_DATEPICKER_VALUE_ACCESSOR, NgbDatepickerService, NgbDatepickerKeyMapService],
                    styles: ["ngb-datepicker{border:1px solid #dfdfdf;border-radius:.25rem;display:inline-block}.ngb-dp-month{pointer-events:none}.ngb-dp-header{border-bottom:0;border-radius:.25rem .25rem 0 0;padding-top:.25rem}ngb-datepicker-month-view{pointer-events:auto}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-month+.ngb-dp-month>.ngb-dp-month-name,.ngb-dp-month+.ngb-dp-month>ngb-datepicker-month-view>.ngb-dp-week{padding-left:1rem}.ngb-dp-month:last-child .ngb-dp-week{padding-right:.25rem}.ngb-dp-month:first-child .ngb-dp-week{padding-left:.25rem}.ngb-dp-month>ngb-datepicker-month-view>.ngb-dp-week:last-child{padding-bottom:.25rem}.ngb-dp-months{display:-ms-flexbox;display:flex}"]
                }] }
    ];
    /** @nocollapse */
    NgbDatepicker.ctorParameters = function () { return [
        { type: NgbDatepickerKeyMapService },
        { type: NgbDatepickerService },
        { type: NgbCalendar },
        { type: NgbDatepickerI18n },
        { type: NgbDatepickerConfig },
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgbDateAdapter },
        { type: NgZone }
    ]; };
    NgbDatepicker.propDecorators = {
        dayTemplate: [{ type: Input }],
        dayTemplateData: [{ type: Input }],
        displayMonths: [{ type: Input }],
        firstDayOfWeek: [{ type: Input }],
        footerTemplate: [{ type: Input }],
        markDisabled: [{ type: Input }],
        maxDate: [{ type: Input }],
        minDate: [{ type: Input }],
        navigation: [{ type: Input }],
        outsideDays: [{ type: Input }],
        showWeekdays: [{ type: Input }],
        showWeekNumbers: [{ type: Input }],
        startDate: [{ type: Input }],
        navigate: [{ type: Output }],
        select: [{ type: Output }]
    };
    return NgbDatepicker;
}());
export { NgbDatepicker };
if (false) {
    /** @type {?} */
    NgbDatepicker.prototype.model;
    /** @type {?} */
    NgbDatepicker.prototype._controlValue;
    /** @type {?} */
    NgbDatepicker.prototype._subscription;
    /** @type {?} */
    NgbDatepicker.prototype._selectSubscription;
    /**
     * Reference for the custom template for the day display
     * @type {?}
     */
    NgbDatepicker.prototype.dayTemplate;
    /**
     * Callback to pass any arbitrary data to the custom day template context
     * 'Current' contains the month that will be displayed in the view
     *
     * \@since 3.3.0
     * @type {?}
     */
    NgbDatepicker.prototype.dayTemplateData;
    /**
     * Number of months to display
     * @type {?}
     */
    NgbDatepicker.prototype.displayMonths;
    /**
     * First day of the week. With default calendar we use ISO 8601: 'weekday' is 1=Mon ... 7=Sun
     * @type {?}
     */
    NgbDatepicker.prototype.firstDayOfWeek;
    /**
     * Reference for the custom template for the footer
     *
     * \@since 3.3.0
     * @type {?}
     */
    NgbDatepicker.prototype.footerTemplate;
    /**
     * Callback to mark a given date as disabled.
     * 'Current' contains the month that will be displayed in the view
     * @type {?}
     */
    NgbDatepicker.prototype.markDisabled;
    /**
     * Max date for the navigation. If not provided, 'year' select box will display 10 years after current month
     * @type {?}
     */
    NgbDatepicker.prototype.maxDate;
    /**
     * Min date for the navigation. If not provided, 'year' select box will display 10 years before current month
     * @type {?}
     */
    NgbDatepicker.prototype.minDate;
    /**
     * Navigation type: `select` (default with select boxes for month and year), `arrows`
     * (without select boxes, only navigation arrows) or `none` (no navigation at all)
     * @type {?}
     */
    NgbDatepicker.prototype.navigation;
    /**
     * The way to display days that don't belong to current month: `visible` (default),
     * `hidden` (not displayed) or `collapsed` (not displayed with empty space collapsed)
     * @type {?}
     */
    NgbDatepicker.prototype.outsideDays;
    /**
     * Whether to display days of the week
     * @type {?}
     */
    NgbDatepicker.prototype.showWeekdays;
    /**
     * Whether to display week numbers
     * @type {?}
     */
    NgbDatepicker.prototype.showWeekNumbers;
    /**
     * Date to open calendar with.
     * With default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
     * If nothing or invalid date provided, calendar will open with current month.
     * Use 'navigateTo(date)' as an alternative
     * @type {?}
     */
    NgbDatepicker.prototype.startDate;
    /**
     * An event fired when navigation happens and currently displayed month changes.
     * See NgbDatepickerNavigateEvent for the payload info.
     * @type {?}
     */
    NgbDatepicker.prototype.navigate;
    /**
     * An event fired when user selects a date using keyboard or mouse.
     * The payload of the event is currently selected NgbDate.
     * @type {?}
     */
    NgbDatepicker.prototype.select;
    /** @type {?} */
    NgbDatepicker.prototype.onChange;
    /** @type {?} */
    NgbDatepicker.prototype.onTouched;
    /** @type {?} */
    NgbDatepicker.prototype._keyMapService;
    /** @type {?} */
    NgbDatepicker.prototype._service;
    /** @type {?} */
    NgbDatepicker.prototype._calendar;
    /** @type {?} */
    NgbDatepicker.prototype.i18n;
    /** @type {?} */
    NgbDatepicker.prototype._cd;
    /** @type {?} */
    NgbDatepicker.prototype._elementRef;
    /** @type {?} */
    NgbDatepicker.prototype._ngbDateAdapter;
    /** @type {?} */
    NgbDatepicker.prototype._ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci9kYXRlcGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3BDLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxLQUFLLEVBRUwsV0FBVyxFQUNYLFVBQVUsRUFHVixZQUFZLEVBQ1osTUFBTSxFQUVOLFVBQVUsRUFDVixNQUFNLEVBQ04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxpQkFBaUIsRUFBdUIsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRCxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RSxPQUFPLEVBQXNCLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRTdFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUUzRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7O0lBRTNDLDZCQUE2QixHQUFHO0lBQ3BDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsYUFBYSxFQUFiLENBQWEsQ0FBQztJQUM1QyxLQUFLLEVBQUUsSUFB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QTJCOztJQUUzQixzQ0FBK0I7O0lBQy9CLHNDQUFvQzs7SUFDcEMsNENBQTBDOzs7OztJQUkxQyxvQ0FBc0Q7Ozs7Ozs7O0lBUXRELHdDQUF5Rjs7Ozs7SUFLekYsc0NBQStCOzs7OztJQUsvQix1Q0FBZ0M7Ozs7Ozs7SUFPaEMsdUNBQTBDOzs7Ozs7SUFNMUMscUNBQTBGOzs7OztJQUsxRixnQ0FBZ0M7Ozs7O0lBS2hDLGdDQUFnQzs7Ozs7O0lBTWhDLG1DQUFrRDs7Ozs7O0lBTWxELG9DQUF5RDs7Ozs7SUFLekQscUNBQStCOzs7OztJQUsvQix3Q0FBa0M7Ozs7Ozs7O0lBUWxDLGtDQUFnRTs7Ozs7O0lBTWhFLGlDQUFvRTs7Ozs7O0lBTXBFLCtCQUErQzs7SUFFL0MsaUNBQTBCOztJQUMxQixrQ0FBcUI7O0lBR2pCLHVDQUFrRDs7SUFBRSxpQ0FBcUM7O0lBQ3pGLGtDQUE4Qjs7SUFBRSw2QkFBOEI7O0lBQzlELDRCQUE4Qjs7SUFBRSxvQ0FBNEM7O0lBQzVFLHdDQUE0Qzs7SUFBRSxnQ0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3Rha2V9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgZm9yd2FyZFJlZixcbiAgT25Jbml0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dCxcbiAgT25EZXN0cm95LFxuICBFbGVtZW50UmVmLFxuICBOZ1pvbmUsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7TmdiQ2FsZW5kYXJ9IGZyb20gJy4vbmdiLWNhbGVuZGFyJztcbmltcG9ydCB7TmdiRGF0ZX0gZnJvbSAnLi9uZ2ItZGF0ZSc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJTZXJ2aWNlfSBmcm9tICcuL2RhdGVwaWNrZXItc2VydmljZSc7XG5pbXBvcnQge05nYkRhdGVwaWNrZXJLZXlNYXBTZXJ2aWNlfSBmcm9tICcuL2RhdGVwaWNrZXIta2V5bWFwLXNlcnZpY2UnO1xuaW1wb3J0IHtEYXRlcGlja2VyVmlld01vZGVsLCBOYXZpZ2F0aW9uRXZlbnR9IGZyb20gJy4vZGF0ZXBpY2tlci12aWV3LW1vZGVsJztcbmltcG9ydCB7RGF5VGVtcGxhdGVDb250ZXh0fSBmcm9tICcuL2RhdGVwaWNrZXItZGF5LXRlbXBsYXRlLWNvbnRleHQnO1xuaW1wb3J0IHtOZ2JEYXRlcGlja2VyQ29uZmlnfSBmcm9tICcuL2RhdGVwaWNrZXItY29uZmlnJztcbmltcG9ydCB7TmdiRGF0ZUFkYXB0ZXJ9IGZyb20gJy4vYWRhcHRlcnMvbmdiLWRhdGUtYWRhcHRlcic7XG5pbXBvcnQge05nYkRhdGVTdHJ1Y3R9IGZyb20gJy4vbmdiLWRhdGUtc3RydWN0JztcbmltcG9ydCB7TmdiRGF0ZXBpY2tlckkxOG59IGZyb20gJy4vZGF0ZXBpY2tlci1pMThuJztcbmltcG9ydCB7aXNDaGFuZ2VkRGF0ZX0gZnJvbSAnLi9kYXRlcGlja2VyLXRvb2xzJztcblxuY29uc3QgTkdCX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JEYXRlcGlja2VyKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbi8qKlxuICogVGhlIHBheWxvYWQgb2YgdGhlIGRhdGVwaWNrZXIgbmF2aWdhdGlvbiBldmVudFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50IHtcbiAgLyoqXG4gICAqIEN1cnJlbnRseSBkaXNwbGF5ZWQgbW9udGhcbiAgICovXG4gIGN1cnJlbnQ6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9O1xuXG4gIC8qKlxuICAgKiBNb250aCB3ZSdyZSBuYXZpZ2F0aW5nIHRvXG4gICAqL1xuICBuZXh0OiB7eWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyfTtcbn1cblxuLyoqXG4gKiBBIGxpZ2h0d2VpZ2h0IGFuZCBoaWdobHkgY29uZmlndXJhYmxlIGRhdGVwaWNrZXIgZGlyZWN0aXZlXG4gKi9cbkBDb21wb25lbnQoe1xuICBleHBvcnRBczogJ25nYkRhdGVwaWNrZXInLFxuICBzZWxlY3RvcjogJ25nYi1kYXRlcGlja2VyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlVXJsczogWycuL2RhdGVwaWNrZXIuc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjZHQgbGV0LWRhdGU9XCJkYXRlXCIgbGV0LWN1cnJlbnRNb250aD1cImN1cnJlbnRNb250aFwiIGxldC1zZWxlY3RlZD1cInNlbGVjdGVkXCIgbGV0LWRpc2FibGVkPVwiZGlzYWJsZWRcIiBsZXQtZm9jdXNlZD1cImZvY3VzZWRcIj5cbiAgICAgIDxkaXYgbmdiRGF0ZXBpY2tlckRheVZpZXdcbiAgICAgICAgW2RhdGVdPVwiZGF0ZVwiXG4gICAgICAgIFtjdXJyZW50TW9udGhdPVwiY3VycmVudE1vbnRoXCJcbiAgICAgICAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgW2ZvY3VzZWRdPVwiZm9jdXNlZFwiPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxkaXYgY2xhc3M9XCJuZ2ItZHAtaGVhZGVyIGJnLWxpZ2h0XCI+XG4gICAgICA8bmdiLWRhdGVwaWNrZXItbmF2aWdhdGlvbiAqbmdJZj1cIm5hdmlnYXRpb24gIT09ICdub25lJ1wiXG4gICAgICAgIFtkYXRlXT1cIm1vZGVsLmZpcnN0RGF0ZVwiXG4gICAgICAgIFttb250aHNdPVwibW9kZWwubW9udGhzXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cIm1vZGVsLmRpc2FibGVkXCJcbiAgICAgICAgW3Nob3dTZWxlY3RdPVwibW9kZWwubmF2aWdhdGlvbiA9PT0gJ3NlbGVjdCdcIlxuICAgICAgICBbcHJldkRpc2FibGVkXT1cIm1vZGVsLnByZXZEaXNhYmxlZFwiXG4gICAgICAgIFtuZXh0RGlzYWJsZWRdPVwibW9kZWwubmV4dERpc2FibGVkXCJcbiAgICAgICAgW3NlbGVjdEJveGVzXT1cIm1vZGVsLnNlbGVjdEJveGVzXCJcbiAgICAgICAgKG5hdmlnYXRlKT1cIm9uTmF2aWdhdGVFdmVudCgkZXZlbnQpXCJcbiAgICAgICAgKHNlbGVjdCk9XCJvbk5hdmlnYXRlRGF0ZVNlbGVjdCgkZXZlbnQpXCI+XG4gICAgICA8L25nYi1kYXRlcGlja2VyLW5hdmlnYXRpb24+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLW1vbnRoc1wiIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCIgKGZvY3VzaW4pPVwic2hvd0ZvY3VzKHRydWUpXCIgKGZvY3Vzb3V0KT1cInNob3dGb2N1cyhmYWxzZSlcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtbW9udGggW25nRm9yT2ZdPVwibW9kZWwubW9udGhzXCIgbGV0LWk9XCJpbmRleFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibmdiLWRwLW1vbnRoXCI+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cIm5hdmlnYXRpb24gPT09ICdub25lJyB8fCAoZGlzcGxheU1vbnRocyA+IDEgJiYgbmF2aWdhdGlvbiA9PT0gJ3NlbGVjdCcpXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cIm5nYi1kcC1tb250aC1uYW1lIGJnLWxpZ2h0XCI+XG4gICAgICAgICAgICB7eyBpMThuLmdldE1vbnRoRnVsbE5hbWUobW9udGgubnVtYmVyLCBtb250aC55ZWFyKSB9fSB7eyBpMThuLmdldFllYXJOdW1lcmFscyhtb250aC55ZWFyKSB9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxuZ2ItZGF0ZXBpY2tlci1tb250aC12aWV3XG4gICAgICAgICAgICBbbW9udGhdPVwibW9udGhcIlxuICAgICAgICAgICAgW2RheVRlbXBsYXRlXT1cImRheVRlbXBsYXRlIHx8IGR0XCJcbiAgICAgICAgICAgIFtzaG93V2Vla2RheXNdPVwic2hvd1dlZWtkYXlzXCJcbiAgICAgICAgICAgIFtzaG93V2Vla051bWJlcnNdPVwic2hvd1dlZWtOdW1iZXJzXCJcbiAgICAgICAgICAgIChzZWxlY3QpPVwib25EYXRlU2VsZWN0KCRldmVudClcIj5cbiAgICAgICAgICA8L25nYi1kYXRlcGlja2VyLW1vbnRoLXZpZXc+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cblxuICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJmb290ZXJUZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIHByb3ZpZGVyczogW05HQl9EQVRFUElDS0VSX1ZBTFVFX0FDQ0VTU09SLCBOZ2JEYXRlcGlja2VyU2VydmljZSwgTmdiRGF0ZXBpY2tlcktleU1hcFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE5nYkRhdGVwaWNrZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3ksXG4gICAgT25DaGFuZ2VzLCBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgbW9kZWw6IERhdGVwaWNrZXJWaWV3TW9kZWw7XG5cbiAgcHJpdmF0ZSBfY29udHJvbFZhbHVlOiBOZ2JEYXRlO1xuICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfc2VsZWN0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgZm9yIHRoZSBjdXN0b20gdGVtcGxhdGUgZm9yIHRoZSBkYXkgZGlzcGxheVxuICAgKi9cbiAgQElucHV0KCkgZGF5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPERheVRlbXBsYXRlQ29udGV4dD47XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHRvIHBhc3MgYW55IGFyYml0cmFyeSBkYXRhIHRvIHRoZSBjdXN0b20gZGF5IHRlbXBsYXRlIGNvbnRleHRcbiAgICogJ0N1cnJlbnQnIGNvbnRhaW5zIHRoZSBtb250aCB0aGF0IHdpbGwgYmUgZGlzcGxheWVkIGluIHRoZSB2aWV3XG4gICAqXG4gICAqIEBzaW5jZSAzLjMuMFxuICAgKi9cbiAgQElucHV0KCkgZGF5VGVtcGxhdGVEYXRhOiAoZGF0ZTogTmdiRGF0ZSwgY3VycmVudDoge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlcn0pID0+IGFueTtcblxuICAvKipcbiAgICogTnVtYmVyIG9mIG1vbnRocyB0byBkaXNwbGF5XG4gICAqL1xuICBASW5wdXQoKSBkaXNwbGF5TW9udGhzOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEZpcnN0IGRheSBvZiB0aGUgd2Vlay4gV2l0aCBkZWZhdWx0IGNhbGVuZGFyIHdlIHVzZSBJU08gODYwMTogJ3dlZWtkYXknIGlzIDE9TW9uIC4uLiA3PVN1blxuICAgKi9cbiAgQElucHV0KCkgZmlyc3REYXlPZldlZWs6IG51bWJlcjtcblxuICAvKipcbiAgICogUmVmZXJlbmNlIGZvciB0aGUgY3VzdG9tIHRlbXBsYXRlIGZvciB0aGUgZm9vdGVyXG4gICAqXG4gICAqIEBzaW5jZSAzLjMuMFxuICAgKi9cbiAgQElucHV0KCkgZm9vdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIHRvIG1hcmsgYSBnaXZlbiBkYXRlIGFzIGRpc2FibGVkLlxuICAgKiAnQ3VycmVudCcgY29udGFpbnMgdGhlIG1vbnRoIHRoYXQgd2lsbCBiZSBkaXNwbGF5ZWQgaW4gdGhlIHZpZXdcbiAgICovXG4gIEBJbnB1dCgpIG1hcmtEaXNhYmxlZDogKGRhdGU6IE5nYkRhdGUsIGN1cnJlbnQ6IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXJ9KSA9PiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBNYXggZGF0ZSBmb3IgdGhlIG5hdmlnYXRpb24uIElmIG5vdCBwcm92aWRlZCwgJ3llYXInIHNlbGVjdCBib3ggd2lsbCBkaXNwbGF5IDEwIHllYXJzIGFmdGVyIGN1cnJlbnQgbW9udGhcbiAgICovXG4gIEBJbnB1dCgpIG1heERhdGU6IE5nYkRhdGVTdHJ1Y3Q7XG5cbiAgLyoqXG4gICAqIE1pbiBkYXRlIGZvciB0aGUgbmF2aWdhdGlvbi4gSWYgbm90IHByb3ZpZGVkLCAneWVhcicgc2VsZWN0IGJveCB3aWxsIGRpc3BsYXkgMTAgeWVhcnMgYmVmb3JlIGN1cnJlbnQgbW9udGhcbiAgICovXG4gIEBJbnB1dCgpIG1pbkRhdGU6IE5nYkRhdGVTdHJ1Y3Q7XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRpb24gdHlwZTogYHNlbGVjdGAgKGRlZmF1bHQgd2l0aCBzZWxlY3QgYm94ZXMgZm9yIG1vbnRoIGFuZCB5ZWFyKSwgYGFycm93c2BcbiAgICogKHdpdGhvdXQgc2VsZWN0IGJveGVzLCBvbmx5IG5hdmlnYXRpb24gYXJyb3dzKSBvciBgbm9uZWAgKG5vIG5hdmlnYXRpb24gYXQgYWxsKVxuICAgKi9cbiAgQElucHV0KCkgbmF2aWdhdGlvbjogJ3NlbGVjdCcgfCAnYXJyb3dzJyB8ICdub25lJztcblxuICAvKipcbiAgICogVGhlIHdheSB0byBkaXNwbGF5IGRheXMgdGhhdCBkb24ndCBiZWxvbmcgdG8gY3VycmVudCBtb250aDogYHZpc2libGVgIChkZWZhdWx0KSxcbiAgICogYGhpZGRlbmAgKG5vdCBkaXNwbGF5ZWQpIG9yIGBjb2xsYXBzZWRgIChub3QgZGlzcGxheWVkIHdpdGggZW1wdHkgc3BhY2UgY29sbGFwc2VkKVxuICAgKi9cbiAgQElucHV0KCkgb3V0c2lkZURheXM6ICd2aXNpYmxlJyB8ICdjb2xsYXBzZWQnIHwgJ2hpZGRlbic7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gZGlzcGxheSBkYXlzIG9mIHRoZSB3ZWVrXG4gICAqL1xuICBASW5wdXQoKSBzaG93V2Vla2RheXM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gZGlzcGxheSB3ZWVrIG51bWJlcnNcbiAgICovXG4gIEBJbnB1dCgpIHNob3dXZWVrTnVtYmVyczogYm9vbGVhbjtcblxuICAvKipcbiAgICogRGF0ZSB0byBvcGVuIGNhbGVuZGFyIHdpdGguXG4gICAqIFdpdGggZGVmYXVsdCBjYWxlbmRhciB3ZSB1c2UgSVNPIDg2MDE6ICdtb250aCcgaXMgMT1KYW4gLi4uIDEyPURlYy5cbiAgICogSWYgbm90aGluZyBvciBpbnZhbGlkIGRhdGUgcHJvdmlkZWQsIGNhbGVuZGFyIHdpbGwgb3BlbiB3aXRoIGN1cnJlbnQgbW9udGguXG4gICAqIFVzZSAnbmF2aWdhdGVUbyhkYXRlKScgYXMgYW4gYWx0ZXJuYXRpdmVcbiAgICovXG4gIEBJbnB1dCgpIHN0YXJ0RGF0ZToge3llYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF5PzogbnVtYmVyfTtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZmlyZWQgd2hlbiBuYXZpZ2F0aW9uIGhhcHBlbnMgYW5kIGN1cnJlbnRseSBkaXNwbGF5ZWQgbW9udGggY2hhbmdlcy5cbiAgICogU2VlIE5nYkRhdGVwaWNrZXJOYXZpZ2F0ZUV2ZW50IGZvciB0aGUgcGF5bG9hZCBpbmZvLlxuICAgKi9cbiAgQE91dHB1dCgpIG5hdmlnYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JEYXRlcGlja2VyTmF2aWdhdGVFdmVudD4oKTtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZmlyZWQgd2hlbiB1c2VyIHNlbGVjdHMgYSBkYXRlIHVzaW5nIGtleWJvYXJkIG9yIG1vdXNlLlxuICAgKiBUaGUgcGF5bG9hZCBvZiB0aGUgZXZlbnQgaXMgY3VycmVudGx5IHNlbGVjdGVkIE5nYkRhdGUuXG4gICAqL1xuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxOZ2JEYXRlPigpO1xuXG4gIG9uQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfa2V5TWFwU2VydmljZTogTmdiRGF0ZXBpY2tlcktleU1hcFNlcnZpY2UsIHB1YmxpYyBfc2VydmljZTogTmdiRGF0ZXBpY2tlclNlcnZpY2UsXG4gICAgICBwcml2YXRlIF9jYWxlbmRhcjogTmdiQ2FsZW5kYXIsIHB1YmxpYyBpMThuOiBOZ2JEYXRlcGlja2VySTE4biwgY29uZmlnOiBOZ2JEYXRlcGlja2VyQ29uZmlnLFxuICAgICAgcHJpdmF0ZSBfY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgIHByaXZhdGUgX25nYkRhdGVBZGFwdGVyOiBOZ2JEYXRlQWRhcHRlcjxhbnk+LCBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSkge1xuICAgIFsnZGF5VGVtcGxhdGUnLCAnZGF5VGVtcGxhdGVEYXRhJywgJ2Rpc3BsYXlNb250aHMnLCAnZmlyc3REYXlPZldlZWsnLCAnZm9vdGVyVGVtcGxhdGUnLCAnbWFya0Rpc2FibGVkJywgJ21pbkRhdGUnLFxuICAgICAnbWF4RGF0ZScsICduYXZpZ2F0aW9uJywgJ291dHNpZGVEYXlzJywgJ3Nob3dXZWVrZGF5cycsICdzaG93V2Vla051bWJlcnMnLCAnc3RhcnREYXRlJ11cbiAgICAgICAgLmZvckVhY2goaW5wdXQgPT4gdGhpc1tpbnB1dF0gPSBjb25maWdbaW5wdXRdKTtcblxuICAgIHRoaXMuX3NlbGVjdFN1YnNjcmlwdGlvbiA9IF9zZXJ2aWNlLnNlbGVjdCQuc3Vic2NyaWJlKGRhdGUgPT4geyB0aGlzLnNlbGVjdC5lbWl0KGRhdGUpOyB9KTtcblxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IF9zZXJ2aWNlLm1vZGVsJC5zdWJzY3JpYmUobW9kZWwgPT4ge1xuICAgICAgY29uc3QgbmV3RGF0ZSA9IG1vZGVsLmZpcnN0RGF0ZTtcbiAgICAgIGNvbnN0IG9sZERhdGUgPSB0aGlzLm1vZGVsID8gdGhpcy5tb2RlbC5maXJzdERhdGUgOiBudWxsO1xuICAgICAgY29uc3QgbmV3U2VsZWN0ZWREYXRlID0gbW9kZWwuc2VsZWN0ZWREYXRlO1xuICAgICAgY29uc3QgbmV3Rm9jdXNlZERhdGUgPSBtb2RlbC5mb2N1c0RhdGU7XG4gICAgICBjb25zdCBvbGRGb2N1c2VkRGF0ZSA9IHRoaXMubW9kZWwgPyB0aGlzLm1vZGVsLmZvY3VzRGF0ZSA6IG51bGw7XG5cbiAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcblxuICAgICAgLy8gaGFuZGxpbmcgc2VsZWN0aW9uIGNoYW5nZVxuICAgICAgaWYgKGlzQ2hhbmdlZERhdGUobmV3U2VsZWN0ZWREYXRlLCB0aGlzLl9jb250cm9sVmFsdWUpKSB7XG4gICAgICAgIHRoaXMuX2NvbnRyb2xWYWx1ZSA9IG5ld1NlbGVjdGVkRGF0ZTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLl9uZ2JEYXRlQWRhcHRlci50b01vZGVsKG5ld1NlbGVjdGVkRGF0ZSkpO1xuICAgICAgfVxuXG4gICAgICAvLyBoYW5kbGluZyBmb2N1cyBjaGFuZ2VcbiAgICAgIGlmIChpc0NoYW5nZWREYXRlKG5ld0ZvY3VzZWREYXRlLCBvbGRGb2N1c2VkRGF0ZSkgJiYgb2xkRm9jdXNlZERhdGUgJiYgbW9kZWwuZm9jdXNWaXNpYmxlKSB7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdHRpbmcgbmF2aWdhdGlvbiBldmVudCBpZiB0aGUgZmlyc3QgbW9udGggY2hhbmdlc1xuICAgICAgaWYgKCFuZXdEYXRlLmVxdWFscyhvbGREYXRlKSkge1xuICAgICAgICB0aGlzLm5hdmlnYXRlLmVtaXQoe1xuICAgICAgICAgIGN1cnJlbnQ6IG9sZERhdGUgPyB7eWVhcjogb2xkRGF0ZS55ZWFyLCBtb250aDogb2xkRGF0ZS5tb250aH0gOiBudWxsLFxuICAgICAgICAgIG5leHQ6IHt5ZWFyOiBuZXdEYXRlLnllYXIsIG1vbnRoOiBuZXdEYXRlLm1vbnRofVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIF9jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYW51YWxseSBmb2N1cyB0aGUgZm9jdXNhYmxlIGRheSBpbiB0aGUgZGF0ZXBpY2tlclxuICAgKi9cbiAgZm9jdXMoKSB7XG4gICAgdGhpcy5fbmdab25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IGVsZW1lbnRUb0ZvY3VzID1cbiAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRGl2RWxlbWVudD4oJ2Rpdi5uZ2ItZHAtZGF5W3RhYmluZGV4PVwiMFwiXScpO1xuICAgICAgaWYgKGVsZW1lbnRUb0ZvY3VzKSB7XG4gICAgICAgIGVsZW1lbnRUb0ZvY3VzLmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTmF2aWdhdGVzIGN1cnJlbnQgdmlldyB0byBwcm92aWRlZCBkYXRlLlxuICAgKiBXaXRoIGRlZmF1bHQgY2FsZW5kYXIgd2UgdXNlIElTTyA4NjAxOiAnbW9udGgnIGlzIDE9SmFuIC4uLiAxMj1EZWMuXG4gICAqIElmIG5vdGhpbmcgb3IgaW52YWxpZCBkYXRlIHByb3ZpZGVkIGNhbGVuZGFyIHdpbGwgb3BlbiBjdXJyZW50IG1vbnRoLlxuICAgKiBVc2UgJ3N0YXJ0RGF0ZScgaW5wdXQgYXMgYW4gYWx0ZXJuYXRpdmVcbiAgICovXG4gIG5hdmlnYXRlVG8oZGF0ZT86IHt5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheT86IG51bWJlcn0pIHtcbiAgICB0aGlzLl9zZXJ2aWNlLm9wZW4oTmdiRGF0ZS5mcm9tKGRhdGUgPyBkYXRlLmRheSA/IGRhdGUgYXMgTmdiRGF0ZVN0cnVjdCA6IHsuLi5kYXRlLCBkYXk6IDF9IDogbnVsbCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc2VsZWN0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5tb2RlbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBbJ2RheVRlbXBsYXRlRGF0YScsICdkaXNwbGF5TW9udGhzJywgJ21hcmtEaXNhYmxlZCcsICdmaXJzdERheU9mV2VlaycsICduYXZpZ2F0aW9uJywgJ21pbkRhdGUnLCAnbWF4RGF0ZScsXG4gICAgICAgJ291dHNpZGVEYXlzJ11cbiAgICAgICAgICAuZm9yRWFjaChpbnB1dCA9PiB0aGlzLl9zZXJ2aWNlW2lucHV0XSA9IHRoaXNbaW5wdXRdKTtcbiAgICAgIHRoaXMubmF2aWdhdGVUbyh0aGlzLnN0YXJ0RGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIFsnZGF5VGVtcGxhdGVEYXRhJywgJ2Rpc3BsYXlNb250aHMnLCAnbWFya0Rpc2FibGVkJywgJ2ZpcnN0RGF5T2ZXZWVrJywgJ25hdmlnYXRpb24nLCAnbWluRGF0ZScsICdtYXhEYXRlJyxcbiAgICAgJ291dHNpZGVEYXlzJ11cbiAgICAgICAgLmZpbHRlcihpbnB1dCA9PiBpbnB1dCBpbiBjaGFuZ2VzKVxuICAgICAgICAuZm9yRWFjaChpbnB1dCA9PiB0aGlzLl9zZXJ2aWNlW2lucHV0XSA9IHRoaXNbaW5wdXRdKTtcblxuICAgIGlmICgnc3RhcnREYXRlJyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLm5hdmlnYXRlVG8odGhpcy5zdGFydERhdGUpO1xuICAgIH1cbiAgfVxuXG4gIG9uRGF0ZVNlbGVjdChkYXRlOiBOZ2JEYXRlKSB7XG4gICAgdGhpcy5fc2VydmljZS5mb2N1cyhkYXRlKTtcbiAgICB0aGlzLl9zZXJ2aWNlLnNlbGVjdChkYXRlLCB7ZW1pdEV2ZW50OiB0cnVlfSk7XG4gIH1cblxuICBvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHsgdGhpcy5fa2V5TWFwU2VydmljZS5wcm9jZXNzS2V5KGV2ZW50KTsgfVxuXG4gIG9uTmF2aWdhdGVEYXRlU2VsZWN0KGRhdGU6IE5nYkRhdGUpIHsgdGhpcy5fc2VydmljZS5vcGVuKGRhdGUpOyB9XG5cbiAgb25OYXZpZ2F0ZUV2ZW50KGV2ZW50OiBOYXZpZ2F0aW9uRXZlbnQpIHtcbiAgICBzd2l0Y2ggKGV2ZW50KSB7XG4gICAgICBjYXNlIE5hdmlnYXRpb25FdmVudC5QUkVWOlxuICAgICAgICB0aGlzLl9zZXJ2aWNlLm9wZW4odGhpcy5fY2FsZW5kYXIuZ2V0UHJldih0aGlzLm1vZGVsLmZpcnN0RGF0ZSwgJ20nLCAxKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBOYXZpZ2F0aW9uRXZlbnQuTkVYVDpcbiAgICAgICAgdGhpcy5fc2VydmljZS5vcGVuKHRoaXMuX2NhbGVuZGFyLmdldE5leHQodGhpcy5tb2RlbC5maXJzdERhdGUsICdtJywgMSkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7IHRoaXMub25DaGFuZ2UgPSBmbjsgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vblRvdWNoZWQgPSBmbjsgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbikgeyB0aGlzLl9zZXJ2aWNlLmRpc2FibGVkID0gaXNEaXNhYmxlZDsgfVxuXG4gIHNob3dGb2N1cyhmb2N1c1Zpc2libGU6IGJvb2xlYW4pIHsgdGhpcy5fc2VydmljZS5mb2N1c1Zpc2libGUgPSBmb2N1c1Zpc2libGU7IH1cblxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5fY29udHJvbFZhbHVlID0gTmdiRGF0ZS5mcm9tKHRoaXMuX25nYkRhdGVBZGFwdGVyLmZyb21Nb2RlbCh2YWx1ZSkpO1xuICAgIHRoaXMuX3NlcnZpY2Uuc2VsZWN0KHRoaXMuX2NvbnRyb2xWYWx1ZSk7XG4gIH1cbn1cbiJdfQ==