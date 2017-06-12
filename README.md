# SelectOptgroup
SelectOptgroup is a styleable, searchable drop down select box for [Dojo Toolkit](https://dojotoolkit.org/) which includes grouping of options (similar to html `<select>` element with `<optgroup>`).

SelectOptgroup extends [dijit.form.Select](http://dojotoolkit.org/reference-guide/1.10/dijit/form/Select.html) maintaining its API and core functionalities.

[Try live example](https://gibbok.github.io/dijit-select-optgroup).

---

### Great! So how do I use it?
- For npm users, add this dependecy in your package.json: `"dependencies": { "dijit-select-optgroup": "^1.0.0" }` and run `npm install`.
- For Bower users, add this dependecy in your bower.json: `"dependencies": { "dijit-select-optgroup": "^1.0.0" }` and run `bower install`.

### How do I run the example?
- First install all dependencies using: `npm install`.
- Now run your local server: `gulp connect`.
- Open the example: `gulp example`.

---

### API
SelectOptgroup uses the same API for [dijit.form.Select](http://dojotoolkit.org/api/?qs=1.10/dijit/form/Select), the only difference is the `optgroup` property, which can be optionally passed in the objects for property `options` to differentiate the item in the list.

#### Example
```javascript
var instance = new SelectOptgroup({
    options: [
        {
            label: 'Optgroup item',
            value: '',
            optgroup: true // mark menu item as optgroup
        },
        {
            label: 'Option item',
            value: 'option '// mark menu item as option
        },
        {
            label: '', // empty strings mark menu item as separator
            value: ''
        },
        {
            label: '<div class="SelectOptgroup__nested"><span class="select__icon">Icon Text</span></div>', // html allowed in menu item
            value: 'grunt'
        }
    ]
}, 'domId');
```
---

### Customization
You can customize the default layout for the entire component using CSS.

SelectOptgroup add by default two CSS classes `SelectOptgroup__flattened` and `SelectOptgroup__nested`.

#### Example
```css
    .SelectOptgroup__flattened .dijitMenuItemLabel {
         /* style menu item as optgroup */
        padding-left: 0 !important;
    }

    .SelectOptgroup__nested .dijitMenuItemLabel {
        /* style menu item as option */
        padding-left: 25px !important;
    }
```

 [Working example available at this page.](example.html)
