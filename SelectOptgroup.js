/*! dijit-select-optgroup | The MIT License (MIT) | Copyright (c) 2017 GibboK */

define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/form/Select',
    'dijit/MenuSeparator',
    'MenuItemOptgroup.js',
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
			        // summary:
			        //		For the given option, return the menu item that should be used to display it.
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
                            disabled: (option.disabled || option.optgroup) || false
                        });
                        item.focusNode.setAttribute("role", "option");
                        return item;
                    }
                };

                this.dropDown._onUpArrow = function () {
                    // summary:
                    //      Called on up arrow key. Should go to the previous child in vertical container widgets like Menu.
                    this.focusPrev()
                }.bind(this.dropDown);

                this.dropDown._onDownArrow = function () {
                    // summary:
			        //		Called on down arrow key. Should go to the next child in vertical container widgets like Menu.
                    this.focusNext()
                }.bind(this.dropDown);

                this.dropDown.focusNext = function () {
                    // summary:
			        //		Focus the next child menu item and skip `optgroup` if found.
                    var focusNext = function () {
                        var next = this._getNextFocusableChild(this.focusedChild, 1);
                        this.focusChild(next);
                        if (next.option.optgroup) {
                            focusNext();
                        }
                    }.bind(this);
                    focusNext();
                }.bind(this.dropDown);

                this.dropDown.focusPrev = function () {
                    // summary:
			        //		Focus the previous child menu item and skip `optgroup` if found.
                    var focusPrev = function () {
                        var prev = this._getNextFocusableChild(this.focusedChild, -1);
                        this.focusChild(prev);
                        if (prev.option.optgroup) {
                            focusPrev();
                        }
                    }.bind(this);
                    focusPrev();
                }.bind(this.dropDown);

                this.dropDown.onItemHover = function (item) {
                    // summary:
			        //		Called when cursor is over a menu item, skip `optgroup` if found.
                    if (item.option.optgroup) {
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
                    // summary:
			        //		Called when child of this Menu gets focus from:
                    //      clicking, tabbing, being opened by a parent menu.
                    if (item.option.optgroup) {
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
