# Customization

--------------------------------

Material for MkDocs link: <https://squidfunk.github.io/mkdocs-material/customization/>

Local article [Customization.](../_articles/Customization - Material for MkDocs.htm) 


## Custom colors

Material for MkDocs implements colors using CSS variables (custom properties). If you want to customize the colors beyond the palette (e.g. to use your brand-specific colors), you can add an additional style sheet and tweak the values of the CSS variables.

First, set the primary or accent values in mkdocs.yml to custom, to signal to the theme that you want to define custom colors, e.g., when you want to override the primary color:

```
theme:
  palette:
    primary: custom
```    

Let's say you're  YouTube, and want to set the primary color to your brand's palette. Just add:

``` title="mkdocs.yml"
extra_css:
  - stylesheets/extra.css
```  

``` title="docs/stylesheets/extra.css"
:root {
  --md-primary-fg-color:        #EE0F0F;
  --md-primary-fg-color--light: #ECB7B7;
  --md-primary-fg-color--dark:  #90030C;
}
```

See the file containing the [color definitions](https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/main/_colors.scss) for a list of all CSS variables.

## Custom color schemes

Besides overriding specific colors, you can create your own, named color scheme by wrapping the definitions in a `[data-md-color-scheme="..."]` [attribute selector](https://www.w3.org/TR/selectors-4/#attribute-selectors), which you can then set via mkdocs.yml as described in the [color schemes](https://squidfunk.github.io/mkdocs-material/setup/changing-the-colors/#color-scheme) section:


 ``` title="docs/stylesheets/extra.css"
 [data-md-color-scheme="youtube"] {
  --md-primary-fg-color:        #EE0F0F;
  --md-primary-fg-color--light: #ECB7B7;
  --md-primary-fg-color--dark:  #90030C;
}
```

Additionally, the slate color scheme defines all of it's colors via hsla color functions and deduces its colors from the --md-hue CSS variable. You can tune the slate theme with:

``` title="extra.css"
[data-md-color-scheme="slate"] {
  --md-hue: 210; 
}
```


