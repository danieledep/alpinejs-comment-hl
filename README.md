# alpinejs-comment-hl

Add Javascript syntax highlighting for [Alpine JS](https://alpinejs.dev/) `x-` attributes by adding a comment

```html
  x-data="{
    // javascript
    open: false
  }"
```

It also adds normal greyed-out comments inside the `x-` attributes that don't trigger the Javascript syntax highlighting.

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

## Supported Files

- Html
- Jinja
- Liquid
- Nunjucks
- Php
- Twig

## Credit

This is a fork of [Sperovita/alpinejs-syntax-highlight](https://github.com/Sperovita/alpinejs-syntax-highlight)

Based off of textmate syntaxes from [Vetur](https://github.com/vuejs/vetur)
