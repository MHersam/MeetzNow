# Demonstration of Docsify Markdown visualization
Docsify extends Markdown syntax to make your documents more readable. I'll showcase most of it (I hope, I didn't miss anything) here. see the raw .md file to see how the different effects are accomplished.

## Important content

!> **Time** is money, my friend!

?> _TODO_ unit test

> This is important to know

`Hello`

?> For more use cases of `docsify`, head over to the [docsify](https://docsify.js.org/#/).

## Codeblocks

```bash
docsify init ./docs
```

```html
<!-- index.html -->

<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta charset="UTF-8">
  <link rel="stylesheet" href="//unpkg.com/docsify/themes/vue.css">
</head>
<body>
  <div id="app"></div>
  <script>
    window.$docsify = {
      //...
    }
  </script>
  <script src="//unpkg.com/docsify/lib/docsify.min.js"></script>
</body>
</html>
```

```js
// Import mermaid
//  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.css">
//  <script src="//cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>

mermaid.initialize({ startOnLoad: false });

window.$docsify = {
  markdown: {
    renderer: {
      code: function(code, lang) {
        if (lang === "mermaid") {
          return (
            '<div class="mermaid">' + mermaid.render(lang, code) + "</div>"
          );
        }
        return this.origin.code.apply(this, arguments);
      }
    }
  }
}
```

## Images
### With zoom plugin {docsify-ignore}
![](https://meetznow.io/img/isw-logo.png ':size=300 Logo Title Text 1')
### Without zoom plugin {docsify-ignore}
![](https://meetznow.io/img/isw-logo.png ':no-zoom :size=300 Logo Title Text 2')
