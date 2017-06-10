# SelectOptgroup

SelectOptgroup is a styleable, searchable drop down select box for Dojo which includes grouping of options (similar to html `<select>` element with `<optgroup>`).

SelectOptgroup extends [dijit.form.Select](http://dojotoolkit.org/reference-guide/1.10/dijit/form/Select.html) maintaining its API and functionalities.


---

### Great! So how do I use it?
- For npm users, add this dependecy in your package.json: `"dependencies": { "dijit-select-optgroup": "^1.0.0" }` and run `npm install`.
- For Bower users, add this dependecy in your bower.json: `"dependencies": { "dijit-select-optgroup": "^1.0.0" }` and run `bower install`.

### How do I run the example?
- First install all dependencies folder using: `npm install`.
- Now runs your local server: `gulp connect`.
- Run the example: `gulp example`.

---
### API
SelectOptgroup uses the same API for [dijit.form.Select](http://dojotoolkit.org/api/?qs=1.10/dijit/form/Select), the only difference is the `optgroup` property which can be passed in the object for `options` to differenciate the item in the list.


#### Example

```javascript
var select = new SelectOptgroup({
    name: 'select',
    options: [
    {
        label: 'Optgroup item',
        value: '',
        optgroup: true // mark the item as optgroup
    },
    {
        label: 'option item',
        value: 'angular '// mark the as an option
    },
 
    {
        label: '', // both empty strings add a separator
        value: ''
    },
    {
        label: '<div class="SelectOptgroup__nested"><span class="select__icon">Grunt</span></div>', // html is allowed
        value: 'grunt'
    }
    ]
}, 'select');
```
---

### Customization
You can customize the defaults layout for the entire componenet using CSS.

SelectOptgroup add by default two CSS `SelectOptgroup__flattened` and `SelectOptgroup__nested`.

`SelectOptgroup__flattened`: for menu item marked as optgroup.

`SelectOptgroup__nested`: for menu item marked as option.


```css

    .SelectOptgroup__flattened .dijitMenuItemLabel {
        /* style menu item as optgroup*/
        padding-left: 0 !important;
    }
    .SelectOptgroup__nested .dijitMenuItemLabel {
        /* style menu item as option*/
        padding-left: 25px !important;
    }

```

 [Working example.](example.html)
