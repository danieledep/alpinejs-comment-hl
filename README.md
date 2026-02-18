# alpinejs-comment-hl

Add Javascript syntax highlighting for [Alpine JS](https://alpinejs.dev/) `x-` attributes by adding a comment

```html
  x-data="{
    // javascript
    open: false
  }"
```

It also adds normal greyed-out comments inside the `x-` attributes.

```html
  x-data="{
    // just a grey comment
    open: false
  }"
```

## Supported comments

```js
// js
// javascript
// MARK: js
// MARK: javascript
// #region js
// #region javascript
/* js */
/* javascript */
/* MARK: js */
/* MARK: javascript */
/* #region js */
/* #region javascript */
```

> ⚠️ **Section headers don't show in the minimap**   
> Vscode doesn't support yet section headers triggered in embedded languages.

## Component linking

When you use an external Alpine component via `x-data`, the extension creates a clickable link on the component name. Cmd+click (or Ctrl+click) navigates directly to the component file.

```html
<div x-data="myComponent()">
```

The extension searches the workspace for a matching `.js` or `.ts` file, supporting both camelCase (`myComponent.js`) and kebab-case (`my-component.js`) filenames.

## Supported Files

- Html
- Blade
- Jinja
- Liquid
- Nunjucks
- Php
- Twig

## Credit

This started as a fork of [Sperovita/alpinejs-syntax-highlight](https://github.com/Sperovita/alpinejs-syntax-highlight)

Based off of textmate syntaxes from [Vetur](https://github.com/vuejs/vetur)
