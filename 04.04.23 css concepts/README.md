# Some CSS concepts:

## accessibility:

- The importance of accessibility 
- What`s a screen reader?
- Google Lighthouse
- Contrast calculator [link](https://webaim.org/resources/contrastchecker/)

## Cascade, specificity, and inheritance:

- [mdn](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance)
- [css specificity calculator](https://polypane.app/css-specificity-calculator/#selector=)
- **Cascade:**

if we have conflicting css rules, like:

```css
div {
    color: red;
}

div {
    color: blue;
}
```

divs will be colored blue because it came last in our css, that's what we call cascading and that's why it was called CSS = Cascading Style Sheet

- **Specificity:**

if we have a div like:

```html
<div id="test-id" class="test-class">
    hello world
</div>
```

and we have conflicting css rules, like:

```css
#test-id {
    color: red;
}

.test-class {
    color: blue;
}
div {
    color: green;
}
```
our div will be colored red because IDs are more specific than classes, and classes are more specific than elements, specificity is also stronger than Cascade.
if we have conflicting css rules that have the same specificity, then the one that was mentioned last will win because of cascading.

- **Inheritance:**

some CSS property values set on parent elements are inherited by their child elements, and some aren't.

For example, if you set a color and font-family on an element, every element inside it will also be styled with that color and font, unless you've applied different color and font values directly to them.

example:

```html
<div>
    hello world
    <p> hi </p>
</div>
```

in css:

```css
div {
    color: blue;
}
```

the content of the `<p>` element will also be colored blue.
