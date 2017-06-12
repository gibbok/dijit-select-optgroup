define([
    'dojo/_base/declare',
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/dom",
    'dijit/MenuItem',
], function (
    declare,
    domAttr,
    domClass,
    dom,
    MenuItem
) {
        return declare(MenuItem, {
            buildRendering: function () {
                // summary:
                //      Customize the template for rendering.
                //      Add `optgroup` and `option` CSS classes to `domNode`.
                this.inherited(arguments);
                var label = this.id + "_text";
                var cssClass = this.option.optgroup === true ? 'SelectOptgroup__flattened' : 'SelectOptgroup__nested';
                domAttr.set(this.containerNode, "id", label); // only needed for backward compat
                if (this.accelKeyNode) {
                    domAttr.set(this.accelKeyNode, "id", this.id + "_accel"); // only needed for backward compat
                }
                dom.setSelectable(this.domNode, false);
                domClass.add(this.domNode, cssClass);
            },
        });
    });
