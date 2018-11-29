/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, TemplateRef, ContentChild, forwardRef, ChangeDetectorRef } from '@angular/core';
import { NgbRatingConfig } from './rating-config';
import { toString, getValueInRange } from '../util/util';
import { Key } from '../util/key';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/**
 * Context for the custom star display template
 * @record
 */
export function StarTemplateContext() { }
if (false) {
    /**
     * Star fill percentage. An integer value between 0 and 100
     * @type {?}
     */
    StarTemplateContext.prototype.fill;
    /**
     * Index of the star.
     * @type {?}
     */
    StarTemplateContext.prototype.index;
}
/** @type {?} */
var NGB_RATING_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NgbRating; }),
    multi: true
};
/**
 * Rating directive that will take care of visualising a star rating bar.
 */
var NgbRating = /** @class */ (function () {
    function NgbRating(config, _changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this.contexts = [];
        this.disabled = false;
        /**
         * An event fired when a user is hovering over a given rating.
         * Event's payload equals to the rating being hovered over.
         */
        this.hover = new EventEmitter();
        /**
         * An event fired when a user stops hovering over a given rating.
         * Event's payload equals to the rating of the last item being hovered over.
         */
        this.leave = new EventEmitter();
        /**
         * An event fired when a user selects a new rating.
         * Event's payload equals to the newly selected rating.
         */
        this.rateChange = new EventEmitter(true);
        this.onChange = function (_) { };
        this.onTouched = function () { };
        this.max = config.max;
        this.readonly = config.readonly;
    }
    /**
     * @return {?}
     */
    NgbRating.prototype.ariaValueText = /**
     * @return {?}
     */
    function () { return this.nextRate + " out of " + this.max; };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbRating.prototype.enter = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.readonly && !this.disabled) {
            this._updateState(value);
        }
        this.hover.emit(value);
    };
    /**
     * @return {?}
     */
    NgbRating.prototype.handleBlur = /**
     * @return {?}
     */
    function () { this.onTouched(); };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbRating.prototype.handleClick = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { this.update(this.resettable && this.rate === value ? 0 : value); };
    /**
     * @param {?} event
     * @return {?}
     */
    NgbRating.prototype.handleKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // tslint:disable-next-line:deprecation
        var which = event.which;
        if (Key[toString(which)]) {
            event.preventDefault();
            switch (which) {
                case Key.ArrowDown:
                case Key.ArrowLeft:
                    this.update(this.rate - 1);
                    break;
                case Key.ArrowUp:
                case Key.ArrowRight:
                    this.update(this.rate + 1);
                    break;
                case Key.Home:
                    this.update(0);
                    break;
                case Key.End:
                    this.update(this.max);
                    break;
            }
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbRating.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['rate']) {
            this.update(this.rate);
        }
    };
    /**
     * @return {?}
     */
    NgbRating.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.contexts = Array.from({ length: this.max }, function (v, k) { return ({ fill: 0, index: k }); });
        this._updateState(this.rate);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbRating.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbRating.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this.onTouched = fn; };
    /**
     * @return {?}
     */
    NgbRating.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.leave.emit(this.nextRate);
        this._updateState(this.rate);
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgbRating.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) { this.disabled = isDisabled; };
    /**
     * @param {?} value
     * @param {?=} internalChange
     * @return {?}
     */
    NgbRating.prototype.update = /**
     * @param {?} value
     * @param {?=} internalChange
     * @return {?}
     */
    function (value, internalChange) {
        if (internalChange === void 0) { internalChange = true; }
        /** @type {?} */
        var newRate = getValueInRange(value, this.max, 0);
        if (!this.readonly && !this.disabled && this.rate !== newRate) {
            this.rate = newRate;
            this.rateChange.emit(this.rate);
        }
        if (internalChange) {
            this.onChange(this.rate);
            this.onTouched();
        }
        this._updateState(this.rate);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbRating.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.update(value, false);
        this._changeDetectorRef.markForCheck();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NgbRating.prototype._getFillValue = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var diff = this.nextRate - index;
        if (diff >= 1) {
            return 100;
        }
        if (diff < 1 && diff > 0) {
            return parseInt((diff * 100).toFixed(2), 10);
        }
        return 0;
    };
    /**
     * @param {?} nextValue
     * @return {?}
     */
    NgbRating.prototype._updateState = /**
     * @param {?} nextValue
     * @return {?}
     */
    function (nextValue) {
        var _this = this;
        this.nextRate = nextValue;
        this.contexts.forEach(function (context, index) { return context.fill = _this._getFillValue(index); });
    };
    NgbRating.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-rating',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        'class': 'd-inline-flex',
                        'tabindex': '0',
                        'role': 'slider',
                        'aria-valuemin': '0',
                        '[attr.aria-valuemax]': 'max',
                        '[attr.aria-valuenow]': 'nextRate',
                        '[attr.aria-valuetext]': 'ariaValueText()',
                        '[attr.aria-disabled]': 'readonly ? true : null',
                        '(blur)': 'handleBlur()',
                        '(keydown)': 'handleKeyDown($event)',
                        '(mouseleave)': 'reset()'
                    },
                    template: "\n    <ng-template #t let-fill=\"fill\">{{ fill === 100 ? '&#9733;' : '&#9734;' }}</ng-template>\n    <ng-template ngFor [ngForOf]=\"contexts\" let-index=\"index\">\n      <span class=\"sr-only\">({{ index < nextRate ? '*' : ' ' }})</span>\n      <span (mouseenter)=\"enter(index + 1)\" (click)=\"handleClick(index + 1)\" [style.cursor]=\"readonly || disabled ? 'default' : 'pointer'\">\n        <ng-template [ngTemplateOutlet]=\"starTemplate || t\" [ngTemplateOutletContext]=\"contexts[index]\"></ng-template>\n      </span>\n    </ng-template>\n  ",
                    providers: [NGB_RATING_VALUE_ACCESSOR]
                }] }
    ];
    /** @nocollapse */
    NgbRating.ctorParameters = function () { return [
        { type: NgbRatingConfig },
        { type: ChangeDetectorRef }
    ]; };
    NgbRating.propDecorators = {
        max: [{ type: Input }],
        rate: [{ type: Input }],
        readonly: [{ type: Input }],
        resettable: [{ type: Input }],
        starTemplate: [{ type: Input }, { type: ContentChild, args: [TemplateRef,] }],
        hover: [{ type: Output }],
        leave: [{ type: Output }],
        rateChange: [{ type: Output }]
    };
    return NgbRating;
}());
export { NgbRating };
if (false) {
    /** @type {?} */
    NgbRating.prototype.contexts;
    /** @type {?} */
    NgbRating.prototype.disabled;
    /** @type {?} */
    NgbRating.prototype.nextRate;
    /**
     * Maximal rating that can be given using this widget.
     * @type {?}
     */
    NgbRating.prototype.max;
    /**
     * Current rating. Can be a decimal value like 3.75
     * @type {?}
     */
    NgbRating.prototype.rate;
    /**
     * A flag indicating if rating can be updated.
     * @type {?}
     */
    NgbRating.prototype.readonly;
    /**
     * A flag indicating if rating can be reset to 0 on mouse click
     * @type {?}
     */
    NgbRating.prototype.resettable;
    /**
     * A template to override star display.
     * Alternatively put a <ng-template> as the only child of <ngb-rating> element
     * @type {?}
     */
    NgbRating.prototype.starTemplate;
    /**
     * An event fired when a user is hovering over a given rating.
     * Event's payload equals to the rating being hovered over.
     * @type {?}
     */
    NgbRating.prototype.hover;
    /**
     * An event fired when a user stops hovering over a given rating.
     * Event's payload equals to the rating of the last item being hovered over.
     * @type {?}
     */
    NgbRating.prototype.leave;
    /**
     * An event fired when a user selects a new rating.
     * Event's payload equals to the newly selected rating.
     * @type {?}
     */
    NgbRating.prototype.rateChange;
    /** @type {?} */
    NgbRating.prototype.onChange;
    /** @type {?} */
    NgbRating.prototype.onTouched;
    /** @type {?} */
    NgbRating.prototype._changeDetectorRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJyYXRpbmcvcmF0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULHVCQUF1QixFQUN2QixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFFWixXQUFXLEVBR1gsWUFBWSxFQUNaLFVBQVUsRUFDVixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxRQUFRLEVBQUUsZUFBZSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDaEMsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7OztBQUt2RSx5Q0FVQzs7Ozs7O0lBTkMsbUNBQWE7Ozs7O0lBS2Isb0NBQWM7OztJQUdWLHlCQUF5QixHQUFHO0lBQ2hDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsU0FBUyxFQUFULENBQVMsQ0FBQztJQUN4QyxLQUFLLEVBQUUsSUFBSTtDQUNaOzs7O0FBS0Q7SUFpRkUsbUJBQVksTUFBdUIsRUFBVSxrQkFBcUM7UUFBckMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQXBEbEYsYUFBUSxHQUEwQixFQUFFLENBQUM7UUFDckMsYUFBUSxHQUFHLEtBQUssQ0FBQzs7Ozs7UUFrQ1AsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7Ozs7O1FBTW5DLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDOzs7OztRQU1uQyxlQUFVLEdBQUcsSUFBSSxZQUFZLENBQVMsSUFBSSxDQUFDLENBQUM7UUFFdEQsYUFBUSxHQUFHLFVBQUMsQ0FBTSxJQUFN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LFFBQVEsRUFBRSx1aUJBUVQ7b0JBQ0QsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7aUJBQ3ZDOzs7O2dCQXZETyxlQUFlO2dCQUZyQixpQkFBaUI7OztzQkFvRWhCLEtBQUs7dUJBS0wsS0FBSzsyQkFLTCxLQUFLOzZCQUtMLEtBQUs7K0JBTUwsS0FBSyxZQUFJLFlBQVksU0FBQyxXQUFXO3dCQU1qQyxNQUFNO3dCQU1OLE1BQU07NkJBTU4sTUFBTTs7SUF5R1QsZ0JBQUM7Q0FBQSxBQXJMRCxJQXFMQztTQTFKWSxTQUFTOzs7SUFFcEIsNkJBQXFDOztJQUNyQyw2QkFBaUI7O0lBQ2pCLDZCQUFpQjs7Ozs7SUFNakIsd0JBQXFCOzs7OztJQUtyQix5QkFBc0I7Ozs7O0lBS3RCLDZCQUEyQjs7Ozs7SUFLM0IsK0JBQTZCOzs7Ozs7SUFNN0IsaUNBQW1GOzs7Ozs7SUFNbkYsMEJBQTZDOzs7Ozs7SUFNN0MsMEJBQTZDOzs7Ozs7SUFNN0MsK0JBQXNEOztJQUV0RCw2QkFBMEI7O0lBQzFCLDhCQUFxQjs7SUFFZ0IsdUNBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkluaXQsXG4gIFRlbXBsYXRlUmVmLFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIENvbnRlbnRDaGlsZCxcbiAgZm9yd2FyZFJlZixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nYlJhdGluZ0NvbmZpZ30gZnJvbSAnLi9yYXRpbmctY29uZmlnJztcbmltcG9ydCB7dG9TdHJpbmcsIGdldFZhbHVlSW5SYW5nZX0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7S2V5fSBmcm9tICcuLi91dGlsL2tleSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG4vKipcbiAqIENvbnRleHQgZm9yIHRoZSBjdXN0b20gc3RhciBkaXNwbGF5IHRlbXBsYXRlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3RhclRlbXBsYXRlQ29udGV4dCB7XG4gIC8qKlxuICAgKiBTdGFyIGZpbGwgcGVyY2VudGFnZS4gQW4gaW50ZWdlciB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEwMFxuICAgKi9cbiAgZmlsbDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJbmRleCBvZiB0aGUgc3Rhci5cbiAgICovXG4gIGluZGV4OiBudW1iZXI7XG59XG5cbmNvbnN0IE5HQl9SQVRJTkdfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JSYXRpbmcpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqXG4gKiBSYXRpbmcgZGlyZWN0aXZlIHRoYXQgd2lsbCB0YWtlIGNhcmUgb2YgdmlzdWFsaXNpbmcgYSBzdGFyIHJhdGluZyBiYXIuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nYi1yYXRpbmcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdkLWlubGluZS1mbGV4JyxcbiAgICAndGFiaW5kZXgnOiAnMCcsXG4gICAgJ3JvbGUnOiAnc2xpZGVyJyxcbiAgICAnYXJpYS12YWx1ZW1pbic6ICcwJyxcbiAgICAnW2F0dHIuYXJpYS12YWx1ZW1heF0nOiAnbWF4JyxcbiAgICAnW2F0dHIuYXJpYS12YWx1ZW5vd10nOiAnbmV4dFJhdGUnLFxuICAgICdbYXR0ci5hcmlhLXZhbHVldGV4dF0nOiAnYXJpYVZhbHVlVGV4dCgpJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAncmVhZG9ubHkgPyB0cnVlIDogbnVsbCcsXG4gICAgJyhibHVyKSc6ICdoYW5kbGVCbHVyKCknLFxuICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5RG93bigkZXZlbnQpJyxcbiAgICAnKG1vdXNlbGVhdmUpJzogJ3Jlc2V0KCknXG4gIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICN0IGxldC1maWxsPVwiZmlsbFwiPnt7IGZpbGwgPT09IDEwMCA/ICcmIzk3MzM7JyA6ICcmIzk3MzQ7JyB9fTwvbmctdGVtcGxhdGU+XG4gICAgPG5nLXRlbXBsYXRlIG5nRm9yIFtuZ0Zvck9mXT1cImNvbnRleHRzXCIgbGV0LWluZGV4PVwiaW5kZXhcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiPih7eyBpbmRleCA8IG5leHRSYXRlID8gJyonIDogJyAnIH19KTwvc3Bhbj5cbiAgICAgIDxzcGFuIChtb3VzZWVudGVyKT1cImVudGVyKGluZGV4ICsgMSlcIiAoY2xpY2spPVwiaGFuZGxlQ2xpY2soaW5kZXggKyAxKVwiIFtzdHlsZS5jdXJzb3JdPVwicmVhZG9ubHkgfHwgZGlzYWJsZWQgPyAnZGVmYXVsdCcgOiAncG9pbnRlcidcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInN0YXJUZW1wbGF0ZSB8fCB0XCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cImNvbnRleHRzW2luZGV4XVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICA8L3NwYW4+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgcHJvdmlkZXJzOiBbTkdCX1JBVElOR19WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgTmdiUmF0aW5nIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgT25Jbml0LCBPbkNoYW5nZXMge1xuICBjb250ZXh0czogU3RhclRlbXBsYXRlQ29udGV4dFtdID0gW107XG4gIGRpc2FibGVkID0gZmFsc2U7XG4gIG5leHRSYXRlOiBudW1iZXI7XG5cblxuICAvKipcbiAgICogTWF4aW1hbCByYXRpbmcgdGhhdCBjYW4gYmUgZ2l2ZW4gdXNpbmcgdGhpcyB3aWRnZXQuXG4gICAqL1xuICBASW5wdXQoKSBtYXg6IG51bWJlcjtcblxuICAvKipcbiAgICogQ3VycmVudCByYXRpbmcuIENhbiBiZSBhIGRlY2ltYWwgdmFsdWUgbGlrZSAzLjc1XG4gICAqL1xuICBASW5wdXQoKSByYXRlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEEgZmxhZyBpbmRpY2F0aW5nIGlmIHJhdGluZyBjYW4gYmUgdXBkYXRlZC5cbiAgICovXG4gIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBIGZsYWcgaW5kaWNhdGluZyBpZiByYXRpbmcgY2FuIGJlIHJlc2V0IHRvIDAgb24gbW91c2UgY2xpY2tcbiAgICovXG4gIEBJbnB1dCgpIHJlc2V0dGFibGU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgdGVtcGxhdGUgdG8gb3ZlcnJpZGUgc3RhciBkaXNwbGF5LlxuICAgKiBBbHRlcm5hdGl2ZWx5IHB1dCBhIDxuZy10ZW1wbGF0ZT4gYXMgdGhlIG9ubHkgY2hpbGQgb2YgPG5nYi1yYXRpbmc+IGVsZW1lbnRcbiAgICovXG4gIEBJbnB1dCgpIEBDb250ZW50Q2hpbGQoVGVtcGxhdGVSZWYpIHN0YXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8U3RhclRlbXBsYXRlQ29udGV4dD47XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGZpcmVkIHdoZW4gYSB1c2VyIGlzIGhvdmVyaW5nIG92ZXIgYSBnaXZlbiByYXRpbmcuXG4gICAqIEV2ZW50J3MgcGF5bG9hZCBlcXVhbHMgdG8gdGhlIHJhdGluZyBiZWluZyBob3ZlcmVkIG92ZXIuXG4gICAqL1xuICBAT3V0cHV0KCkgaG92ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZmlyZWQgd2hlbiBhIHVzZXIgc3RvcHMgaG92ZXJpbmcgb3ZlciBhIGdpdmVuIHJhdGluZy5cbiAgICogRXZlbnQncyBwYXlsb2FkIGVxdWFscyB0byB0aGUgcmF0aW5nIG9mIHRoZSBsYXN0IGl0ZW0gYmVpbmcgaG92ZXJlZCBvdmVyLlxuICAgKi9cbiAgQE91dHB1dCgpIGxlYXZlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGZpcmVkIHdoZW4gYSB1c2VyIHNlbGVjdHMgYSBuZXcgcmF0aW5nLlxuICAgKiBFdmVudCdzIHBheWxvYWQgZXF1YWxzIHRvIHRoZSBuZXdseSBzZWxlY3RlZCByYXRpbmcuXG4gICAqL1xuICBAT3V0cHV0KCkgcmF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPih0cnVlKTtcblxuICBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IE5nYlJhdGluZ0NvbmZpZywgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5tYXggPSBjb25maWcubWF4O1xuICAgIHRoaXMucmVhZG9ubHkgPSBjb25maWcucmVhZG9ubHk7XG4gIH1cblxuICBhcmlhVmFsdWVUZXh0KCkgeyByZXR1cm4gYCR7dGhpcy5uZXh0UmF0ZX0gb3V0IG9mICR7dGhpcy5tYXh9YDsgfVxuXG4gIGVudGVyKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucmVhZG9ubHkgJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZVN0YXRlKHZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5ob3Zlci5lbWl0KHZhbHVlKTtcbiAgfVxuXG4gIGhhbmRsZUJsdXIoKSB7IHRoaXMub25Ub3VjaGVkKCk7IH1cblxuICBoYW5kbGVDbGljayh2YWx1ZTogbnVtYmVyKSB7IHRoaXMudXBkYXRlKHRoaXMucmVzZXR0YWJsZSAmJiB0aGlzLnJhdGUgPT09IHZhbHVlID8gMCA6IHZhbHVlKTsgfVxuXG4gIGhhbmRsZUtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICBjb25zdCB7d2hpY2h9ID0gZXZlbnQ7XG4gICAgaWYgKEtleVt0b1N0cmluZyh3aGljaCldKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBzd2l0Y2ggKHdoaWNoKSB7XG4gICAgICAgIGNhc2UgS2V5LkFycm93RG93bjpcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dMZWZ0OlxuICAgICAgICAgIHRoaXMudXBkYXRlKHRoaXMucmF0ZSAtIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtleS5BcnJvd1VwOlxuICAgICAgICBjYXNlIEtleS5BcnJvd1JpZ2h0OlxuICAgICAgICAgIHRoaXMudXBkYXRlKHRoaXMucmF0ZSArIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtleS5Ib21lOlxuICAgICAgICAgIHRoaXMudXBkYXRlKDApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtleS5FbmQ6XG4gICAgICAgICAgdGhpcy51cGRhdGUodGhpcy5tYXgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlc1sncmF0ZSddKSB7XG4gICAgICB0aGlzLnVwZGF0ZSh0aGlzLnJhdGUpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY29udGV4dHMgPSBBcnJheS5mcm9tKHtsZW5ndGg6IHRoaXMubWF4fSwgKHYsIGspID0+ICh7ZmlsbDogMCwgaW5kZXg6IGt9KSk7XG4gICAgdGhpcy5fdXBkYXRlU3RhdGUodGhpcy5yYXRlKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiBhbnkpOiB2b2lkIHsgdGhpcy5vbkNoYW5nZSA9IGZuOyB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQgeyB0aGlzLm9uVG91Y2hlZCA9IGZuOyB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5sZWF2ZS5lbWl0KHRoaXMubmV4dFJhdGUpO1xuICAgIHRoaXMuX3VwZGF0ZVN0YXRlKHRoaXMucmF0ZSk7XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pIHsgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7IH1cblxuICB1cGRhdGUodmFsdWU6IG51bWJlciwgaW50ZXJuYWxDaGFuZ2UgPSB0cnVlKTogdm9pZCB7XG4gICAgY29uc3QgbmV3UmF0ZSA9IGdldFZhbHVlSW5SYW5nZSh2YWx1ZSwgdGhpcy5tYXgsIDApO1xuICAgIGlmICghdGhpcy5yZWFkb25seSAmJiAhdGhpcy5kaXNhYmxlZCAmJiB0aGlzLnJhdGUgIT09IG5ld1JhdGUpIHtcbiAgICAgIHRoaXMucmF0ZSA9IG5ld1JhdGU7XG4gICAgICB0aGlzLnJhdGVDaGFuZ2UuZW1pdCh0aGlzLnJhdGUpO1xuICAgIH1cbiAgICBpZiAoaW50ZXJuYWxDaGFuZ2UpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5yYXRlKTtcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuICAgIHRoaXMuX3VwZGF0ZVN0YXRlKHRoaXMucmF0ZSk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy51cGRhdGUodmFsdWUsIGZhbHNlKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEZpbGxWYWx1ZShpbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBkaWZmID0gdGhpcy5uZXh0UmF0ZSAtIGluZGV4O1xuXG4gICAgaWYgKGRpZmYgPj0gMSkge1xuICAgICAgcmV0dXJuIDEwMDtcbiAgICB9XG4gICAgaWYgKGRpZmYgPCAxICYmIGRpZmYgPiAwKSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQoKGRpZmYgKiAxMDApLnRvRml4ZWQoMiksIDEwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVN0YXRlKG5leHRWYWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5uZXh0UmF0ZSA9IG5leHRWYWx1ZTtcbiAgICB0aGlzLmNvbnRleHRzLmZvckVhY2goKGNvbnRleHQsIGluZGV4KSA9PiBjb250ZXh0LmZpbGwgPSB0aGlzLl9nZXRGaWxsVmFsdWUoaW5kZXgpKTtcbiAgfVxufVxuIl19