import { AppError } from '../infrastructure/error';
import { jobLine } from '../services/job.line';
import { PathService } from '../path/path.service';

export class ScrollService {
    constructor(model, table, bag, view) {
        this.model = model;
        this.table = table;
        this.bag = bag;
        this.view = view;
        this.job = jobLine(0);
        this.interval = null;
        this.startCell = null;
        this.mouseEvent = null; 

        const pathFinder = new PathService(bag.body);
        model.scrollChanged.watch(e => {
            if (this.interval) {              
                const path = this.getPath(this.mouseEvent);
                const td = pathFinder.cell(path);

                this.navigate(td);
                this.view.selection.selectRange(this.startCell, td, 'body');
            }
		});
    }

    canScroll(e) {
        const rect = this.rect;
        const offset = this.offset;

        const mouseOnTopSide = e.clientY < (rect.top + offset);
        const mouseOnBottomSide = e.clientY > (rect.bottom - offset);
        const mouseOnLeftSide = e.clientX < (rect.left + offset);
        const mouseOnRightSide = e.clientX > (rect.right - offset);

        return mouseOnTopSide || mouseOnBottomSide || mouseOnLeftSide || mouseOnRightSide;
    }

    start(e, startCell) {
        this.mouseEvent = e;
        this.startCell = startCell; 

        if (this.interval) {
            if (!this.canScroll(e)) {
                this.clearInterval();
                return;
            }
        }

        const direction = this.onEdgeOf(e);
        if (direction && !this.interval) {
            this.job(() => {
                const interval = this.scroll(direction);
                this.interval = interval();
            })
        }
    }

    scroll(direction) {
        const { scroll } = this.model;
        const scrollState = scroll();
        const { velocity }  = scrollState;
        const scrolledToEnd = () => this.isScrolledToEnd(direction);

        return () => setInterval(() => {
            if (!scrolledToEnd()) {
                switch (direction) {
                    case 'right':
                    case 'bottom': {
                        const course = direction === 'bottom' ? 'top' : 'left';
                        const origin = scrollState[course];
                        scroll({ [course]: origin + velocity });
                        break;
                    }
                    case 'left':
                    case 'top': {
                        const course = direction === 'top' ? 'top' : 'left';
                        const origin = scrollState[course];
                        scroll({ [course]: origin - velocity });
                        break;
                    }
                    default: {
                        throw new AppError('scroll.service', `doScroll: Wrong direction`);
                    }
                }
            }
        }, 50);
    }

    isScrolledToEnd(direction) { 
        const body = this.body;

        switch (direction) {
            case 'top': {
                return body.scrollTop === 0;
            }
            case 'bottom': {
                return body.clientHeight === body.scrollHeight - body.scrollTop;
            }
            case 'left': {
                return body.scrollLeft === 0;
            }
            case 'right': {
                return body.scrollLeft === body.scrollWidth - body.clientWidth;
            }
            default: {
                throw new AppError('scroll.service', `isScrolledToEnd: Wrong direction`);
            }
        }
    }

    onEdgeOf(e) {
        const rect = this.rect;
        const offset = this.offset;

        if (e.clientY < (rect.top + offset) &&
            e.clientX > (rect.left + offset) &&
            e.clientX < (rect.right - offset)) {
            return 'top';
        }

        if (e.clientY > (rect.bottom - offset) &&
            e.clientX > (rect.left + offset) &&
            e.clientX < (rect.right - offset)) {
            return 'bottom';
        }

        if (e.clientX < (rect.left + offset) &&
            e.clientY > (rect.top + offset) &&
            e.clientY < (rect.bottom - offset)) {
            return 'left';
        }

        if (e.clientX > (rect.right - offset) &&
            e.clientY > (rect.top + offset) &&
            e.clientY < (rect.bottom - offset)) {
            return 'right';
        }

        return false;
    }

    stop() {
        if(this.interval) {
            this.clearInterval();
        }
    }

    clearInterval() {
        clearInterval(this.interval);
        this.interval = null;
    }

    navigate(cell) {
		const { focus } = this.view.nav;
		if (focus.canExecute(cell)) {
			focus.execute(cell);
		}
    }
    
    getPath(e) {
		const path = [];
		let element = document.elementFromPoint(e.clientX, e.clientY);
		while (element) {
			path.push(element);
			element = element.parentElement;
		}

		return path;
    }

    get rect() {
        return this.table.view.rect(this.body);
    }

    get body() {
       return this.table.view.markup.body;
    }
    
    get offset() {
        return this.model.scroll().offset;
    }
}
