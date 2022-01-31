// import { Directive, ElementRef, Input, Output, EventEmitter, NgZone } from '@angular/core';
// import { debounce } from 'rxjs/operators';
// import { timer } from 'rxjs/observable/timer';
// import { fromEvent } from 'rxjs/observable/fromEvent';

// @Directive({
// 	selector: 'input[q-grid-input]'
// })
// export class InputDirective {
// 	@Output('q-grid-input') public commit = new EventEmitter<any>();
// 	@Input('q-grid-input-timeout') public timeout = 300;

// 	constructor(private element: ElementRef, private zone: NgZone) {
// 		fromEvent(this.element.nativeElement, 'keydown')
// 			.subscribe((event: any) => {
// 				event.stopPropagation();
// 			});

// 		zone.runOutsideAngular(() => {
// 			fromEvent(this.element.nativeElement, 'input')
// 				.pipe(debounce(() => timer(this.timeout)))
// 				.subscribe((event: any) => {
// 					event.stopPropagation();
// 					zone.runTask(() => this.commit.emit({
// 						value: element.nativeElement.value
// 					}));
// 				});
// 		});
// 	}
// }
