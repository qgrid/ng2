import { AppError } from '../infrastructure/error';
import { jobLine } from '../services/job.line';
import { PathService } from '../path/path.service';

export class ScrollService {
    constructor(model, table, bag, view) {
        this.model = model;
        this.table = table;
        this.bag = bag;
        this.view = view;
        this.interval = null;
        this.rect = null;
        this.body = null;
        this.job = jobLine(0);
        this.startCell = null;
        this.mousePosition = null; 

        const pathFinder = new PathService(bag.body);
        model.scrollChanged.watch(e => {
            if (this.interval) {              
                const path = this.getPath(this.mousePosition);
                const td = pathFinder.cell(path);

                this.navigate(td);
                this.view.selection.selectRange(this.startCell, td, 'body');
            }
		});
    }

    canScroll(e) {
        const table = this.rect;
        const offset = this.offset;

        return !(e.clientY < (table.bottom - offset) &&
            e.clientY > (table.top + offset) &&
            e.clientX > (table.left + offset) &&
            e.clientX < (table.right - offset))
    }

    scroll(e, startCell) {
        this.mousePosition = e;
        this.startCell = startCell; 

        if (!this.body) {
            this.invalidate();
        }

        if (this.interval) {
            if (!this.canScroll(e)) {
                this.clearInterval();
                return;
            }
        }

        const direction = this.onEdgeOf(e);
        if (direction && !this.interval) {
            this.job(() => {
                const interval = this.doScroll(direction);
                this.interval = interval();
            })
        }

    }

    doScroll(direction) {
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
        const table = this.rect;
        const offset = this.offset;

        if (e.clientY < (table.top + offset) &&
            e.clientX > (table.left + offset) &&
            e.clientX < (table.right - offset)) {
            return 'top';
        }

        if (e.clientY > (table.bottom - offset) &&
            e.clientX > (table.left + offset) &&
            e.clientX < (table.right - offset)) {
            return 'bottom';
        }

        if (e.clientX < (table.left + offset) &&
            e.clientY > (table.top + offset) &&
            e.clientY < (table.bottom - offset)) {
            return 'left';
        }

        if (e.clientX > (table.right - offset) &&
            e.clientY > (table.top + offset) &&
            e.clientY < (table.bottom - offset)) {
            return 'right';
        }

        return false;
    }

    invalidate() {
        const { view } = this.table;

        this.body = view.markup.body;
        this.rect = view.rect(this.body);
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

    get offset() {
        return this.model.scroll().offset;
    }
}
