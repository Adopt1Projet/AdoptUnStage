/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { fromEvent } from 'rxjs';
import { filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Key } from '../util/key';
/** @type {?} */
var FOCUSABLE_ELEMENTS_SELECTOR = [
    'a[href]', 'button:not([disabled])', 'input:not([disabled]):not([type="hidden"])', 'select:not([disabled])',
    'textarea:not([disabled])', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'
].join(', ');
/**
 * Returns first and last focusable elements inside of a given element based on specific CSS selector
 * @param {?} element
 * @return {?}
 */
export function getFocusableBoundaryElements(element) {
    /** @type {?} */
    var list = element.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);
    return [list[0], list[list.length - 1]];
}
/**
 * Function that enforces browser focus to be trapped inside a DOM element.
 *
 * Works only for clicks inside the element and navigation with 'Tab', ignoring clicks outside of the element
 *
 * \@param element The element around which focus will be trapped inside
 * \@param stopFocusTrap$ The observable stream. When completed the focus trap will clean up listeners
 * and free internal resources
 * \@param refocusOnClick Put the focus back to the last focused element whenever a click occurs on element (default to
 * false)
 * @type {?}
 */
export var ngbFocusTrap = function (element, stopFocusTrap$, refocusOnClick) {
    if (refocusOnClick === void 0) { refocusOnClick = false; }
    // last focused element
    /** @type {?} */
    var lastFocusedElement$ = fromEvent(element, 'focusin').pipe(takeUntil(stopFocusTrap$), map(function (e) { return e.target; }));
    // 'tab' / 'shift+tab' stream
    fromEvent(element, 'keydown')
        .pipe(takeUntil(stopFocusTrap$), 
    // tslint:disable:deprecation
    filter(function (e) { return e.which === Key.Tab; }), 
    // tslint:enable:deprecation
    withLatestFrom(lastFocusedElement$))
        .subscribe(function (_a) {
        var _b = tslib_1.__read(_a, 2), tabEvent = _b[0], focusedElement = _b[1];
        var _c = tslib_1.__read(getFocusableBoundaryElements(element), 2), first = _c[0], last = _c[1];
        if ((focusedElement === first || focusedElement === element) && tabEvent.shiftKey) {
            last.focus();
            tabEvent.preventDefault();
        }
        if (focusedElement === last && !tabEvent.shiftKey) {
            first.focus();
            tabEvent.preventDefault();
        }
    });
    // inside click
    if (refocusOnClick) {
        fromEvent(element, 'click')
            .pipe(takeUntil(stopFocusTrap$), withLatestFrom(lastFocusedElement$), map(function (arr) { return (/** @type {?} */ (arr[1])); }))
            .subscribe(function (lastFocusedElement) { return lastFocusedElement.focus(); });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtdHJhcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidXRpbC9mb2N1cy10cmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEUsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGFBQWEsQ0FBQzs7SUFFMUIsMkJBQTJCLEdBQUc7SUFDbEMsU0FBUyxFQUFFLHdCQUF3QixFQUFFLDRDQUE0QyxFQUFFLHdCQUF3QjtJQUMzRywwQkFBMEIsRUFBRSxtQkFBbUIsRUFBRSxpQ0FBaUM7Q0FDbkYsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7QUFLWixNQUFNLFVBQVUsNEJBQTRCLENBQUMsT0FBb0I7O1FBQ3pELElBQUksR0FBNEIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLDJCQUEyQixDQUFDO0lBQzNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQyxDQUFDOzs7Ozs7Ozs7Ozs7O0FBYUQsTUFBTSxLQUFPLFlBQVksR0FBRyxVQUFDLE9BQW9CLEVBQUUsY0FBK0IsRUFBRSxjQUFzQjtJQUF0QiwrQkFBQSxFQUFBLHNCQUFzQjs7O1FBRWxHLG1CQUFtQixHQUNyQixTQUFTLENBQWEsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEVBQUUsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sRUFBUixDQUFRLENBQUMsQ0FBQztJQUVqRyw2QkFBNkI7SUFDN0IsU0FBUyxDQUFnQixPQUFPLEVBQUUsU0FBUyxDQUFDO1NBQ3ZDLElBQUksQ0FDRCxTQUFTLENBQUMsY0FBYyxDQUFDO0lBQ3pCLDZCQUE2QjtJQUM3QixNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEVBQW5CLENBQW1CLENBQUM7SUFDaEMsNEJBQTRCO0lBQzVCLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3ZDLFNBQVMsQ0FBQyxVQUFDLEVBQTBCO1lBQTFCLDBCQUEwQixFQUF6QixnQkFBUSxFQUFFLHNCQUFjO1FBQzlCLElBQUEsNkRBQXFELEVBQXBELGFBQUssRUFBRSxZQUE2QztRQUUxRCxJQUFJLENBQUMsY0FBYyxLQUFLLEtBQUssSUFBSSxjQUFjLEtBQUssT0FBTyxDQUFDLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUNqRixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDM0I7UUFFRCxJQUFJLGNBQWMsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQ2pELEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNkLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRVAsZUFBZTtJQUNmLElBQUksY0FBYyxFQUFFO1FBQ2xCLFNBQVMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO2FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEVBQUUsY0FBYyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsR0FBRyxDQUFDLFVBQUEsR0FBRyxXQUFJLG1CQUFBLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBZSxHQUFBLENBQUMsQ0FBQzthQUN2RyxTQUFTLENBQUMsVUFBQSxrQkFBa0IsSUFBSSxPQUFBLGtCQUFrQixDQUFDLEtBQUssRUFBRSxFQUExQixDQUEwQixDQUFDLENBQUM7S0FDbEU7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtmcm9tRXZlbnQsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgdGFrZVVudGlsLCB3aXRoTGF0ZXN0RnJvbX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0tleX0gZnJvbSAnLi4vdXRpbC9rZXknO1xuXG5jb25zdCBGT0NVU0FCTEVfRUxFTUVOVFNfU0VMRUNUT1IgPSBbXG4gICdhW2hyZWZdJywgJ2J1dHRvbjpub3QoW2Rpc2FibGVkXSknLCAnaW5wdXQ6bm90KFtkaXNhYmxlZF0pOm5vdChbdHlwZT1cImhpZGRlblwiXSknLCAnc2VsZWN0Om5vdChbZGlzYWJsZWRdKScsXG4gICd0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSknLCAnW2NvbnRlbnRlZGl0YWJsZV0nLCAnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4PVwiLTFcIl0pJ1xuXS5qb2luKCcsICcpO1xuXG4vKipcbiAqIFJldHVybnMgZmlyc3QgYW5kIGxhc3QgZm9jdXNhYmxlIGVsZW1lbnRzIGluc2lkZSBvZiBhIGdpdmVuIGVsZW1lbnQgYmFzZWQgb24gc3BlY2lmaWMgQ1NTIHNlbGVjdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGb2N1c2FibGVCb3VuZGFyeUVsZW1lbnRzKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnRbXSB7XG4gIGNvbnN0IGxpc3Q6IE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKEZPQ1VTQUJMRV9FTEVNRU5UU19TRUxFQ1RPUik7XG4gIHJldHVybiBbbGlzdFswXSwgbGlzdFtsaXN0Lmxlbmd0aCAtIDFdXTtcbn1cblxuLyoqXG4gKiBGdW5jdGlvbiB0aGF0IGVuZm9yY2VzIGJyb3dzZXIgZm9jdXMgdG8gYmUgdHJhcHBlZCBpbnNpZGUgYSBET00gZWxlbWVudC5cbiAqXG4gKiBXb3JrcyBvbmx5IGZvciBjbGlja3MgaW5zaWRlIHRoZSBlbGVtZW50IGFuZCBuYXZpZ2F0aW9uIHdpdGggJ1RhYicsIGlnbm9yaW5nIGNsaWNrcyBvdXRzaWRlIG9mIHRoZSBlbGVtZW50XG4gKlxuICogQHBhcmFtIGVsZW1lbnQgVGhlIGVsZW1lbnQgYXJvdW5kIHdoaWNoIGZvY3VzIHdpbGwgYmUgdHJhcHBlZCBpbnNpZGVcbiAqIEBwYXJhbSBzdG9wRm9jdXNUcmFwJCBUaGUgb2JzZXJ2YWJsZSBzdHJlYW0uIFdoZW4gY29tcGxldGVkIHRoZSBmb2N1cyB0cmFwIHdpbGwgY2xlYW4gdXAgbGlzdGVuZXJzXG4gKiBhbmQgZnJlZSBpbnRlcm5hbCByZXNvdXJjZXNcbiAqIEBwYXJhbSByZWZvY3VzT25DbGljayBQdXQgdGhlIGZvY3VzIGJhY2sgdG8gdGhlIGxhc3QgZm9jdXNlZCBlbGVtZW50IHdoZW5ldmVyIGEgY2xpY2sgb2NjdXJzIG9uIGVsZW1lbnQgKGRlZmF1bHQgdG9cbiAqIGZhbHNlKVxuICovXG5leHBvcnQgY29uc3QgbmdiRm9jdXNUcmFwID0gKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzdG9wRm9jdXNUcmFwJDogT2JzZXJ2YWJsZTxhbnk+LCByZWZvY3VzT25DbGljayA9IGZhbHNlKSA9PiB7XG4gIC8vIGxhc3QgZm9jdXNlZCBlbGVtZW50XG4gIGNvbnN0IGxhc3RGb2N1c2VkRWxlbWVudCQgPVxuICAgICAgZnJvbUV2ZW50PEZvY3VzRXZlbnQ+KGVsZW1lbnQsICdmb2N1c2luJykucGlwZSh0YWtlVW50aWwoc3RvcEZvY3VzVHJhcCQpLCBtYXAoZSA9PiBlLnRhcmdldCkpO1xuXG4gIC8vICd0YWInIC8gJ3NoaWZ0K3RhYicgc3RyZWFtXG4gIGZyb21FdmVudDxLZXlib2FyZEV2ZW50PihlbGVtZW50LCAna2V5ZG93bicpXG4gICAgICAucGlwZShcbiAgICAgICAgICB0YWtlVW50aWwoc3RvcEZvY3VzVHJhcCQpLFxuICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlOmRlcHJlY2F0aW9uXG4gICAgICAgICAgZmlsdGVyKGUgPT4gZS53aGljaCA9PT0gS2V5LlRhYiksXG4gICAgICAgICAgLy8gdHNsaW50OmVuYWJsZTpkZXByZWNhdGlvblxuICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKGxhc3RGb2N1c2VkRWxlbWVudCQpKVxuICAgICAgLnN1YnNjcmliZSgoW3RhYkV2ZW50LCBmb2N1c2VkRWxlbWVudF0pID0+IHtcbiAgICAgICAgY29uc3RbZmlyc3QsIGxhc3RdID0gZ2V0Rm9jdXNhYmxlQm91bmRhcnlFbGVtZW50cyhlbGVtZW50KTtcblxuICAgICAgICBpZiAoKGZvY3VzZWRFbGVtZW50ID09PSBmaXJzdCB8fCBmb2N1c2VkRWxlbWVudCA9PT0gZWxlbWVudCkgJiYgdGFiRXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICBsYXN0LmZvY3VzKCk7XG4gICAgICAgICAgdGFiRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2N1c2VkRWxlbWVudCA9PT0gbGFzdCAmJiAhdGFiRXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICBmaXJzdC5mb2N1cygpO1xuICAgICAgICAgIHRhYkV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gIC8vIGluc2lkZSBjbGlja1xuICBpZiAocmVmb2N1c09uQ2xpY2spIHtcbiAgICBmcm9tRXZlbnQoZWxlbWVudCwgJ2NsaWNrJylcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHN0b3BGb2N1c1RyYXAkKSwgd2l0aExhdGVzdEZyb20obGFzdEZvY3VzZWRFbGVtZW50JCksIG1hcChhcnIgPT4gYXJyWzFdIGFzIEhUTUxFbGVtZW50KSlcbiAgICAgICAgLnN1YnNjcmliZShsYXN0Rm9jdXNlZEVsZW1lbnQgPT4gbGFzdEZvY3VzZWRFbGVtZW50LmZvY3VzKCkpO1xuICB9XG59O1xuIl19