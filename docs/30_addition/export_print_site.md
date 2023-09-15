# Plugin print-site

Source link: Documentation mkdocs-print-site-plugin <https://timvink.github.io/mkdocs-print-site-plugin/print_page.html#>

Local article: [Print Site](../_articles/Print Site - Documentation mkdocs-print-site-plugin.htm)


**Installation**

Install the package with pip:

    pip install mkdocs-print-site-plugin

Enable the plugin in your mkdocs.yml as **last** plugin:

    plugins:
        ...
        - print-site:
            add_to_navigation: true # Пункт "Распечатать PDF" в меню, см. след. парам. 
            print_page_title: 'Распечатать PDF' # Название пункта, см. пред. парам.
            add_print_site_banner: false # Выключает ненужный:) баннер на странице печати
            add_table_of_contents: true # Включает отображение содержания
            toc_title: 'Содержание' # Название раздела с содержанием
            toc_depth: 6 # Количество уровней заголовков в содержании
            add_full_urls: false # Отображение адресов ссылок, например: ссылка (https://site) 
            enumerate_headings: false # Отключает нумерацию заголовков 
            enumerate_figures: true # Включает нумерацию рисунков
            add_cover_page: true # Включает отображение титульной страницы 
            cover_page_template: "" # Путь к шаблону титульной страницы
            path_to_pdf: "" # Путь к сгенерированному PDF-документу
            include_css: true # Включает переопределение дефолтных CSS с целью кастомизации
            enabled: true # Включает плагин
            #exclude: # Исключает страницы из PDF
            #- index.md    

**Options**

`add_to_navigation`  Default is false. Adds a link 'Print Site' to your site navigation. You can also set to false and explicitly include the link in your navigation (/print_page or /print_page.html).

`print_page_title` Default is 'Print Site'. When add_to_navigation is set to true this setting controls the name of the print page in the navigation of the site. This setting is ignored when add_to_navigation is set to false.

`add_table_of_contents` Default is true. Adds a table of contents section at the beginning of the print page (in print version, the HTML version has a different sidebar ToC).

`toc_title` Default is 'Table of Contents'. When add_table_of_contents is set to true this setting controls the name of the table of contents of the print version of the print page. This setting is ignored when add_table_of_contents is set to false.

`toc_depth` Default is 3. When add_table_of_contents is set to true this setting controls the depth of the table of contents in the print version of the print page. This setting is ignored when add_table_of_contents is set to false.

`add_full_urls` Default is false. When printing a page, you cannot see the target of a link. This option adds the target url in parenthesis behind a link.  For example "google.com" will be replaced by "google.com (https://www.google.com)"

`enumerate_headings` Default true. This will add numbering (enumeration) to all headings and sections, as well as the table of contents. Note this will only enumerate the print site page; if you want to enumerate the entire site, you can use 
mkdocs-enumerate-headings-plugin.

    Example "1.2 A chapter subsection".

`enumerate_headings_depth` Default 6. If enumerate_headings, the depth until which headings and sections are enumerated.

`enumerate_figures` Default true. This will add numbering to all figure captions (for example "Figure 1: "). Works especially well with mkdocs-img2fig-plugin.

`add_cover_page` Default false. When enabled, a cover page is added to the print page, displaying the site_title and other information from the mkdocs.yml file. See also Customizing the cover page

`cover_page_template`  Default "". The path to a custom cover page template to use. See Customizing the Cover Page for more info.

`add_print_site_banner` Default false. When enabled, a banner is added to the top of the HTML print page, explaining to users the current page contains all site pages. See Customizing the print site banner for more info.

`print_site_banner_template` Default "". The path to a custom print site banner template to use. See Customizing the print site banner for more info.

`path_to_pdf`  Default is empty. Option to make it easier to add a link to the PDF version of the site on each page. See Adding a PDF button for more info.

`include_css`  Default is true. When disabled the print-site stylesheets are not included. This makes it easy to overwrite the CSS with your own stylesheets, using the extra_css option in your mkdocs.yml file.

`enabled`  Default is true. Enables you to deactivate this plugin. A possible use case is local development where you might want faster build times. It's recommended to use this option with an environment variable together with a default fallback (introduced in mkdocs v1.2.1, see docs). Example:

``` title="mkdocs.yml"
    plugins:
        - print-site:
            enabled: !ENV [ENABLED_PRINT_SITE, True]
```            

Which enables you do disable the plugin locally using:

    export ENABLED_PRINT_SITE=false
    mkdocs serve

`exclude`
    Default is empty. Allows to specify a list of page source paths that should not be included in the print page. See Do Not Print for more info.

**Usage**

* Navigate to /print_page/ or print_page.html

* Export to standalone HTML (see export to HTML)

* Export to PDF using your browser using File > Print > Save as PDF (see export to PDF)


> **mkdocs serve**
> URL http://127.0.0.1:8000/**print_page**/, Press ++ctrl+p++ and  *"Save as PDF"*.  
> **GitHub:** .github/workflows/main.yml Add string - run: pip install mkdocs-print-site-plugin.





## Automated export using nodejs and chrome

We can use nodejs together with the puppeteer headless chrome node.js package:

* Install [nodejs](https://nodejs.org/en/)

* Download puppeteer in the root of your project using the node package manager: `npm i --save puppeteer`

* Save the script `export_to_pdf.js` (see below) in the root of your project

* Start a webserver with your site (`mkdocs serve`)
 
* In a separate terminal window, you can now run the PDF export with url (to your print page), pdfPath (name of output file) and title arguments:

    node exportpdf.js http://localhost:8000/print_page.html out.pdf 'title'

??? info "export_to_pdf.js"

    ``` js
    (async() => {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: process.env.CHROME_BIN || null,
        args: ['--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage']
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.pdf({
        path: pdfPath, // path to save pdf file
        format: 'A4', // page format
        displayHeaderFooter: true, // display header and footer (in this example, required!)
        printBackground: true, // print background
        landscape: false, // use horizontal page layout
        headerTemplate: headerHtml, // indicate html template for header
        footerTemplate: footerHtml,
        scale: 1, //Scale amount must be between 0.1 and 2
        margin: { // increase margins (in this example, required!)
            top: 80,
            bottom: 80,
            left: 30,
            right: 30
        }
    });

    await browser.close();
    })();

    ```


## Export to HTML

After enabling the print-site plugin in your mkdocs.yml, you will have your entire site combined into a single page. That allows you to create a standalone HTML page: a single self-contained file that has all images, styling and scripts embedded. This means you could send a site as an email attachment, a use case common within companies where deploying static sites might be more involved.

In order to create a self-contained, standalone HTML file from the print page, we will need to embed images, CSS and javascript using data URLs. We can do this quite easily using the htmlark python package:

    pip install http html5lib requests
    pip install htmlark

To create the export:

    mkdocs build

    cd site/

    # when mkdocs.yml has use_directory_urls: true (the default)
    htmlark print_page/index.html -o standalone.html

    # when mkdocs.yml has use_directory_urls: false
    htmlark print_page.html -o standalone.html


## Adding a PDF button to mkdocs-material theme

In the mkdocs-material theme you can create an override for main.html (see customization).


=== "mkdocs.yml"
    ``` 
    theme:
    name: material
    custom_dir: docs/overrides

    plugins:
        - print-site:
            - path_to_pdf: "assets/the_name_of_your_file.pdf"

    ```
=== "docs/overrides/main.html"
    ```
    /{/% block content /%/}

    /{/% if page.url_to_pdf /%/}
        <a href="{{ page.url_to_pdf }}" title="Site PDF" class="md-content__button md-icon">
            /{/% include ".icons/material/file-pdf-box.svg" /%/}
        </a>
    /{/% endif /%/}

    /{/{ super() /}/}
    /{/% endblock content /%/}
    ```

## Adding a print button to mkdocs theme

You can also customize the base mkdocs theme, by overriding main.html.

=== "mkdocs.yml"
    ```
    theme:
        name: mkdocs
        custom_dir: docs/overrides

    plugins:
        - print-site:
            - path_to_pdf: "assets/the_name_of_your_file.pdf"

    docs/overrides/main.html
    ```

=== "docs/overrides/main.html"
    ```
    /{/% block repo /%/}
        /{/% if page.url_to_pdf /%/}
            <li class="nav-item">
                <a href="{{ page.url_to_pdf }}" title="Site PDF" class="nav-link">
                <i class="fas fa-file-pdf"></i> PDF
                </a>
            </li>
        /{/% endif /%/}

    /{/{ super() /}/}
    /{/% endblock repo /%/}
    ```


## Customize the cover page

By default the add_cover_page option is set to true, which will add a cover page to the print page. You might want to customize it more to your liking.

You can do that by specifying the path to a custom cover page template in the mkdocs.yml file. This file should be a standard jinja2 template where you can combine HTML and jinja2 variables. The information specified in mkdocs.yml will already by available as jinja2 variables (see mkdocs project information).

=== "mkdocs.yml"
    ```
    plugins:
        - print-site:
            add_cover_page: true
            cover_page_template: "docs/assets/templates/custom_cover_page.tpl"
    ```

=== "docs/assets/templates/custom_cover_page.tpl"
    ``` 
    {% if config.site_name %}
        <h1>{{ config.site_name }}</h1>
    {% endif %}
    <h2>This is my custom print cover page</h2>

    Adding images
    <img src="/assets/img/example.png" />
    ```


## Adding configurable content

You might want to add some content to your cover page that's not yet specified in your mkdocs.yml file. Of course you could just hard-code it in your custom template file, but you could also make use of MkDocs's extra context feature, allowing you to use custom variables from your config file with `{{ config.extra.<your variable> }}`.

=== "mkdocs.yml"
    ```
    plugins:
        - print-site:
            add_cover_page: true
            cover_page_template: "docs/assets/templates/custom_cover_page.tpl"

    extra:
        abstract: This is a report about a topic
    ```

=== "docs/assets/templates/custom_cover_page.tpl"
    ```
    {% if config.site_name %}
    <h1>{{ config.site_name }}</h1>
    {% endif %}
    <p>{{ config.extra.abstract }}</p>
    ```

## Change the styling

You'll likely also want to change the styling of the cover page to your liking. You can add your own CSS file using the extra_css option from MkDocs. mkdocs-print-site-plugin wraps the cover page in a `<section id="print-site-cover-page">`. You should use this in your CSS to ensure not affecting other pages.


=== "mkdocs.yml"
    ```
    plugins:
        - print-site:
            add_cover_page: true
    
    extra_css:
    - docs/assets/css/my_cover_page.css

=== "docs/assets/css/my_cover_page.css"
    ```
    #print-site-cover-page h1 {
        color: blue;
    }
    ```


## Customize the print site banner

When a user visits the print page, it might not be immediately obvious how to use it. You can set the add_print_site_banner option to true to add a banner to the top of the HTML print page that will be hidden when printing.

You might want to customize this banner, for example by translating it to your language. You can do that by specifying the path to a custom banner template in the mkdocs.yml file. This file should be a standard jinja2 template where you can combine HTML and jinja2 variables. The information specified in mkdocs.yml will already by available as jinja2 variables (see mkdocs project information).

=== "mkdocs.yml"
    ```
    plugins:
        - print-site:
            add_print_site_banner: true
            print_site_banner_template: "docs/assets/templates/custom_banner.tpl"
    ```        

=== "docs/assets/templates/custom_banner.tpl"
    ```
    <p>
        <em>This box will disappear when printing</em>
        <span style="float: right"><a href="https://timvink.github.io/mkdocs-print-site-plugin/">mkdocs-print-site-plugin</a></span>
    </p>
    <p>This page has combined all site pages into one. You can export to PDF using <b>File > Print > Save as PDF</b>.</p>
    <p>See also [export to PDF](https://timvink.github.io/mkdocs-print-site-plugin/how-to/export-PDF.html) and [export to standalone HTML](https://timvink.github.io/mkdocs-print-site-plugin/how-to/export-HTML.html).</p>
    ```

## Adding configurable content for site banner

You might want to add some content to your cover page that's not yet specified in your mkdocs.yml file. Of course you could just hard-code it in your custom template file, but you could also make use of MkDocs's extra context feature, allowing you to use custom variables from your config file with {{ config.extra.<your variable> }}.


=== "mkdocs.yml"
    ```
    plugins:
        - print-site:
            add_print_site_banner: true
            print_site_banner_template: "docs/assets/templates/custom_banner.tpl"

    extra:
        banner_message: "Save this page using File > Print > Save as PDF"
    ```

=== "docs/assets/templates/custom_banner.tpl"
    ``
    ``` html
            <p>
            <em>This box will disappear when printing</em>
            <span style="float: right"><a href="https://timvink.github.io/mkdocs-print-site-plugin/">mkdocs-print-site-plugin</a></span>
        </p>
        <p>{{ config.extra.banner_message }}</p>

    ```
    ``

## Exclude content from print

You might want to exclude certain parts of you website from the print site page. This can be useful when you don't want to include certain page, large images, tables, certain admonitions or appendixes to your site exports.

### Ignoring elements in a page

mkdocs-print-site-plugin offers the CSS class .print-site-plugin-ignore, that will ignore certain elements.

The Attribute Lists extension, which is part of the standard Markdown library, allows to add HTML attributes and CSS classes to Markdown elements, and needs to be enabled in your mkdocs.yml.

To apply the .print-site-plugin-ignore class to an element you can use {: .print-site-plugin-ignore } on many different markdown elements, as explained in the attr_list docs. attr_list does not support all markdown elements (see limitations), but remember Markdown is a subset of HTML and anything which cannot be expressed in Markdown can always be expressed with raw HTML directly.


=== "mkdocs.yml"
    ```
    plugins:
        - print-site

    markdown_extensions:
        - attr_list
    ```

=== "docs/example.md"
    ```
    /# Example page

    This paragraph will not be part of the print site page.
    {: .print-site-plugin-ignore }

    ![ignored image](some/path/image.png){: .print-site-plugin-ignore }

    You can also use HTML to hide things from printing:   
    <span class="print-site-plugin-ignore">hello</span>
    ```

### Ignoring admonitions

Adding a class to admonitions is not supported by attr_list. You can use the .print-site-plugin-ignore class directly on admonitions however.

```
    !!! info print-site-plugin-ignore

    As an example, this admonition will not be printed. Go have a look at the [print site page](/print_page.html) and you'll find it missing.
```

### Ignoring an entire page

In the plugin configuration in mkdocs.yml you can specify a list of page source paths (one per line) that should not be included in the print page (excluded from processing by this plugin). This can be useful for example to exlude large appendixes that you only want to display on the web version. The source path of a page is relative to your docs/ folder. You can also use globs instead of full source paths. To exclude docs/subfolder/page.md specify in your mkdocs.yml a line under exclude: with - subfolder/page.md.

``` title="mkdocs.yml"
plugins:
  - print-site:
      exclude:
        - index.md
        - subfolder/page.md
        - another_page.md
        - folder/*
```


