/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { fromEvent } from 'rxjs';
import { filter, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Key } from '../util/key';
/** @type {?} */
const FOCUSABLE_ELEMENTS_SELECTOR = [
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
    const list = element.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);
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
export const ngbFocusTrap = (element, stopFocusTrap$, refocusOnClick = false) => {
    // last focused element
    /** @type {?} */
    const lastFocusedElement$ = fromEvent(element, 'focusin').pipe(takeUntil(stopFocusTrap$), map(e => e.target));
    // 'tab' / 'shift+tab' stream
    fromEvent(element, 'keydown')
        .pipe(takeUntil(stopFocusTrap$), 
    // tslint:disable:deprecation
    filter(e => e.which === Key.Tab), 
    // tslint:enable:deprecation
    withLatestFrom(lastFocusedElement$))
        .subscribe(([tabEvent, focusedElement]) => {
        const [first, last] = getFocusableBoundaryElements(element);
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
            .pipe(takeUntil(stopFocusTrap$), withLatestFrom(lastFocusedElement$), map(arr => (/** @type {?} */ (arr[1]))))
            .subscribe(lastFocusedElement => lastFocusedElement.focus());
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtdHJhcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwLyIsInNvdXJjZXMiOlsidXRpbC9mb2N1cy10cmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0RSxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sYUFBYSxDQUFDOztNQUUxQiwyQkFBMkIsR0FBRztJQUNsQyxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsNENBQTRDLEVBQUUsd0JBQXdCO0lBQzNHLDBCQUEwQixFQUFFLG1CQUFtQixFQUFFLGlDQUFpQztDQUNuRixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztBQUtaLE1BQU0sVUFBVSw0QkFBNEIsQ0FBQyxPQUFvQjs7VUFDekQsSUFBSSxHQUE0QixPQUFPLENBQUMsZ0JBQWdCLENBQUMsMkJBQTJCLENBQUM7SUFDM0YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFDLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFhRCxNQUFNLE9BQU8sWUFBWSxHQUFHLENBQUMsT0FBb0IsRUFBRSxjQUErQixFQUFFLGNBQWMsR0FBRyxLQUFLLEVBQUUsRUFBRTs7O1VBRXRHLG1CQUFtQixHQUNyQixTQUFTLENBQWEsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRWpHLDZCQUE2QjtJQUM3QixTQUFTLENBQWdCLE9BQU8sRUFBRSxTQUFTLENBQUM7U0FDdkMsSUFBSSxDQUNELFNBQVMsQ0FBQyxjQUFjLENBQUM7SUFDekIsNkJBQTZCO0lBQzdCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUNoQyw0QkFBNEI7SUFDNUIsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDdkMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLEVBQUUsRUFBRTtjQUNuQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyw0QkFBNEIsQ0FBQyxPQUFPLENBQUM7UUFFMUQsSUFBSSxDQUFDLGNBQWMsS0FBSyxLQUFLLElBQUksY0FBYyxLQUFLLE9BQU8sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDakYsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzNCO1FBRUQsSUFBSSxjQUFjLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUNqRCxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDZCxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVQLGVBQWU7SUFDZixJQUFJLGNBQWMsRUFBRTtRQUNsQixTQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQzthQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLG1CQUFBLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBZSxDQUFDLENBQUM7YUFDdkcsU0FBUyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0tBQ2xFO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZnJvbUV2ZW50LCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHRha2VVbnRpbCwgd2l0aExhdGVzdEZyb219IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtLZXl9IGZyb20gJy4uL3V0aWwva2V5JztcblxuY29uc3QgRk9DVVNBQkxFX0VMRU1FTlRTX1NFTEVDVE9SID0gW1xuICAnYVtocmVmXScsICdidXR0b246bm90KFtkaXNhYmxlZF0pJywgJ2lucHV0Om5vdChbZGlzYWJsZWRdKTpub3QoW3R5cGU9XCJoaWRkZW5cIl0pJywgJ3NlbGVjdDpub3QoW2Rpc2FibGVkXSknLFxuICAndGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pJywgJ1tjb250ZW50ZWRpdGFibGVdJywgJ1t0YWJpbmRleF06bm90KFt0YWJpbmRleD1cIi0xXCJdKSdcbl0uam9pbignLCAnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGZpcnN0IGFuZCBsYXN0IGZvY3VzYWJsZSBlbGVtZW50cyBpbnNpZGUgb2YgYSBnaXZlbiBlbGVtZW50IGJhc2VkIG9uIHNwZWNpZmljIENTUyBzZWxlY3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9jdXNhYmxlQm91bmRhcnlFbGVtZW50cyhlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50W10ge1xuICBjb25zdCBsaXN0OiBOb2RlTGlzdE9mPEhUTUxFbGVtZW50PiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChGT0NVU0FCTEVfRUxFTUVOVFNfU0VMRUNUT1IpO1xuICByZXR1cm4gW2xpc3RbMF0sIGxpc3RbbGlzdC5sZW5ndGggLSAxXV07XG59XG5cbi8qKlxuICogRnVuY3Rpb24gdGhhdCBlbmZvcmNlcyBicm93c2VyIGZvY3VzIHRvIGJlIHRyYXBwZWQgaW5zaWRlIGEgRE9NIGVsZW1lbnQuXG4gKlxuICogV29ya3Mgb25seSBmb3IgY2xpY2tzIGluc2lkZSB0aGUgZWxlbWVudCBhbmQgbmF2aWdhdGlvbiB3aXRoICdUYWInLCBpZ25vcmluZyBjbGlja3Mgb3V0c2lkZSBvZiB0aGUgZWxlbWVudFxuICpcbiAqIEBwYXJhbSBlbGVtZW50IFRoZSBlbGVtZW50IGFyb3VuZCB3aGljaCBmb2N1cyB3aWxsIGJlIHRyYXBwZWQgaW5zaWRlXG4gKiBAcGFyYW0gc3RvcEZvY3VzVHJhcCQgVGhlIG9ic2VydmFibGUgc3RyZWFtLiBXaGVuIGNvbXBsZXRlZCB0aGUgZm9jdXMgdHJhcCB3aWxsIGNsZWFuIHVwIGxpc3RlbmVyc1xuICogYW5kIGZyZWUgaW50ZXJuYWwgcmVzb3VyY2VzXG4gKiBAcGFyYW0gcmVmb2N1c09uQ2xpY2sgUHV0IHRoZSBmb2N1cyBiYWNrIHRvIHRoZSBsYXN0IGZvY3VzZWQgZWxlbWVudCB3aGVuZXZlciBhIGNsaWNrIG9jY3VycyBvbiBlbGVtZW50IChkZWZhdWx0IHRvXG4gKiBmYWxzZSlcbiAqL1xuZXhwb3J0IGNvbnN0IG5nYkZvY3VzVHJhcCA9IChlbGVtZW50OiBIVE1MRWxlbWVudCwgc3RvcEZvY3VzVHJhcCQ6IE9ic2VydmFibGU8YW55PiwgcmVmb2N1c09uQ2xpY2sgPSBmYWxzZSkgPT4ge1xuICAvLyBsYXN0IGZvY3VzZWQgZWxlbWVudFxuICBjb25zdCBsYXN0Rm9jdXNlZEVsZW1lbnQkID1cbiAgICAgIGZyb21FdmVudDxGb2N1c0V2ZW50PihlbGVtZW50LCAnZm9jdXNpbicpLnBpcGUodGFrZVVudGlsKHN0b3BGb2N1c1RyYXAkKSwgbWFwKGUgPT4gZS50YXJnZXQpKTtcblxuICAvLyAndGFiJyAvICdzaGlmdCt0YWInIHN0cmVhbVxuICBmcm9tRXZlbnQ8S2V5Ym9hcmRFdmVudD4oZWxlbWVudCwgJ2tleWRvd24nKVxuICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFrZVVudGlsKHN0b3BGb2N1c1RyYXAkKSxcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTpkZXByZWNhdGlvblxuICAgICAgICAgIGZpbHRlcihlID0+IGUud2hpY2ggPT09IEtleS5UYWIpLFxuICAgICAgICAgIC8vIHRzbGludDplbmFibGU6ZGVwcmVjYXRpb25cbiAgICAgICAgICB3aXRoTGF0ZXN0RnJvbShsYXN0Rm9jdXNlZEVsZW1lbnQkKSlcbiAgICAgIC5zdWJzY3JpYmUoKFt0YWJFdmVudCwgZm9jdXNlZEVsZW1lbnRdKSA9PiB7XG4gICAgICAgIGNvbnN0W2ZpcnN0LCBsYXN0XSA9IGdldEZvY3VzYWJsZUJvdW5kYXJ5RWxlbWVudHMoZWxlbWVudCk7XG5cbiAgICAgICAgaWYgKChmb2N1c2VkRWxlbWVudCA9PT0gZmlyc3QgfHwgZm9jdXNlZEVsZW1lbnQgPT09IGVsZW1lbnQpICYmIHRhYkV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgbGFzdC5mb2N1cygpO1xuICAgICAgICAgIHRhYkV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9jdXNlZEVsZW1lbnQgPT09IGxhc3QgJiYgIXRhYkV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgZmlyc3QuZm9jdXMoKTtcbiAgICAgICAgICB0YWJFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAvLyBpbnNpZGUgY2xpY2tcbiAgaWYgKHJlZm9jdXNPbkNsaWNrKSB7XG4gICAgZnJvbUV2ZW50KGVsZW1lbnQsICdjbGljaycpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbChzdG9wRm9jdXNUcmFwJCksIHdpdGhMYXRlc3RGcm9tKGxhc3RGb2N1c2VkRWxlbWVudCQpLCBtYXAoYXJyID0+IGFyclsxXSBhcyBIVE1MRWxlbWVudCkpXG4gICAgICAgIC5zdWJzY3JpYmUobGFzdEZvY3VzZWRFbGVtZW50ID0+IGxhc3RGb2N1c2VkRWxlbWVudC5mb2N1cygpKTtcbiAgfVxufTtcbiJdfQ==