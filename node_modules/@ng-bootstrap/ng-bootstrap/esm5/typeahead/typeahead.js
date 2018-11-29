/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ComponentFactoryResolver, Directive, ElementRef, EventEmitter, forwardRef, Injector, Input, NgZone, Output, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { positionElements } from '../util/positioning';
import { NgbTypeaheadWindow } from './typeahead-window';
import { PopupService } from '../util/popup';
import { toString, isDefined } from '../util/util';
import { Key } from '../util/key';
import { Live } from '../util/accessibility/live';
import { NgbTypeaheadConfig } from './typeahead-config';
import { map, switchMap, tap } from 'rxjs/operators';
/** @type {?} */
var NGB_TYPEAHEAD_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return NgbTypeahead; }),
    multi: true
};
/**
 * Payload of the selectItem event.
 * @record
 */
export function NgbTypeaheadSelectItemEvent() { }
if (false) {
    /**
     * An item about to be selected
     * @type {?}
     */
    NgbTypeaheadSelectItemEvent.prototype.item;
    /**
     * Function that will prevent item selection if called
     * @type {?}
     */
    NgbTypeaheadSelectItemEvent.prototype.preventDefault;
}
/** @type {?} */
var nextWindowId = 0;
/**
 * NgbTypeahead directive provides a simple way of creating powerful typeaheads from any text input
 */
var NgbTypeahead = /** @class */ (function () {
    function NgbTypeahead(_elementRef, _viewContainerRef, _renderer, _injector, componentFactoryResolver, config, ngZone, _live) {
        var _this = this;
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._injector = _injector;
        this._live = _live;
        /**
         * Value for the configurable autocomplete attribute.
         * Defaults to 'off' to disable the native browser autocomplete, but this standard value does not seem
         * to be always correctly taken into account.
         *
         * \@since 2.1.0
         */
        this.autocomplete = 'off';
        /**
         * Placement of a typeahead accepts:
         *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
         *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"
         * and array of above values.
         */
        this.placement = 'bottom-left';
        /**
         * An event emitted when a match is selected. Event payload is of type NgbTypeaheadSelectItemEvent.
         */
        this.selectItem = new EventEmitter();
        this.popupId = "ngb-typeahead-" + nextWindowId++;
        this._onTouched = function () { };
        this._onChange = function (_) { };
        this.container = config.container;
        this.editable = config.editable;
        this.focusFirst = config.focusFirst;
        this.showHint = config.showHint;
        this.placement = config.placement;
        this._valueChanges = fromEvent(_elementRef.nativeElement, 'input')
            .pipe(map(function ($event) { return ((/** @type {?} */ ($event.target))).value; }));
        this._resubscribeTypeahead = new BehaviorSubject(null);
        this._popupService = new PopupService(NgbTypeaheadWindow, _injector, _viewContainerRef, _renderer, componentFactoryResolver);
        this._zoneSubscription = ngZone.onStable.subscribe(function () {
            if (_this.isPopupOpen()) {
                positionElements(_this._elementRef.nativeElement, _this._windowRef.location.nativeElement, _this.placement, _this.container === 'body');
            }
        });
    }
    /**
     * @return {?}
     */
    NgbTypeahead.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var inputValues$ = this._valueChanges.pipe(tap(function (value) {
            _this._inputValueBackup = value;
            if (_this.editable) {
                _this._onChange(value);
            }
        }));
        /** @type {?} */
        var results$ = inputValues$.pipe(this.ngbTypeahead);
        /** @type {?} */
        var processedResults$ = results$.pipe(tap(function () {
            if (!_this.editable) {
                _this._onChange(undefined);
            }
        }));
        /** @type {?} */
        var userInput$ = this._resubscribeTypeahead.pipe(switchMap(function () { return processedResults$; }));
        this._subscription = this._subscribeToUserInput(userInput$);
    };
    /**
     * @return {?}
     */
    NgbTypeahead.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._closePopup();
        this._unsubscribeFromUserInput();
        this._zoneSubscription.unsubscribe();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbTypeahead.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgbTypeahead.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onTouched = fn; };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbTypeahead.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { this._writeInputValue(this._formatItemForInput(value)); };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgbTypeahead.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgbTypeahead.prototype.onDocumentClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.target !== this._elementRef.nativeElement) {
            this.dismissPopup();
        }
    };
    /**
     * Dismisses typeahead popup window
     */
    /**
     * Dismisses typeahead popup window
     * @return {?}
     */
    NgbTypeahead.prototype.dismissPopup = /**
     * Dismisses typeahead popup window
     * @return {?}
     */
    function () {
        if (this.isPopupOpen()) {
            this._closePopup();
            this._writeInputValue(this._inputValueBackup);
        }
    };
    /**
     * Returns true if the typeahead popup window is displayed
     */
    /**
     * Returns true if the typeahead popup window is displayed
     * @return {?}
     */
    NgbTypeahead.prototype.isPopupOpen = /**
     * Returns true if the typeahead popup window is displayed
     * @return {?}
     */
    function () { return this._windowRef != null; };
    /**
     * @return {?}
     */
    NgbTypeahead.prototype.handleBlur = /**
     * @return {?}
     */
    function () {
        this._resubscribeTypeahead.next(null);
        this._onTouched();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgbTypeahead.prototype.handleKeyDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.isPopupOpen()) {
            return;
        }
        // tslint:disable-next-line:deprecation
        var which = event.which;
        if (Key[toString(which)]) {
            switch (which) {
                case Key.ArrowDown:
                    event.preventDefault();
                    this._windowRef.instance.next();
                    this._showHint();
                    break;
                case Key.ArrowUp:
                    event.preventDefault();
                    this._windowRef.instance.prev();
                    this._showHint();
                    break;
                case Key.Enter:
                case Key.Tab:
                    /** @type {?} */
                    var result = this._windowRef.instance.getActive();
                    if (isDefined(result)) {
                        event.preventDefault();
                        event.stopPropagation();
                        this._selectResult(result);
                    }
                    this._closePopup();
                    break;
                case Key.Escape:
                    event.preventDefault();
                    this._resubscribeTypeahead.next(null);
                    this.dismissPopup();
                    break;
            }
        }
    };
    /**
     * @return {?}
     */
    NgbTypeahead.prototype._openPopup = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.isPopupOpen()) {
            this._inputValueBackup = this._elementRef.nativeElement.value;
            this._windowRef = this._popupService.open();
            this._windowRef.instance.id = this.popupId;
            this._windowRef.instance.selectEvent.subscribe(function (result) { return _this._selectResultClosePopup(result); });
            this._windowRef.instance.activeChangeEvent.subscribe(function (activeId) { return _this.activeDescendant = activeId; });
            if (this.container === 'body') {
                window.document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
            }
        }
    };
    /**
     * @return {?}
     */
    NgbTypeahead.prototype._closePopup = /**
     * @return {?}
     */
    function () {
        this._popupService.close();
        this._windowRef = null;
        this.activeDescendant = undefined;
    };
    /**
     * @param {?} result
     * @return {?}
     */
    NgbTypeahead.prototype._selectResult = /**
     * @param {?} result
     * @return {?}
     */
    function (result) {
        /** @type {?} */
        var defaultPrevented = false;
        this.selectItem.emit({ item: result, preventDefault: function () { defaultPrevented = true; } });
        this._resubscribeTypeahead.next(null);
        if (!defaultPrevented) {
            this.writeValue(result);
            this._onChange(result);
        }
    };
    /**
     * @param {?} result
     * @return {?}
     */
    NgbTypeahead.prototype._selectResultClosePopup = /**
     * @param {?} result
     * @return {?}
     */
    function (result) {
        this._selectResult(result);
        this._closePopup();
        this._elementRef.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    NgbTypeahead.prototype._showHint = /**
     * @return {?}
     */
    function () {
        if (this.showHint && this._windowRef.instance.hasActive() && this._inputValueBackup != null) {
            /** @type {?} */
            var userInputLowerCase = this._inputValueBackup.toLowerCase();
            /** @type {?} */
            var formattedVal = this._formatItemForInput(this._windowRef.instance.getActive());
            if (userInputLowerCase === formattedVal.substr(0, this._inputValueBackup.length).toLowerCase()) {
                this._writeInputValue(this._inputValueBackup + formattedVal.substr(this._inputValueBackup.length));
                this._elementRef.nativeElement['setSelectionRange'].apply(this._elementRef.nativeElement, [this._inputValueBackup.length, formattedVal.length]);
            }
            else {
                this.writeValue(this._windowRef.instance.getActive());
            }
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    NgbTypeahead.prototype._formatItemForInput = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return item != null && this.inputFormatter ? this.inputFormatter(item) : toString(item);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgbTypeahead.prototype._writeInputValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', toString(value));
    };
    /**
     * @param {?} userInput$
     * @return {?}
     */
    NgbTypeahead.prototype._subscribeToUserInput = /**
     * @param {?} userInput$
     * @return {?}
     */
    function (userInput$) {
        var _this = this;
        return userInput$.subscribe(function (results) {
            if (!results || results.length === 0) {
                _this._closePopup();
            }
            else {
                _this._openPopup();
                _this._windowRef.instance.focusFirst = _this.focusFirst;
                _this._windowRef.instance.results = results;
                _this._windowRef.instance.term = _this._elementRef.nativeElement.value;
                if (_this.resultFormatter) {
                    _this._windowRef.instance.formatter = _this.resultFormatter;
                }
                if (_this.resultTemplate) {
                    _this._windowRef.instance.resultTemplate = _this.resultTemplate;
                }
                _this._windowRef.instance.resetActive();
                // The observable stream we are subscribing to might have async steps
                // and if a component containing typeahead is using the OnPush strategy
                // the change detection turn wouldn't be invoked automatically.
                _this._windowRef.changeDetectorRef.detectChanges();
                _this._showHint();
            }
            // live announcer
            /** @type {?} */
            var count = results ? results.length : 0;
            _this._live.say(count === 0 ? 'No results available' : count + " result" + (count === 1 ? '' : 's') + " available");
        });
    };
    /**
     * @return {?}
     */
    NgbTypeahead.prototype._unsubscribeFromUserInput = /**
     * @return {?}
     */
    function () {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this._subscription = null;
    };
    NgbTypeahead.decorators = [
        { type: Directive, args: [{
                    selector: 'input[ngbTypeahead]',
                    exportAs: 'ngbTypeahead',
                    host: {
                        '(blur)': 'handleBlur()',
                        '[class.open]': 'isPopupOpen()',
                        '(document:click)': 'onDocumentClick($event)',
                        '(keydown)': 'handleKeyDown($event)',
                        '[autocomplete]': 'autocomplete',
                        'autocapitalize': 'off',
                        'autocorrect': 'off',
                        'role': 'combobox',
                        'aria-multiline': 'false',
                        '[attr.aria-autocomplete]': 'showHint ? "both" : "list"',
                        '[attr.aria-activedescendant]': 'activeDescendant',
                        '[attr.aria-owns]': 'isPopupOpen() ? popupId : null',
                        '[attr.aria-expanded]': 'isPopupOpen()'
                    },
                    providers: [NGB_TYPEAHEAD_VALUE_ACCESSOR]
                },] }
    ];
    /** @nocollapse */
    NgbTypeahead.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: Renderer2 },
        { type: Injector },
        { type: ComponentFactoryResolver },
        { type: NgbTypeaheadConfig },
        { type: NgZone },
        { type: Live }
    ]; };
    NgbTypeahead.propDecorators = {
        autocomplete: [{ type: Input }],
        container: [{ type: Input }],
        editable: [{ type: Input }],
        focusFirst: [{ type: Input }],
        inputFormatter: [{ type: Input }],
        ngbTypeahead: [{ type: Input }],
        resultFormatter: [{ type: Input }],
        resultTemplate: [{ type: Input }],
        showHint: [{ type: Input }],
        placement: [{ type: Input }],
        selectItem: [{ type: Output }]
    };
    return NgbTypeahead;
}());
export { NgbTypeahead };
if (false) {
    /** @type {?} */
    NgbTypeahead.prototype._popupService;
    /** @type {?} */
    NgbTypeahead.prototype._subscription;
    /** @type {?} */
    NgbTypeahead.prototype._inputValueBackup;
    /** @type {?} */
    NgbTypeahead.prototype._valueChanges;
    /** @type {?} */
    NgbTypeahead.prototype._resubscribeTypeahead;
    /** @type {?} */
    NgbTypeahead.prototype._windowRef;
    /** @type {?} */
    NgbTypeahead.prototype._zoneSubscription;
    /**
     * Value for the configurable autocomplete attribute.
     * Defaults to 'off' to disable the native browser autocomplete, but this standard value does not seem
     * to be always correctly taken into account.
     *
     * \@since 2.1.0
     * @type {?}
     */
    NgbTypeahead.prototype.autocomplete;
    /**
     * A selector specifying the element the tooltip should be appended to.
     * Currently only supports "body".
     * @type {?}
     */
    NgbTypeahead.prototype.container;
    /**
     * A flag indicating if model values should be restricted to the ones selected from the popup only.
     * @type {?}
     */
    NgbTypeahead.prototype.editable;
    /**
     * A flag indicating if the first match should automatically be focused as you type.
     * @type {?}
     */
    NgbTypeahead.prototype.focusFirst;
    /**
     * A function to convert a given value into string to display in the input field
     * @type {?}
     */
    NgbTypeahead.prototype.inputFormatter;
    /**
     * A function to transform the provided observable text into the array of results.  Note that the "this" argument
     * is undefined so you need to explicitly bind it to a desired "this" target.
     * @type {?}
     */
    NgbTypeahead.prototype.ngbTypeahead;
    /**
     * A function to format a given result before display. This function should return a formatted string without any
     * HTML markup
     * @type {?}
     */
    NgbTypeahead.prototype.resultFormatter;
    /**
     * A template to override a matching result default display
     * @type {?}
     */
    NgbTypeahead.prototype.resultTemplate;
    /**
     * Show hint when an option in the result list matches.
     * @type {?}
     */
    NgbTypeahead.prototype.showHint;
    /**
     * Placement of a typeahead accepts:
     *    "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right",
     *    "left", "left-top", "left-bottom", "right", "right-top", "right-bottom"
     * and array of above values.
     * @type {?}
     */
    NgbTypeahead.prototype.placement;
    /**
     * An event emitted when a match is selected. Event payload is of type NgbTypeaheadSelectItemEvent.
     * @type {?}
     */
    NgbTypeahead.prototype.selectItem;
    /** @type {?} */
    NgbTypeahead.prototype.activeDescendant;
    /** @type {?} */
    NgbTypeahead.prototype.popupId;
    /** @type {?} */
    NgbTypeahead.prototype._onTouched;
    /** @type {?} */
    NgbTypeahead.prototype._onChange;
    /** @type {?} */
    NgbTypeahead.prototype._elementRef;
    /** @type {?} */
    NgbTypeahead.prototype._viewContainerRef;
    /** @type {?} */
    NgbTypeahead.prototype._renderer;
    /** @type {?} */
    NgbTypeahead.prototype._injector;
    /** @type {?} */
    NgbTypeahead.prototype._live;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAvIiwic291cmNlcyI6WyJ0eXBlYWhlYWQvdHlwZWFoZWFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsd0JBQXdCLEVBRXhCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixRQUFRLEVBQ1IsS0FBSyxFQUNMLE1BQU0sRUFHTixNQUFNLEVBQ04sU0FBUyxFQUNULFdBQVcsRUFDWCxnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFBYSxlQUFlLEVBQWdCLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUMxRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQWlCLE1BQU0scUJBQXFCLENBQUM7QUFDckUsT0FBTyxFQUFDLGtCQUFrQixFQUF3QixNQUFNLG9CQUFvQixDQUFDO0FBQzdFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDakQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNoQyxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDaEQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7O0lBRTdDLDRCQUE0QixHQUFHO0lBQ25DLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsWUFBWSxFQUFaLENBQVksQ0FBQztJQUMzQyxLQUFLLEVBQUUsSUFBSTtDQUNa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a0JBQWtCO3dCQUNsRCxrQkFBa0IsRUFBRSxnQ0FBZ0M7d0JBQ3BELHNCQUFzQixFQUFFLGVBQWU7cUJBQ3hDO29CQUNELFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO2lCQUMxQzs7OztnQkFyRUMsVUFBVTtnQkFXVixnQkFBZ0I7Z0JBRmhCLFNBQVM7Z0JBTlQsUUFBUTtnQkFOUix3QkFBd0I7Z0JBd0JsQixrQkFBa0I7Z0JBaEJ4QixNQUFNO2dCQWVBLElBQUk7OzsrQkFtRVQsS0FBSzs0QkFNTCxLQUFLOzJCQUtMLEtBQUs7NkJBS0wsS0FBSztpQ0FLTCxLQUFLOytCQU1MLEtBQUs7a0NBTUwsS0FBSztpQ0FLTCxLQUFLOzJCQUtMLEtBQUs7NEJBT0wsS0FBSzs2QkFLTCxNQUFNOztJQXFPVCxtQkFBQztDQUFBLEFBalVELElBaVVDO1NBN1NZLFlBQVk7OztJQUV2QixxQ0FBd0Q7O0lBQ3hELHFDQUFvQzs7SUFDcEMseUNBQWtDOztJQUNsQyxxQ0FBMEM7O0lBQzFDLDZDQUFvRDs7SUFDcEQsa0NBQXFEOztJQUNyRCx5Q0FBK0I7Ozs7Ozs7OztJQVMvQixvQ0FBOEI7Ozs7OztJQU05QixpQ0FBMkI7Ozs7O0lBSzNCLGdDQUEyQjs7Ozs7SUFLM0Isa0NBQTZCOzs7OztJQUs3QixzQ0FBZ0Q7Ozs7OztJQU1oRCxvQ0FBdUU7Ozs7OztJQU12RSx1Q0FBaUQ7Ozs7O0lBS2pELHNDQUE0RDs7Ozs7SUFLNUQsZ0NBQTJCOzs7Ozs7OztJQU8zQixpQ0FBbUQ7Ozs7O0lBS25ELGtDQUF1RTs7SUFFdkUsd0NBQXlCOztJQUN6QiwrQkFBNEM7O0lBRTVDLGtDQUE4Qjs7SUFDOUIsaUNBQW1DOztJQUcvQixtQ0FBaUQ7O0lBQUUseUNBQTJDOztJQUM5RixpQ0FBNEI7O0lBQUUsaUNBQTJCOztJQUNiLDZCQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0b3IsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiwgZnJvbUV2ZW50fSBmcm9tICdyeGpzJztcbmltcG9ydCB7cG9zaXRpb25FbGVtZW50cywgUGxhY2VtZW50QXJyYXl9IGZyb20gJy4uL3V0aWwvcG9zaXRpb25pbmcnO1xuaW1wb3J0IHtOZ2JUeXBlYWhlYWRXaW5kb3csIFJlc3VsdFRlbXBsYXRlQ29udGV4dH0gZnJvbSAnLi90eXBlYWhlYWQtd2luZG93JztcbmltcG9ydCB7UG9wdXBTZXJ2aWNlfSBmcm9tICcuLi91dGlsL3BvcHVwJztcbmltcG9ydCB7dG9TdHJpbmcsIGlzRGVmaW5lZH0gZnJvbSAnLi4vdXRpbC91dGlsJztcbmltcG9ydCB7S2V5fSBmcm9tICcuLi91dGlsL2tleSc7XG5pbXBvcnQge0xpdmV9IGZyb20gJy4uL3V0aWwvYWNjZXNzaWJpbGl0eS9saXZlJztcbmltcG9ydCB7TmdiVHlwZWFoZWFkQ29uZmlnfSBmcm9tICcuL3R5cGVhaGVhZC1jb25maWcnO1xuaW1wb3J0IHttYXAsIHN3aXRjaE1hcCwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmNvbnN0IE5HQl9UWVBFQUhFQURfVkFMVUVfQUNDRVNTT1IgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ2JUeXBlYWhlYWQpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqXG4gKiBQYXlsb2FkIG9mIHRoZSBzZWxlY3RJdGVtIGV2ZW50LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYlR5cGVhaGVhZFNlbGVjdEl0ZW1FdmVudCB7XG4gIC8qKlxuICAgKiBBbiBpdGVtIGFib3V0IHRvIGJlIHNlbGVjdGVkXG4gICAqL1xuICBpdGVtOiBhbnk7XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRoYXQgd2lsbCBwcmV2ZW50IGl0ZW0gc2VsZWN0aW9uIGlmIGNhbGxlZFxuICAgKi9cbiAgcHJldmVudERlZmF1bHQ6ICgpID0+IHZvaWQ7XG59XG5cbmxldCBuZXh0V2luZG93SWQgPSAwO1xuXG4vKipcbiAqIE5nYlR5cGVhaGVhZCBkaXJlY3RpdmUgcHJvdmlkZXMgYSBzaW1wbGUgd2F5IG9mIGNyZWF0aW5nIHBvd2VyZnVsIHR5cGVhaGVhZHMgZnJvbSBhbnkgdGV4dCBpbnB1dFxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdpbnB1dFtuZ2JUeXBlYWhlYWRdJyxcbiAgZXhwb3J0QXM6ICduZ2JUeXBlYWhlYWQnLFxuICBob3N0OiB7XG4gICAgJyhibHVyKSc6ICdoYW5kbGVCbHVyKCknLFxuICAgICdbY2xhc3Mub3Blbl0nOiAnaXNQb3B1cE9wZW4oKScsXG4gICAgJyhkb2N1bWVudDpjbGljayknOiAnb25Eb2N1bWVudENsaWNrKCRldmVudCknLFxuICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5RG93bigkZXZlbnQpJyxcbiAgICAnW2F1dG9jb21wbGV0ZV0nOiAnYXV0b2NvbXBsZXRlJyxcbiAgICAnYXV0b2NhcGl0YWxpemUnOiAnb2ZmJyxcbiAgICAnYXV0b2NvcnJlY3QnOiAnb2ZmJyxcbiAgICAncm9sZSc6ICdjb21ib2JveCcsXG4gICAgJ2FyaWEtbXVsdGlsaW5lJzogJ2ZhbHNlJyxcbiAgICAnW2F0dHIuYXJpYS1hdXRvY29tcGxldGVdJzogJ3Nob3dIaW50ID8gXCJib3RoXCIgOiBcImxpc3RcIicsXG4gICAgJ1thdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF0nOiAnYWN0aXZlRGVzY2VuZGFudCcsXG4gICAgJ1thdHRyLmFyaWEtb3duc10nOiAnaXNQb3B1cE9wZW4oKSA/IHBvcHVwSWQgOiBudWxsJyxcbiAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnaXNQb3B1cE9wZW4oKSdcbiAgfSxcbiAgcHJvdmlkZXJzOiBbTkdCX1RZUEVBSEVBRF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgTmdiVHlwZWFoZWFkIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gICAgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9wb3B1cFNlcnZpY2U6IFBvcHVwU2VydmljZTxOZ2JUeXBlYWhlYWRXaW5kb3c+O1xuICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBfaW5wdXRWYWx1ZUJhY2t1cDogc3RyaW5nO1xuICBwcml2YXRlIF92YWx1ZUNoYW5nZXM6IE9ic2VydmFibGU8c3RyaW5nPjtcbiAgcHJpdmF0ZSBfcmVzdWJzY3JpYmVUeXBlYWhlYWQ6IEJlaGF2aW9yU3ViamVjdDxhbnk+O1xuICBwcml2YXRlIF93aW5kb3dSZWY6IENvbXBvbmVudFJlZjxOZ2JUeXBlYWhlYWRXaW5kb3c+O1xuICBwcml2YXRlIF96b25lU3Vic2NyaXB0aW9uOiBhbnk7XG5cbiAgLyoqXG4gICAqIFZhbHVlIGZvciB0aGUgY29uZmlndXJhYmxlIGF1dG9jb21wbGV0ZSBhdHRyaWJ1dGUuXG4gICAqIERlZmF1bHRzIHRvICdvZmYnIHRvIGRpc2FibGUgdGhlIG5hdGl2ZSBicm93c2VyIGF1dG9jb21wbGV0ZSwgYnV0IHRoaXMgc3RhbmRhcmQgdmFsdWUgZG9lcyBub3Qgc2VlbVxuICAgKiB0byBiZSBhbHdheXMgY29ycmVjdGx5IHRha2VuIGludG8gYWNjb3VudC5cbiAgICpcbiAgICogQHNpbmNlIDIuMS4wXG4gICAqL1xuICBASW5wdXQoKSBhdXRvY29tcGxldGUgPSAnb2ZmJztcblxuICAvKipcbiAgICogQSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSB0b29sdGlwIHNob3VsZCBiZSBhcHBlbmRlZCB0by5cbiAgICogQ3VycmVudGx5IG9ubHkgc3VwcG9ydHMgXCJib2R5XCIuXG4gICAqL1xuICBASW5wdXQoKSBjb250YWluZXI6IHN0cmluZztcblxuICAvKipcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgbW9kZWwgdmFsdWVzIHNob3VsZCBiZSByZXN0cmljdGVkIHRvIHRoZSBvbmVzIHNlbGVjdGVkIGZyb20gdGhlIHBvcHVwIG9ubHkuXG4gICAqL1xuICBASW5wdXQoKSBlZGl0YWJsZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBmbGFnIGluZGljYXRpbmcgaWYgdGhlIGZpcnN0IG1hdGNoIHNob3VsZCBhdXRvbWF0aWNhbGx5IGJlIGZvY3VzZWQgYXMgeW91IHR5cGUuXG4gICAqL1xuICBASW5wdXQoKSBmb2N1c0ZpcnN0OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRvIGNvbnZlcnQgYSBnaXZlbiB2YWx1ZSBpbnRvIHN0cmluZyB0byBkaXNwbGF5IGluIHRoZSBpbnB1dCBmaWVsZFxuICAgKi9cbiAgQElucHV0KCkgaW5wdXRGb3JtYXR0ZXI6ICh2YWx1ZTogYW55KSA9PiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdG8gdHJhbnNmb3JtIHRoZSBwcm92aWRlZCBvYnNlcnZhYmxlIHRleHQgaW50byB0aGUgYXJyYXkgb2YgcmVzdWx0cy4gIE5vdGUgdGhhdCB0aGUgXCJ0aGlzXCIgYXJndW1lbnRcbiAgICogaXMgdW5kZWZpbmVkIHNvIHlvdSBuZWVkIHRvIGV4cGxpY2l0bHkgYmluZCBpdCB0byBhIGRlc2lyZWQgXCJ0aGlzXCIgdGFyZ2V0LlxuICAgKi9cbiAgQElucHV0KCkgbmdiVHlwZWFoZWFkOiAodGV4dDogT2JzZXJ2YWJsZTxzdHJpbmc+KSA9PiBPYnNlcnZhYmxlPGFueVtdPjtcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB0byBmb3JtYXQgYSBnaXZlbiByZXN1bHQgYmVmb3JlIGRpc3BsYXkuIFRoaXMgZnVuY3Rpb24gc2hvdWxkIHJldHVybiBhIGZvcm1hdHRlZCBzdHJpbmcgd2l0aG91dCBhbnlcbiAgICogSFRNTCBtYXJrdXBcbiAgICovXG4gIEBJbnB1dCgpIHJlc3VsdEZvcm1hdHRlcjogKHZhbHVlOiBhbnkpID0+IHN0cmluZztcblxuICAvKipcbiAgICogQSB0ZW1wbGF0ZSB0byBvdmVycmlkZSBhIG1hdGNoaW5nIHJlc3VsdCBkZWZhdWx0IGRpc3BsYXlcbiAgICovXG4gIEBJbnB1dCgpIHJlc3VsdFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxSZXN1bHRUZW1wbGF0ZUNvbnRleHQ+O1xuXG4gIC8qKlxuICAgKiBTaG93IGhpbnQgd2hlbiBhbiBvcHRpb24gaW4gdGhlIHJlc3VsdCBsaXN0IG1hdGNoZXMuXG4gICAqL1xuICBASW5wdXQoKSBzaG93SGludDogYm9vbGVhbjtcblxuICAvKiogUGxhY2VtZW50IG9mIGEgdHlwZWFoZWFkIGFjY2VwdHM6XG4gICAqICAgIFwidG9wXCIsIFwidG9wLWxlZnRcIiwgXCJ0b3AtcmlnaHRcIiwgXCJib3R0b21cIiwgXCJib3R0b20tbGVmdFwiLCBcImJvdHRvbS1yaWdodFwiLFxuICAgKiAgICBcImxlZnRcIiwgXCJsZWZ0LXRvcFwiLCBcImxlZnQtYm90dG9tXCIsIFwicmlnaHRcIiwgXCJyaWdodC10b3BcIiwgXCJyaWdodC1ib3R0b21cIlxuICAgKiBhbmQgYXJyYXkgb2YgYWJvdmUgdmFsdWVzLlxuICAqL1xuICBASW5wdXQoKSBwbGFjZW1lbnQ6IFBsYWNlbWVudEFycmF5ID0gJ2JvdHRvbS1sZWZ0JztcblxuICAvKipcbiAgICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIGEgbWF0Y2ggaXMgc2VsZWN0ZWQuIEV2ZW50IHBheWxvYWQgaXMgb2YgdHlwZSBOZ2JUeXBlYWhlYWRTZWxlY3RJdGVtRXZlbnQuXG4gICAqL1xuICBAT3V0cHV0KCkgc2VsZWN0SXRlbSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiVHlwZWFoZWFkU2VsZWN0SXRlbUV2ZW50PigpO1xuXG4gIGFjdGl2ZURlc2NlbmRhbnQ6IHN0cmluZztcbiAgcG9wdXBJZCA9IGBuZ2ItdHlwZWFoZWFkLSR7bmV4dFdpbmRvd0lkKyt9YDtcblxuICBwcml2YXRlIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcbiAgcHJpdmF0ZSBfb25DaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD4sIHByaXZhdGUgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IsIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgY29uZmlnOiBOZ2JUeXBlYWhlYWRDb25maWcsIG5nWm9uZTogTmdab25lLCBwcml2YXRlIF9saXZlOiBMaXZlKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSBjb25maWcuY29udGFpbmVyO1xuICAgIHRoaXMuZWRpdGFibGUgPSBjb25maWcuZWRpdGFibGU7XG4gICAgdGhpcy5mb2N1c0ZpcnN0ID0gY29uZmlnLmZvY3VzRmlyc3Q7XG4gICAgdGhpcy5zaG93SGludCA9IGNvbmZpZy5zaG93SGludDtcbiAgICB0aGlzLnBsYWNlbWVudCA9IGNvbmZpZy5wbGFjZW1lbnQ7XG5cbiAgICB0aGlzLl92YWx1ZUNoYW5nZXMgPSBmcm9tRXZlbnQ8RXZlbnQ+KF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdpbnB1dCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKG1hcCgkZXZlbnQgPT4gKCRldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpKTtcblxuICAgIHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcblxuICAgIHRoaXMuX3BvcHVwU2VydmljZSA9IG5ldyBQb3B1cFNlcnZpY2U8TmdiVHlwZWFoZWFkV2luZG93PihcbiAgICAgICAgTmdiVHlwZWFoZWFkV2luZG93LCBfaW5qZWN0b3IsIF92aWV3Q29udGFpbmVyUmVmLCBfcmVuZGVyZXIsIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcik7XG5cbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uID0gbmdab25lLm9uU3RhYmxlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc1BvcHVwT3BlbigpKSB7XG4gICAgICAgIHBvc2l0aW9uRWxlbWVudHMoXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX3dpbmRvd1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCB0aGlzLnBsYWNlbWVudCxcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID09PSAnYm9keScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgaW5wdXRWYWx1ZXMkID0gdGhpcy5fdmFsdWVDaGFuZ2VzLnBpcGUodGFwKHZhbHVlID0+IHtcbiAgICAgIHRoaXMuX2lucHV0VmFsdWVCYWNrdXAgPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLmVkaXRhYmxlKSB7XG4gICAgICAgIHRoaXMuX29uQ2hhbmdlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KSk7XG4gICAgY29uc3QgcmVzdWx0cyQgPSBpbnB1dFZhbHVlcyQucGlwZSh0aGlzLm5nYlR5cGVhaGVhZCk7XG4gICAgY29uc3QgcHJvY2Vzc2VkUmVzdWx0cyQgPSByZXN1bHRzJC5waXBlKHRhcCgoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuZWRpdGFibGUpIHtcbiAgICAgICAgdGhpcy5fb25DaGFuZ2UodW5kZWZpbmVkKTtcbiAgICAgIH1cbiAgICB9KSk7XG4gICAgY29uc3QgdXNlcklucHV0JCA9IHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkLnBpcGUoc3dpdGNoTWFwKCgpID0+IHByb2Nlc3NlZFJlc3VsdHMkKSk7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gdGhpcy5fc3Vic2NyaWJlVG9Vc2VySW5wdXQodXNlcklucHV0JCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XG4gICAgdGhpcy5fdW5zdWJzY3JpYmVGcm9tVXNlcklucHV0KCk7XG4gICAgdGhpcy5fem9uZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IGFueSk6IHZvaWQgeyB0aGlzLl9vbkNoYW5nZSA9IGZuOyB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IGFueSk6IHZvaWQgeyB0aGlzLl9vblRvdWNoZWQgPSBmbjsgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWUpIHsgdGhpcy5fd3JpdGVJbnB1dFZhbHVlKHRoaXMuX2Zvcm1hdEl0ZW1Gb3JJbnB1dCh2YWx1ZSkpOyB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnLCBpc0Rpc2FibGVkKTtcbiAgfVxuXG4gIG9uRG9jdW1lbnRDbGljayhldmVudCkge1xuICAgIGlmIChldmVudC50YXJnZXQgIT09IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkge1xuICAgICAgdGhpcy5kaXNtaXNzUG9wdXAoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGlzbWlzc2VzIHR5cGVhaGVhZCBwb3B1cCB3aW5kb3dcbiAgICovXG4gIGRpc21pc3NQb3B1cCgpIHtcbiAgICBpZiAodGhpcy5pc1BvcHVwT3BlbigpKSB7XG4gICAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XG4gICAgICB0aGlzLl93cml0ZUlucHV0VmFsdWUodGhpcy5faW5wdXRWYWx1ZUJhY2t1cCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHlwZWFoZWFkIHBvcHVwIHdpbmRvdyBpcyBkaXNwbGF5ZWRcbiAgICovXG4gIGlzUG9wdXBPcGVuKCkgeyByZXR1cm4gdGhpcy5fd2luZG93UmVmICE9IG51bGw7IH1cblxuICBoYW5kbGVCbHVyKCkge1xuICAgIHRoaXMuX3Jlc3Vic2NyaWJlVHlwZWFoZWFkLm5leHQobnVsbCk7XG4gICAgdGhpcy5fb25Ub3VjaGVkKCk7XG4gIH1cblxuICBoYW5kbGVLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmlzUG9wdXBPcGVuKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICBjb25zdCB7d2hpY2h9ID0gZXZlbnQ7XG4gICAgaWYgKEtleVt0b1N0cmluZyh3aGljaCldKSB7XG4gICAgICBzd2l0Y2ggKHdoaWNoKSB7XG4gICAgICAgIGNhc2UgS2V5LkFycm93RG93bjpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5uZXh0KCk7XG4gICAgICAgICAgdGhpcy5fc2hvd0hpbnQoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLZXkuQXJyb3dVcDpcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5wcmV2KCk7XG4gICAgICAgICAgdGhpcy5fc2hvd0hpbnQoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBLZXkuRW50ZXI6XG4gICAgICAgIGNhc2UgS2V5LlRhYjpcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuZ2V0QWN0aXZlKCk7XG4gICAgICAgICAgaWYgKGlzRGVmaW5lZChyZXN1bHQpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RSZXN1bHQocmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fY2xvc2VQb3B1cCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEtleS5Fc2NhcGU6XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLl9yZXN1YnNjcmliZVR5cGVhaGVhZC5uZXh0KG51bGwpO1xuICAgICAgICAgIHRoaXMuZGlzbWlzc1BvcHVwKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfb3BlblBvcHVwKCkge1xuICAgIGlmICghdGhpcy5pc1BvcHVwT3BlbigpKSB7XG4gICAgICB0aGlzLl9pbnB1dFZhbHVlQmFja3VwID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgICAgdGhpcy5fd2luZG93UmVmID0gdGhpcy5fcG9wdXBTZXJ2aWNlLm9wZW4oKTtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5pZCA9IHRoaXMucG9wdXBJZDtcbiAgICAgIHRoaXMuX3dpbmRvd1JlZi5pbnN0YW5jZS5zZWxlY3RFdmVudC5zdWJzY3JpYmUoKHJlc3VsdDogYW55KSA9PiB0aGlzLl9zZWxlY3RSZXN1bHRDbG9zZVBvcHVwKHJlc3VsdCkpO1xuICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmFjdGl2ZUNoYW5nZUV2ZW50LnN1YnNjcmliZSgoYWN0aXZlSWQ6IHN0cmluZykgPT4gdGhpcy5hY3RpdmVEZXNjZW5kYW50ID0gYWN0aXZlSWQpO1xuXG4gICAgICBpZiAodGhpcy5jb250YWluZXIgPT09ICdib2R5Jykge1xuICAgICAgICB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmNvbnRhaW5lcikuYXBwZW5kQ2hpbGQodGhpcy5fd2luZG93UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Nsb3NlUG9wdXAoKSB7XG4gICAgdGhpcy5fcG9wdXBTZXJ2aWNlLmNsb3NlKCk7XG4gICAgdGhpcy5fd2luZG93UmVmID0gbnVsbDtcbiAgICB0aGlzLmFjdGl2ZURlc2NlbmRhbnQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3RSZXN1bHQocmVzdWx0OiBhbnkpIHtcbiAgICBsZXQgZGVmYXVsdFByZXZlbnRlZCA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0SXRlbS5lbWl0KHtpdGVtOiByZXN1bHQsIHByZXZlbnREZWZhdWx0OiAoKSA9PiB7IGRlZmF1bHRQcmV2ZW50ZWQgPSB0cnVlOyB9fSk7XG4gICAgdGhpcy5fcmVzdWJzY3JpYmVUeXBlYWhlYWQubmV4dChudWxsKTtcblxuICAgIGlmICghZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgdGhpcy53cml0ZVZhbHVlKHJlc3VsdCk7XG4gICAgICB0aGlzLl9vbkNoYW5nZShyZXN1bHQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdFJlc3VsdENsb3NlUG9wdXAocmVzdWx0OiBhbnkpIHtcbiAgICB0aGlzLl9zZWxlY3RSZXN1bHQocmVzdWx0KTtcbiAgICB0aGlzLl9jbG9zZVBvcHVwKCk7XG4gICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBwcml2YXRlIF9zaG93SGludCgpIHtcbiAgICBpZiAodGhpcy5zaG93SGludCAmJiB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuaGFzQWN0aXZlKCkgJiYgdGhpcy5faW5wdXRWYWx1ZUJhY2t1cCAhPSBudWxsKSB7XG4gICAgICBjb25zdCB1c2VySW5wdXRMb3dlckNhc2UgPSB0aGlzLl9pbnB1dFZhbHVlQmFja3VwLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCBmb3JtYXR0ZWRWYWwgPSB0aGlzLl9mb3JtYXRJdGVtRm9ySW5wdXQodGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmdldEFjdGl2ZSgpKTtcblxuICAgICAgaWYgKHVzZXJJbnB1dExvd2VyQ2FzZSA9PT0gZm9ybWF0dGVkVmFsLnN1YnN0cigwLCB0aGlzLl9pbnB1dFZhbHVlQmFja3VwLmxlbmd0aCkudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICB0aGlzLl93cml0ZUlucHV0VmFsdWUodGhpcy5faW5wdXRWYWx1ZUJhY2t1cCArIGZvcm1hdHRlZFZhbC5zdWJzdHIodGhpcy5faW5wdXRWYWx1ZUJhY2t1cC5sZW5ndGgpKTtcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50WydzZXRTZWxlY3Rpb25SYW5nZSddLmFwcGx5KFxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBbdGhpcy5faW5wdXRWYWx1ZUJhY2t1cC5sZW5ndGgsIGZvcm1hdHRlZFZhbC5sZW5ndGhdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMud3JpdGVWYWx1ZSh0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuZ2V0QWN0aXZlKCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Zvcm1hdEl0ZW1Gb3JJbnB1dChpdGVtOiBhbnkpOiBzdHJpbmcge1xuICAgIHJldHVybiBpdGVtICE9IG51bGwgJiYgdGhpcy5pbnB1dEZvcm1hdHRlciA/IHRoaXMuaW5wdXRGb3JtYXR0ZXIoaXRlbSkgOiB0b1N0cmluZyhpdGVtKTtcbiAgfVxuXG4gIHByaXZhdGUgX3dyaXRlSW5wdXRWYWx1ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCB0b1N0cmluZyh2YWx1ZSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3Vic2NyaWJlVG9Vc2VySW5wdXQodXNlcklucHV0JDogT2JzZXJ2YWJsZTxhbnlbXT4pOiBTdWJzY3JpcHRpb24ge1xuICAgIHJldHVybiB1c2VySW5wdXQkLnN1YnNjcmliZSgocmVzdWx0cykgPT4ge1xuICAgICAgaWYgKCFyZXN1bHRzIHx8IHJlc3VsdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuX2Nsb3NlUG9wdXAoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX29wZW5Qb3B1cCgpO1xuICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UuZm9jdXNGaXJzdCA9IHRoaXMuZm9jdXNGaXJzdDtcbiAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLnJlc3VsdHMgPSByZXN1bHRzO1xuICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UudGVybSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMucmVzdWx0Rm9ybWF0dGVyKSB7XG4gICAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLmZvcm1hdHRlciA9IHRoaXMucmVzdWx0Rm9ybWF0dGVyO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJlc3VsdFRlbXBsYXRlKSB7XG4gICAgICAgICAgdGhpcy5fd2luZG93UmVmLmluc3RhbmNlLnJlc3VsdFRlbXBsYXRlID0gdGhpcy5yZXN1bHRUZW1wbGF0ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl93aW5kb3dSZWYuaW5zdGFuY2UucmVzZXRBY3RpdmUoKTtcblxuICAgICAgICAvLyBUaGUgb2JzZXJ2YWJsZSBzdHJlYW0gd2UgYXJlIHN1YnNjcmliaW5nIHRvIG1pZ2h0IGhhdmUgYXN5bmMgc3RlcHNcbiAgICAgICAgLy8gYW5kIGlmIGEgY29tcG9uZW50IGNvbnRhaW5pbmcgdHlwZWFoZWFkIGlzIHVzaW5nIHRoZSBPblB1c2ggc3RyYXRlZ3lcbiAgICAgICAgLy8gdGhlIGNoYW5nZSBkZXRlY3Rpb24gdHVybiB3b3VsZG4ndCBiZSBpbnZva2VkIGF1dG9tYXRpY2FsbHkuXG4gICAgICAgIHRoaXMuX3dpbmRvd1JlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICAgICAgdGhpcy5fc2hvd0hpbnQoKTtcbiAgICAgIH1cblxuICAgICAgLy8gbGl2ZSBhbm5vdW5jZXJcbiAgICAgIGNvbnN0IGNvdW50ID0gcmVzdWx0cyA/IHJlc3VsdHMubGVuZ3RoIDogMDtcbiAgICAgIHRoaXMuX2xpdmUuc2F5KGNvdW50ID09PSAwID8gJ05vIHJlc3VsdHMgYXZhaWxhYmxlJyA6IGAke2NvdW50fSByZXN1bHQke2NvdW50ID09PSAxID8gJycgOiAncyd9IGF2YWlsYWJsZWApO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfdW5zdWJzY3JpYmVGcm9tVXNlcklucHV0KCkge1xuICAgIGlmICh0aGlzLl9zdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBudWxsO1xuICB9XG59XG4iXX0=