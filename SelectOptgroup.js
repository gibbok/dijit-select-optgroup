define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/form/Select',
    'dijit/MenuSeparator',
    'dijit/MenuItem',
    'dojo/domReady!'
], function (
    declare,
    lang,
    Select,
    MenuSeparator,
    MenuItem,
    ) {
        return declare(Select, {
            class: 'SelectOptgroup',
            postCreate: function () {
                this.inherited(arguments);

                this._getMenuItemForOption = function (option) {
                    if (!option.value && !option.label) {
                        return new MenuSeparator({ ownerDocument: this.ownerDocument });
                    } else {
                        var click = lang.hitch(this, "_setValueAttr", option);
                        var item = new MenuItem({
                            option: option,
                            label: (this.labelType === 'text' ? (option.label || '').toString()
                                .replace(/&/g, '&amp;').replace(/</g, '&lt;') :
                                option.label) || this.emptyLabel,
                            onClick: click,
                            ownerDocument: this.ownerDocument,
                            dir: this.dir,
                            textDir: this.textDir,
                            disabled: (option.disabled || option.group) || false
                        });
                        item.focusNode.setAttribute("role", "option");
                        return item;
                    }
                };

                this.dropDown._onUpArrow = function () {
                    this.focusPrev()
                }.bind(this.dropDown);

                this.dropDown._onDownArrow = function () {
                    this.focusNext()
                }.bind(this.dropDown);

                this.dropDown.focusNext = function () {
                    var focusNext = function () {
                        var next = this._getNextFocusableChild(this.focusedChild, 1);
                        this.focusChild(next);
                        if (next.option.group) {
                            focusNext();
                        }
                    }.bind(this);
                    focusNext();
                }.bind(this.dropDown);

                this.dropDown.focusPrev = function () {
                    var focusPrev = function () {
                        var prev = this._getNextFocusableChild(this.focusedChild, -1);
                        this.focusChild(prev);
                        if (prev.option.group) {
                            focusPrev();
                        }
                    }.bind(this);
                    focusPrev();
                }.bind(this.dropDown);

                this.dropDown.onItemHover = function (item) {
                    if (item.option.group) {
                        item._set('hovering', false);
                        return;
                    }

                    if (this.activated) {
                        this.set('selected', item);
                        if (item.popup && !item.disabled && !this.hover_timer) {
                            this.hover_timer = this.defer(function () {
                                this._openItemPopup(item);
                            }, this.popupDelay);
                        }
                    } else if (this.passivePopupDelay < Infinity) {
                        if (this.passive_hover_timer) {
                            this.passive_hover_timer.remove();
                        }
                        this.passive_hover_timer = this.defer(function () {
                            this.onItemClick(item, {
                                type: 'click'
                            });
                        }, this.passivePopupDelay);
                    }

                    this._hoveredChild = item;

                    item._set('hovering', true);
                }.bind(this.dropDown);

                this.dropDown._onItemFocus = function (item) {
                    if (item.option.group) {
                        return;
                    }
                    if (this._hoveredChild && this._hoveredChild != item) {
                        this.onItemUnhover(this._hoveredChild);
                    }
                    this.set('selected', item);
                }.bind(this.dropDown);
            }
        });
    });