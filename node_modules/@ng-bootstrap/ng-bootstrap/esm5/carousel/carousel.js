/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, EventEmitter, Inject, Input, NgZone, Output, PLATFORM_ID, QueryList, TemplateRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbCarouselConfig } from './carousel-config';
import { Subject, timer } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
/** @type {?} */
var nextId = 0;
/**
 * Represents an individual slide to be used within a carousel.
 */
var NgbSlide = /** @class */ (function () {
    function NgbSlide(tplRef) {
        this.tplRef = tplRef;
        /**
         * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
         * Will be auto-generated if not provided.
         */
        this.id = "ngb-slide-" + nextId++;
    }
    NgbSlide.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[ngbSlide]' },] }
    ];
    /** @nocollapse */
    NgbSlide.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    NgbSlide.propDecorators = {
        id: [{ type: Input }]
    };
    return NgbSlide;
}());
export { NgbSlide };
if (false) {
    /**
     * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
     * Will be auto-generated if not provided.
     * @type {?}
     */
    NgbSlide.prototype.id;
    /** @type {?} */
    NgbSlide.prototype.tplRef;
}
/**
 * Directive to easily create carousels based on Bootstrap's markup.
 */
var NgbCarousel = /** @class */ (function () {
    function NgbCarousel(config, _platformId, _ngZone, _cd) {
        this._platformId = _platformId;
        this._ngZone = _ngZone;
        this._cd = _cd;
        this._start$ = new Subject();
        this._stop$ = new Subject();
        /**
         * A carousel slide event fired when the slide transition is completed.
         * See NgbSlideEvent for payload details
         */
        this.slide = new EventEmitter();
        this.interval = config.interval;
        this.wrap = config.wrap;
        this.keyboard = config.keyboard;
        this.pauseOnHover = config.pauseOnHover;
        this.showNavigationArrows = config.showNavigationArrows;
        this.showNavigationIndicators = config.showNavigationIndicators;
    }
    /**
     * @return {?}
     */
    NgbCarousel.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // setInterval() doesn't play well with SSR and protractor,
        // so we should run it in the browser and outside Angular
        if (isPlatformBrowser(this._platformId)) {
            this._ngZone.runOutsideAngular(function () {
                _this._start$
                    .pipe(map(function () { return _this.interval; }), filter(function (interval) { return interval > 0 && _this.slides.length > 0; }), switchMap(function (interval) { return timer(interval).pipe(takeUntil(_this._stop$)); }))
                    .subscribe(function () { return _this._ngZone.run(function () { return _this.next(); }); });
                _this._start$.next();
            });
        }
    };
    /**
     * @return {?}
     */
    NgbCarousel.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var activeSlide = this._getSlideById(this.activeId);
        this.activeId = activeSlide ? activeSlide.id : (this.slides.length ? this.slides.first.id : null);
    };
    /**
     * @return {?}
     */
    NgbCarousel.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () { this._stop$.next(); };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgbCarousel.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if ('interval' in changes && !changes['interval'].isFirstChange()) {
            this._start$.next();
        }
    };
    /**
     * Navigate to a slide with the specified identifier.
     */
    /**
     * Navigate to a slide with the specified identifier.
     * @param {?} slideId
     * @return {?}
     */
    NgbCarousel.prototype.select = /**
     * Navigate to a slide with the specified identifier.
     * @param {?} slideId
     * @return {?}
     */
    function (slideId) { this._cycleToSelected(slideId, this._getSlideEventDirection(this.activeId, slideId)); };
    /**
     * Navigate to the next slide.
     */
    /**
     * Navigate to the next slide.
     * @return {?}
     */
    NgbCarousel.prototype.prev = /**
     * Navigate to the next slide.
     * @return {?}
     */
    function () { this._cycleToSelected(this._getPrevSlide(this.activeId), NgbSlideEventDirection.RIGHT); };
    /**
     * Navigate to the next slide.
     */
    /**
     * Navigate to the next slide.
     * @return {?}
     */
    NgbCarousel.prototype.next = /**
     * Navigate to the next slide.
     * @return {?}
     */
    function () { this._cycleToSelected(this._getNextSlide(this.activeId), NgbSlideEventDirection.LEFT); };
    /**
     * Stops the carousel from cycling through items.
     */
    /**
     * Stops the carousel from cycling through items.
     * @return {?}
     */
    NgbCarousel.prototype.pause = /**
     * Stops the carousel from cycling through items.
     * @return {?}
     */
    function () { this._stop$.next(); };
    /**
     * Restarts cycling through the carousel slides from left to right.
     */
    /**
     * Restarts cycling through the carousel slides from left to right.
     * @return {?}
     */
    NgbCarousel.prototype.cycle = /**
     * Restarts cycling through the carousel slides from left to right.
     * @return {?}
     */
    function () { this._start$.next(); };
    /**
     * @param {?} slideIdx
     * @param {?} direction
     * @return {?}
     */
    NgbCarousel.prototype._cycleToSelected = /**
     * @param {?} slideIdx
     * @param {?} direction
     * @return {?}
     */
    function (slideIdx, direction) {
        /** @type {?} */
        var selectedSlide = this._getSlideById(slideIdx);
        if (selectedSlide && selectedSlide.id !== this.activeId) {
            this.slide.emit({ prev: this.activeId, current: selectedSlide.id, direction: direction });
            this._start$.next();
            this.activeId = selectedSlide.id;
        }
        // we get here after the interval fires or any external API call like next(), prev() or select()
        this._cd.markForCheck();
    };
    /**
     * @param {?} currentActiveSlideId
     * @param {?} nextActiveSlideId
     * @return {?}
     */
    NgbCarousel.prototype._getSlideEventDirection = /**
     * @param {?} currentActiveSlideId
     * @param {?} nextActiveSlideId
     * @return {?}
     */
    function (currentActiveSlideId, nextActiveSlideId) {
        /** @type {?} */
        var currentActiveSlideIdx = this._getSlideIdxById(currentActiveSlideId);
        /** @type {?} */
        var nextActiveSlideIdx = this._getSlideIdxById(nextActiveSlideId);
        return currentActiveSlideIdx > nextActiveSlideIdx ? NgbSlideEventDirection.RIGHT : NgbSlideEventDirection.LEFT;
    };
    /**
     * @param {?} slideId
     * @return {?}
     */
    NgbCarousel.prototype._getSlideById = /**
     * @param {?} slideId
     * @return {?}
     */
    function (slideId) { return this.slides.find(function (slide) { return slide.id === slideId; }); };
    /**
     * @param {?} slideId
     * @return {?}
     */
    NgbCarousel.prototype._getSlideIdxById = /**
     * @param {?} slideId
     * @return {?}
     */
    function (slideId) {
        return this.slides.toArray().indexOf(this._getSlideById(slideId));
    };
    /**
     * @param {?} currentSlideId
     * @return {?}
     */
    NgbCarousel.prototype._getNextSlide = /**
     * @param {?} currentSlideId
     * @return {?}
     */
    function (currentSlideId) {
        /** @type {?} */
        var slideArr = this.slides.toArray();
        /** @type {?} */
        var currentSlideIdx = this._getSlideIdxById(currentSlideId);
        /** @type {?} */
        var isLastSlide = currentSlideIdx === slideArr.length - 1;
        return isLastSlide ? (this.wrap ? slideArr[0].id : slideArr[slideArr.length - 1].id) :
            slideArr[currentSlideIdx + 1].id;
    };
    /**
     * @param {?} currentSlideId
     * @return {?}
     */
    NgbCarousel.prototype._getPrevSlide = /**
     * @param {?} currentSlideId
     * @return {?}
     */
    function (currentSlideId) {
        /** @type {?} */
        var slideArr = this.slides.toArray();
        /** @type {?} */
        var currentSlideIdx = this._getSlideIdxById(currentSlideId);
        /** @type {?} */
        var isFirstSlide = currentSlideIdx === 0;
        return isFirstSlide ? (this.wrap ? slideArr[slideArr.length - 1].id : slideArr[0].id) :
            slideArr[currentSlideIdx - 1].id;
    };
    NgbCarousel.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-carousel',
                    exportAs: 'ngbCarousel',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        'class': 'carousel slide',
                        '[style.display]': '"block"',
                        'tabIndex': '0',
                        '(mouseenter)': 'pauseOnHover && pause()',
                        '(mouseleave)': 'pauseOnHover && cycle()',
                        '(keydown.arrowLeft)': 'keyboard && prev()',
                        '(keydown.arrowRight)': 'keyboard && next()'
                    },
                    template: "\n    <ol class=\"carousel-indicators\" *ngIf=\"showNavigationIndicators\">\n      <li *ngFor=\"let slide of slides\" [id]=\"slide.id\" [class.active]=\"slide.id === activeId\"\n          (click)=\"select(slide.id); pauseOnHover && pause()\"></li>\n    </ol>\n    <div class=\"carousel-inner\">\n      <div *ngFor=\"let slide of slides\" class=\"carousel-item\" [class.active]=\"slide.id === activeId\">\n        <ng-template [ngTemplateOutlet]=\"slide.tplRef\"></ng-template>\n      </div>\n    </div>\n    <a class=\"carousel-control-prev\" role=\"button\" (click)=\"prev()\" *ngIf=\"showNavigationArrows\">\n      <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\" i18n=\"@@ngb.carousel.previous\">Previous</span>\n    </a>\n    <a class=\"carousel-control-next\" role=\"button\" (click)=\"next()\" *ngIf=\"showNavigationArrows\">\n      <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\" i18n=\"@@ngb.carousel.next\">Next</span>\n    </a>\n  "
                }] }
    ];
    /** @nocollapse */
    NgbCarousel.ctorParameters = function () { return [
        { type: NgbCarouselConfig },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: NgZone },
        { type: ChangeDetectorRef }
    ]; };
    NgbCarousel.propDecorators = {
        slides: [{ type: ContentChildren, args: [NgbSlide,] }],
        activeId: [{ type: Input }],
        interval: [{ type: Input }],
        wrap: [{ type: Input }],
        keyboard: [{ type: Input }],
        pauseOnHover: [{ type: Input }],
        showNavigationArrows: [{ type: Input }],
        showNavigationIndicators: [{ type: Input }],
        slide: [{ type: Output }]
    };
    return NgbCarousel;
}());
export { NgbCarousel };
if (false) {
    /** @type {?} */
    NgbCarousel.prototype.slides;
    /** @type {?} */
    NgbCarousel.prototype._start$;
    /** @type {?} */
    NgbCarousel.prototype._stop$;
    /**
     * The active slide id.
     * @type {?}
     */
    NgbCarousel.prototype.activeId;
    /**
     * Amount of time in milliseconds before next slide is shown.
     * @type {?}
     */
    NgbCarousel.prototype.interval;
    /**
     * Whether can wrap from the last to the first slide.
     * @type {?}
     */
    NgbCarousel.prototype.wrap;
    /**
     * A flag for allowing navigation via keyboard
     * @type {?}
     */
    NgbCarousel.prototype.keyboard;
    /**
     * A flag to enable slide cycling pause/resume on mouseover.
     * \@since 2.2.0
     * @type {?}
     */
    NgbCarousel.prototype.pauseOnHover;
    /**
     * A flag to show / hide navigation arrows.
     * \@since 2.2.0
     * @type {?}
     */
    NgbCarousel.prototype.showNavigationArrows;
    /**
     * A flag to show / hide navigation indicators.
     * \@since 2.2.0
     * @type {?}
     */
    NgbCarousel.prototype.showNavigationIndicators;
    /**
     * A carousel slide event fired when the slide transition is completed.
     * See NgbSlideEvent for payload details
     * @type {?}
     */
    NgbCarousel.prototype.slide;
    /** @type {?} */
    NgbCarousel.prototype._platformId;
    /** @type {?} */
    NgbCarousel.prototype._ngZone;
    /** @type {?} */
    NgbCarousel.prototype._cd;
}
/**
 * The payload of the slide event fired when the slide transition is completed
 * @record
 */
export function NgbSlideEvent() { }
if (false) {
    /**
     * Previous slide id
     * @type {?}
     */
    NgbSlideEvent.prototype.prev;
    /**
     * New slide ids
     * @type {?}
     */
    NgbSlideEvent.prototype.current;
    /**
     * Slide event direction
     * @type {?}
     */
    NgbSlideEvent.prototype.direction;
}
/** @enum {string} */
var NgbSlideEventDirection = {
    LEFT: (/** @type {?} */ ('left')),
    RIGHT: (/** @type {?} */ ('right')),
};
export { NgbSlideEventDirection };
/** @type {?} */
export var NGB_CAROUSEL_DIRECTIVES = [NgbCarousel, NgbSlide];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcC8iLCJzb3VyY2VzIjpbImNhcm91c2VsL2Nhcm91c2VsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBR0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBR04sTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRWxELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRXBELE9BQU8sRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7SUFFN0QsTUFBTSxHQUFHLENBQUM7Ozs7QUFLZDtJQU9FLGtCQUFtQixNQUF3QjtRQUF4QixXQUFNLEdBQU4sTUFBTSxDQUFrQjs7Ozs7UUFEbEMsT0FBRSxHQUFHLGVBQWEsTUFBTSxFQUFJLENBQUM7SUFDUSxDQUFDOztnQkFQaEQsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLHVCQUF1QixFQUFDOzs7O2dCQWQ1QyxXQUFXOzs7cUJBb0JWLEtBQUs7O0lBRVIsZUFBQztDQUFBLEFBUkQsSUFRQztTQVBZLFFBQVE7Ozs7Ozs7SUFLbkIsc0JBQXNDOztJQUMxQiwwQkFBK0I7Ozs7O0FBTTdDO0lBcUZFLHFCQUNJLE1BQXlCLEVBQStCLFdBQVcsRUFBVSxPQUFlLEVBQ3BGLEdBQXNCO1FBRDBCLGdCQUFXLEdBQVgsV0FBVyxDQUFBO1FBQVUsWUFBTyxHQUFQLE9BQU8s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S0FBSzt1QkFLTCxLQUFLOzJCQUtMLEtBQUs7K0JBTUwsS0FBSzt1Q0FNTCxLQUFLOzJDQU1MLEtBQUs7d0JBTUwsTUFBTTs7SUE2R1Qsa0JBQUM7Q0FBQSxBQWhNRCxJQWdNQztTQS9KWSxXQUFXOzs7SUFFdEIsNkJBQXVEOztJQUV2RCw4QkFBc0M7O0lBQ3RDLDZCQUFxQzs7Ozs7SUFLckMsK0JBQTBCOzs7OztJQU0xQiwrQkFBMEI7Ozs7O0lBSzFCLDJCQUF1Qjs7Ozs7SUFLdkIsK0JBQTJCOzs7Ozs7SUFNM0IsbUNBQStCOzs7Ozs7SUFNL0IsMkNBQXVDOzs7Ozs7SUFNdkMsK0NBQTJDOzs7Ozs7SUFNM0MsNEJBQW9EOztJQUdyQixrQ0FBd0M7O0lBQUUsOEJBQXVCOztJQUM1RiwwQkFBOEI7Ozs7OztBQThHcEMsbUNBZUM7Ozs7OztJQVhDLDZCQUFhOzs7OztJQUtiLGdDQUFnQjs7Ozs7SUFLaEIsa0NBQWtDOzs7O0lBT2xDLE1BQU8sbUJBQUssTUFBTSxFQUFBO0lBQ2xCLE9BQVEsbUJBQUssT0FBTyxFQUFBOzs7O0FBR3RCLE1BQU0sS0FBTyx1QkFBdUIsR0FBRyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBQTEFURk9STV9JRCxcbiAgUXVlcnlMaXN0LFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNQbGF0Zm9ybUJyb3dzZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7TmdiQ2Fyb3VzZWxDb25maWd9IGZyb20gJy4vY2Fyb3VzZWwtY29uZmlnJztcblxuaW1wb3J0IHtTdWJqZWN0LCB0aW1lcn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgbWFwLCBzd2l0Y2hNYXAsIHRha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5sZXQgbmV4dElkID0gMDtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGluZGl2aWR1YWwgc2xpZGUgdG8gYmUgdXNlZCB3aXRoaW4gYSBjYXJvdXNlbC5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICduZy10ZW1wbGF0ZVtuZ2JTbGlkZV0nfSlcbmV4cG9ydCBjbGFzcyBOZ2JTbGlkZSB7XG4gIC8qKlxuICAgKiBVbmlxdWUgc2xpZGUgaWRlbnRpZmllci4gTXVzdCBiZSB1bmlxdWUgZm9yIHRoZSBlbnRpcmUgZG9jdW1lbnQgZm9yIHByb3BlciBhY2Nlc3NpYmlsaXR5IHN1cHBvcnQuXG4gICAqIFdpbGwgYmUgYXV0by1nZW5lcmF0ZWQgaWYgbm90IHByb3ZpZGVkLlxuICAgKi9cbiAgQElucHV0KCkgaWQgPSBgbmdiLXNsaWRlLSR7bmV4dElkKyt9YDtcbiAgY29uc3RydWN0b3IocHVibGljIHRwbFJlZjogVGVtcGxhdGVSZWY8YW55Pikge31cbn1cblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gZWFzaWx5IGNyZWF0ZSBjYXJvdXNlbHMgYmFzZWQgb24gQm9vdHN0cmFwJ3MgbWFya3VwLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ2ItY2Fyb3VzZWwnLFxuICBleHBvcnRBczogJ25nYkNhcm91c2VsJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnY2Fyb3VzZWwgc2xpZGUnLFxuICAgICdbc3R5bGUuZGlzcGxheV0nOiAnXCJibG9ja1wiJyxcbiAgICAndGFiSW5kZXgnOiAnMCcsXG4gICAgJyhtb3VzZWVudGVyKSc6ICdwYXVzZU9uSG92ZXIgJiYgcGF1c2UoKScsXG4gICAgJyhtb3VzZWxlYXZlKSc6ICdwYXVzZU9uSG92ZXIgJiYgY3ljbGUoKScsXG4gICAgJyhrZXlkb3duLmFycm93TGVmdCknOiAna2V5Ym9hcmQgJiYgcHJldigpJyxcbiAgICAnKGtleWRvd24uYXJyb3dSaWdodCknOiAna2V5Ym9hcmQgJiYgbmV4dCgpJ1xuICB9LFxuICB0ZW1wbGF0ZTogYFxuICAgIDxvbCBjbGFzcz1cImNhcm91c2VsLWluZGljYXRvcnNcIiAqbmdJZj1cInNob3dOYXZpZ2F0aW9uSW5kaWNhdG9yc1wiPlxuICAgICAgPGxpICpuZ0Zvcj1cImxldCBzbGlkZSBvZiBzbGlkZXNcIiBbaWRdPVwic2xpZGUuaWRcIiBbY2xhc3MuYWN0aXZlXT1cInNsaWRlLmlkID09PSBhY3RpdmVJZFwiXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdChzbGlkZS5pZCk7IHBhdXNlT25Ib3ZlciAmJiBwYXVzZSgpXCI+PC9saT5cbiAgICA8L29sPlxuICAgIDxkaXYgY2xhc3M9XCJjYXJvdXNlbC1pbm5lclwiPlxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgc2xpZGUgb2Ygc2xpZGVzXCIgY2xhc3M9XCJjYXJvdXNlbC1pdGVtXCIgW2NsYXNzLmFjdGl2ZV09XCJzbGlkZS5pZCA9PT0gYWN0aXZlSWRcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInNsaWRlLnRwbFJlZlwiPjwvbmctdGVtcGxhdGU+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8YSBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtcHJldlwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwicHJldigpXCIgKm5nSWY9XCJzaG93TmF2aWdhdGlvbkFycm93c1wiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLXByZXYtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi5jYXJvdXNlbC5wcmV2aW91c1wiPlByZXZpb3VzPC9zcGFuPlxuICAgIDwvYT5cbiAgICA8YSBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtbmV4dFwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwibmV4dCgpXCIgKm5nSWY9XCJzaG93TmF2aWdhdGlvbkFycm93c1wiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLW5leHQtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic3Itb25seVwiIGkxOG49XCJAQG5nYi5jYXJvdXNlbC5uZXh0XCI+TmV4dDwvc3Bhbj5cbiAgICA8L2E+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTmdiQ2Fyb3VzZWwgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkLFxuICAgIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgQENvbnRlbnRDaGlsZHJlbihOZ2JTbGlkZSkgc2xpZGVzOiBRdWVyeUxpc3Q8TmdiU2xpZGU+O1xuXG4gIHByaXZhdGUgX3N0YXJ0JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgX3N0b3AkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKipcbiAgICogVGhlIGFjdGl2ZSBzbGlkZSBpZC5cbiAgICovXG4gIEBJbnB1dCgpIGFjdGl2ZUlkOiBzdHJpbmc7XG5cblxuICAvKipcbiAgICogQW1vdW50IG9mIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGJlZm9yZSBuZXh0IHNsaWRlIGlzIHNob3duLlxuICAgKi9cbiAgQElucHV0KCkgaW50ZXJ2YWw6IG51bWJlcjtcblxuICAvKipcbiAgICogV2hldGhlciBjYW4gd3JhcCBmcm9tIHRoZSBsYXN0IHRvIHRoZSBmaXJzdCBzbGlkZS5cbiAgICovXG4gIEBJbnB1dCgpIHdyYXA6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgZmxhZyBmb3IgYWxsb3dpbmcgbmF2aWdhdGlvbiB2aWEga2V5Ym9hcmRcbiAgICovXG4gIEBJbnB1dCgpIGtleWJvYXJkOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBIGZsYWcgdG8gZW5hYmxlIHNsaWRlIGN5Y2xpbmcgcGF1c2UvcmVzdW1lIG9uIG1vdXNlb3Zlci5cbiAgICogQHNpbmNlIDIuMi4wXG4gICAqL1xuICBASW5wdXQoKSBwYXVzZU9uSG92ZXI6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgZmxhZyB0byBzaG93IC8gaGlkZSBuYXZpZ2F0aW9uIGFycm93cy5cbiAgICogQHNpbmNlIDIuMi4wXG4gICAqL1xuICBASW5wdXQoKSBzaG93TmF2aWdhdGlvbkFycm93czogYm9vbGVhbjtcblxuICAvKipcbiAgICogQSBmbGFnIHRvIHNob3cgLyBoaWRlIG5hdmlnYXRpb24gaW5kaWNhdG9ycy5cbiAgICogQHNpbmNlIDIuMi4wXG4gICAqL1xuICBASW5wdXQoKSBzaG93TmF2aWdhdGlvbkluZGljYXRvcnM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEEgY2Fyb3VzZWwgc2xpZGUgZXZlbnQgZmlyZWQgd2hlbiB0aGUgc2xpZGUgdHJhbnNpdGlvbiBpcyBjb21wbGV0ZWQuXG4gICAqIFNlZSBOZ2JTbGlkZUV2ZW50IGZvciBwYXlsb2FkIGRldGFpbHNcbiAgICovXG4gIEBPdXRwdXQoKSBzbGlkZSA9IG5ldyBFdmVudEVtaXR0ZXI8TmdiU2xpZGVFdmVudD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIGNvbmZpZzogTmdiQ2Fyb3VzZWxDb25maWcsIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgX3BsYXRmb3JtSWQsIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgICAgcHJpdmF0ZSBfY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5pbnRlcnZhbCA9IGNvbmZpZy5pbnRlcnZhbDtcbiAgICB0aGlzLndyYXAgPSBjb25maWcud3JhcDtcbiAgICB0aGlzLmtleWJvYXJkID0gY29uZmlnLmtleWJvYXJkO1xuICAgIHRoaXMucGF1c2VPbkhvdmVyID0gY29uZmlnLnBhdXNlT25Ib3ZlcjtcbiAgICB0aGlzLnNob3dOYXZpZ2F0aW9uQXJyb3dzID0gY29uZmlnLnNob3dOYXZpZ2F0aW9uQXJyb3dzO1xuICAgIHRoaXMuc2hvd05hdmlnYXRpb25JbmRpY2F0b3JzID0gY29uZmlnLnNob3dOYXZpZ2F0aW9uSW5kaWNhdG9ycztcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAvLyBzZXRJbnRlcnZhbCgpIGRvZXNuJ3QgcGxheSB3ZWxsIHdpdGggU1NSIGFuZCBwcm90cmFjdG9yLFxuICAgIC8vIHNvIHdlIHNob3VsZCBydW4gaXQgaW4gdGhlIGJyb3dzZXIgYW5kIG91dHNpZGUgQW5ndWxhclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLl9wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgdGhpcy5fc3RhcnQkXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKCkgPT4gdGhpcy5pbnRlcnZhbCksIGZpbHRlcihpbnRlcnZhbCA9PiBpbnRlcnZhbCA+IDAgJiYgdGhpcy5zbGlkZXMubGVuZ3RoID4gMCksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKGludGVydmFsID0+IHRpbWVyKGludGVydmFsKS5waXBlKHRha2VVbnRpbCh0aGlzLl9zdG9wJCkpKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fbmdab25lLnJ1bigoKSA9PiB0aGlzLm5leHQoKSkpO1xuXG4gICAgICAgIHRoaXMuX3N0YXJ0JC5uZXh0KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgbGV0IGFjdGl2ZVNsaWRlID0gdGhpcy5fZ2V0U2xpZGVCeUlkKHRoaXMuYWN0aXZlSWQpO1xuICAgIHRoaXMuYWN0aXZlSWQgPSBhY3RpdmVTbGlkZSA/IGFjdGl2ZVNsaWRlLmlkIDogKHRoaXMuc2xpZGVzLmxlbmd0aCA/IHRoaXMuc2xpZGVzLmZpcnN0LmlkIDogbnVsbCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHsgdGhpcy5fc3RvcCQubmV4dCgpOyB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xuICAgIGlmICgnaW50ZXJ2YWwnIGluIGNoYW5nZXMgJiYgIWNoYW5nZXNbJ2ludGVydmFsJ10uaXNGaXJzdENoYW5nZSgpKSB7XG4gICAgICB0aGlzLl9zdGFydCQubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZSB0byBhIHNsaWRlIHdpdGggdGhlIHNwZWNpZmllZCBpZGVudGlmaWVyLlxuICAgKi9cbiAgc2VsZWN0KHNsaWRlSWQ6IHN0cmluZykgeyB0aGlzLl9jeWNsZVRvU2VsZWN0ZWQoc2xpZGVJZCwgdGhpcy5fZ2V0U2xpZGVFdmVudERpcmVjdGlvbih0aGlzLmFjdGl2ZUlkLCBzbGlkZUlkKSk7IH1cblxuICAvKipcbiAgICogTmF2aWdhdGUgdG8gdGhlIG5leHQgc2xpZGUuXG4gICAqL1xuICBwcmV2KCkgeyB0aGlzLl9jeWNsZVRvU2VsZWN0ZWQodGhpcy5fZ2V0UHJldlNsaWRlKHRoaXMuYWN0aXZlSWQpLCBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uLlJJR0hUKTsgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZSB0byB0aGUgbmV4dCBzbGlkZS5cbiAgICovXG4gIG5leHQoKSB7IHRoaXMuX2N5Y2xlVG9TZWxlY3RlZCh0aGlzLl9nZXROZXh0U2xpZGUodGhpcy5hY3RpdmVJZCksIE5nYlNsaWRlRXZlbnREaXJlY3Rpb24uTEVGVCk7IH1cblxuICAvKipcbiAgICogU3RvcHMgdGhlIGNhcm91c2VsIGZyb20gY3ljbGluZyB0aHJvdWdoIGl0ZW1zLlxuICAgKi9cbiAgcGF1c2UoKSB7IHRoaXMuX3N0b3AkLm5leHQoKTsgfVxuXG4gIC8qKlxuICAgKiBSZXN0YXJ0cyBjeWNsaW5nIHRocm91Z2ggdGhlIGNhcm91c2VsIHNsaWRlcyBmcm9tIGxlZnQgdG8gcmlnaHQuXG4gICAqL1xuICBjeWNsZSgpIHsgdGhpcy5fc3RhcnQkLm5leHQoKTsgfVxuXG4gIHByaXZhdGUgX2N5Y2xlVG9TZWxlY3RlZChzbGlkZUlkeDogc3RyaW5nLCBkaXJlY3Rpb246IE5nYlNsaWRlRXZlbnREaXJlY3Rpb24pIHtcbiAgICBsZXQgc2VsZWN0ZWRTbGlkZSA9IHRoaXMuX2dldFNsaWRlQnlJZChzbGlkZUlkeCk7XG4gICAgaWYgKHNlbGVjdGVkU2xpZGUgJiYgc2VsZWN0ZWRTbGlkZS5pZCAhPT0gdGhpcy5hY3RpdmVJZCkge1xuICAgICAgdGhpcy5zbGlkZS5lbWl0KHtwcmV2OiB0aGlzLmFjdGl2ZUlkLCBjdXJyZW50OiBzZWxlY3RlZFNsaWRlLmlkLCBkaXJlY3Rpb246IGRpcmVjdGlvbn0pO1xuICAgICAgdGhpcy5fc3RhcnQkLm5leHQoKTtcbiAgICAgIHRoaXMuYWN0aXZlSWQgPSBzZWxlY3RlZFNsaWRlLmlkO1xuICAgIH1cblxuICAgIC8vIHdlIGdldCBoZXJlIGFmdGVyIHRoZSBpbnRlcnZhbCBmaXJlcyBvciBhbnkgZXh0ZXJuYWwgQVBJIGNhbGwgbGlrZSBuZXh0KCksIHByZXYoKSBvciBzZWxlY3QoKVxuICAgIHRoaXMuX2NkLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0U2xpZGVFdmVudERpcmVjdGlvbihjdXJyZW50QWN0aXZlU2xpZGVJZDogc3RyaW5nLCBuZXh0QWN0aXZlU2xpZGVJZDogc3RyaW5nKTogTmdiU2xpZGVFdmVudERpcmVjdGlvbiB7XG4gICAgY29uc3QgY3VycmVudEFjdGl2ZVNsaWRlSWR4ID0gdGhpcy5fZ2V0U2xpZGVJZHhCeUlkKGN1cnJlbnRBY3RpdmVTbGlkZUlkKTtcbiAgICBjb25zdCBuZXh0QWN0aXZlU2xpZGVJZHggPSB0aGlzLl9nZXRTbGlkZUlkeEJ5SWQobmV4dEFjdGl2ZVNsaWRlSWQpO1xuXG4gICAgcmV0dXJuIGN1cnJlbnRBY3RpdmVTbGlkZUlkeCA+IG5leHRBY3RpdmVTbGlkZUlkeCA/IE5nYlNsaWRlRXZlbnREaXJlY3Rpb24uUklHSFQgOiBOZ2JTbGlkZUV2ZW50RGlyZWN0aW9uLkxFRlQ7XG4gIH1cblxuICBwcml2YXRlIF9nZXRTbGlkZUJ5SWQoc2xpZGVJZDogc3RyaW5nKTogTmdiU2xpZGUgeyByZXR1cm4gdGhpcy5zbGlkZXMuZmluZChzbGlkZSA9PiBzbGlkZS5pZCA9PT0gc2xpZGVJZCk7IH1cblxuICBwcml2YXRlIF9nZXRTbGlkZUlkeEJ5SWQoc2xpZGVJZDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zbGlkZXMudG9BcnJheSgpLmluZGV4T2YodGhpcy5fZ2V0U2xpZGVCeUlkKHNsaWRlSWQpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE5leHRTbGlkZShjdXJyZW50U2xpZGVJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBzbGlkZUFyciA9IHRoaXMuc2xpZGVzLnRvQXJyYXkoKTtcbiAgICBjb25zdCBjdXJyZW50U2xpZGVJZHggPSB0aGlzLl9nZXRTbGlkZUlkeEJ5SWQoY3VycmVudFNsaWRlSWQpO1xuICAgIGNvbnN0IGlzTGFzdFNsaWRlID0gY3VycmVudFNsaWRlSWR4ID09PSBzbGlkZUFyci5sZW5ndGggLSAxO1xuXG4gICAgcmV0dXJuIGlzTGFzdFNsaWRlID8gKHRoaXMud3JhcCA/IHNsaWRlQXJyWzBdLmlkIDogc2xpZGVBcnJbc2xpZGVBcnIubGVuZ3RoIC0gMV0uaWQpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZUFycltjdXJyZW50U2xpZGVJZHggKyAxXS5pZDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFByZXZTbGlkZShjdXJyZW50U2xpZGVJZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBzbGlkZUFyciA9IHRoaXMuc2xpZGVzLnRvQXJyYXkoKTtcbiAgICBjb25zdCBjdXJyZW50U2xpZGVJZHggPSB0aGlzLl9nZXRTbGlkZUlkeEJ5SWQoY3VycmVudFNsaWRlSWQpO1xuICAgIGNvbnN0IGlzRmlyc3RTbGlkZSA9IGN1cnJlbnRTbGlkZUlkeCA9PT0gMDtcblxuICAgIHJldHVybiBpc0ZpcnN0U2xpZGUgPyAodGhpcy53cmFwID8gc2xpZGVBcnJbc2xpZGVBcnIubGVuZ3RoIC0gMV0uaWQgOiBzbGlkZUFyclswXS5pZCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZUFycltjdXJyZW50U2xpZGVJZHggLSAxXS5pZDtcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBwYXlsb2FkIG9mIHRoZSBzbGlkZSBldmVudCBmaXJlZCB3aGVuIHRoZSBzbGlkZSB0cmFuc2l0aW9uIGlzIGNvbXBsZXRlZFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5nYlNsaWRlRXZlbnQge1xuICAvKipcbiAgICogUHJldmlvdXMgc2xpZGUgaWRcbiAgICovXG4gIHByZXY6IHN0cmluZztcblxuICAvKipcbiAgICogTmV3IHNsaWRlIGlkc1xuICAgKi9cbiAgY3VycmVudDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBTbGlkZSBldmVudCBkaXJlY3Rpb25cbiAgICovXG4gIGRpcmVjdGlvbjogTmdiU2xpZGVFdmVudERpcmVjdGlvbjtcbn1cblxuLyoqXG4gKiBFbnVtIHRvIGRlZmluZSB0aGUgY2Fyb3VzZWwgc2xpZGUgZXZlbnQgZGlyZWN0aW9uXG4gKi9cbmV4cG9ydCBlbnVtIE5nYlNsaWRlRXZlbnREaXJlY3Rpb24ge1xuICBMRUZUID0gPGFueT4nbGVmdCcsXG4gIFJJR0hUID0gPGFueT4ncmlnaHQnXG59XG5cbmV4cG9ydCBjb25zdCBOR0JfQ0FST1VTRUxfRElSRUNUSVZFUyA9IFtOZ2JDYXJvdXNlbCwgTmdiU2xpZGVdO1xuIl19