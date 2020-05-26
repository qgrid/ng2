import { When } from 'cucumber';
import { element, by, browser } from 'protractor';

When('I drag n drop row', async () => dragNDropRow());

async function dragNDropRow() {
    await browser.sleep(1000);
    let rows = element.all(by.tagName(`tbody`))
        .get(0)
        .all(by.css(`tr[q-grid-core-source=body] div.q-grid-can-drag`));

    doDnd(rows.get(0), rows.get(3));
}

function doDnd(dragElement, dropElement) {
    // Next comment contains code hidden in CUSTOM_JS_SCRIPT variable
    // Main purpose: drag-n-drop realization 
    // Because native protractor methods aren't working
    // In case of fix replace by one of next 2:
    // await browser.actions()
    //     .dragAndDrop(dragElement.getWebElement(), dropElement.getWebElement())
    //     .perform();
    // // or
    // await browser.actions()
    //     .mouseDown(dragElement.getWebElement())
    //     .mouseMove(dropElement.getWebElement())
    //     .mouseUp(dropElement.getWebElement())
    //     .perform();

    // function e(e, t, n, i) {
    //     var r = a.createEvent("DragEvent");
    //     r.initMouseEvent(t, !0, !0, o, 0, 0, 0, c, g, !1, !1, !1, !1, 0, null),
    //         Object.defineProperty(r, "dataTransfer",
    //             {
    //                 get: function () { return d }
    //             }),
    //         e.dispatchEvent(r),
    //         o.setTimeout(i, n)
    // }
    // var t = arguments[0],
    //     n = arguments[1],
    //     i = arguments[2] || 0,
    //     r = arguments[3] || 0;
    // var a = t.ownerDocument,
    //     o = a.defaultView,
    //     l = t.getBoundingClientRect(),
    //     u = n ? n.getBoundingClientRect() : l,
    //     c = l.left + (l.width >> 1),
    //     g = l.top + (l.height >> 1),
    //     s = u.left + (u.width >> 1) + i, f = u.top + (u.height >> 1) + r,
    //     d = Object.create(Object.prototype, {
    //         _items: { value: {} },
    //         effectAllowed: { value: "all", writable: !0 },
    //         dropEffect: { value: "move", writable: !0 },
    //         files: { get: function () { return this._items.Files } },
    //         types: { get: function () { return Object.keys(this._items) } },
    //         setData: { value: function (e, t) { this._items[e] = t } },
    //         getData: { value: function (e) { return this._items[e] } },
    //         clearData: { value: function (e) { delete this._items[e] } },
    //         setDragImage: { value: function (e) { } }
    //     });
    // if (n = a.elementFromPoint(s, f), !n) throw new Error("The target element is not interactable and need to be scrolled into the view.");
    // u = n.getBoundingClientRect(),
    //     e(t, "dragstart", 101, function () {
    //         var i = n.getBoundingClientRect();
    //         c = i.left + s - u.left,
    //             g = i.top + f - u.top,
    //             e(n, "dragenter", 1, function () {
    //                 e(n, "dragover", 101, function () {
    //                     n = a.elementFromPoint(c, g),
    //                         e(n, "drop", 1, function () { e(t, "dragend", 1) })
    //                 })
    //             })
    //     })

    const CUSTOM_JS_SCRIPT = 'function e(e,t,n,i){var r=a.createEvent("DragEvent");r.initMouseEvent(t,!0,!0,o,0,0,0,c,g,!1,!1,!1,!1,0,null),Object.defineProperty(r,"dataTransfer",{get:function(){return d}}),e.dispatchEvent(r),o.setTimeout(i,n)}var t=arguments[0],n=arguments[1],i=arguments[2]||0,r=arguments[3]||0;var a=t.ownerDocument,o=a.defaultView,l=t.getBoundingClientRect(),u=n?n.getBoundingClientRect():l,c=l.left+(l.width>>1),g=l.top+(l.height>>1),s=u.left+(u.width>>1)+i,f=u.top+(u.height>>1)+r,d=Object.create(Object.prototype,{_items:{value:{}},effectAllowed:{value:"all",writable:!0},dropEffect:{value:"move",writable:!0},files:{get:function(){return this._items.Files}},types:{get:function(){return Object.keys(this._items)}},setData:{value:function(e,t){this._items[e]=t}},getData:{value:function(e){return this._items[e]}},clearData:{value:function(e){delete this._items[e]}},setDragImage:{value:function(e){}}});if(n=a.elementFromPoint(s,f),!n)throw new Error("The target element is not interactable and need to be scrolled into the view.");u=n.getBoundingClientRect(),e(t,"dragstart",101,function(){var i=n.getBoundingClientRect();c=i.left+s-u.left,g=i.top+f-u.top,e(n,"dragenter",1,function(){e(n,"dragover",101,function(){n=a.elementFromPoint(c,g),e(n,"drop",1,function(){e(t,"dragend",1)})})})})';

    browser.executeScript(CUSTOM_JS_SCRIPT, dragElement.getWebElement(), dropElement.getWebElement());
}