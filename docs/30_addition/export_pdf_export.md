# PDF Plugin pdf-export 

The pdf-export plugin will export all markdown pages in your MkDocs repository as PDF files using **WeasyPrint**. The exported documents support many advanced features missing in most other PDF exports, such as a PDF Index and support for CSS paged media module.

Source link: <https://pythonrepo.com/repo/zhaoterryy-mkdocs-pdf-export-plugin-python-documentation>


MkDocs plugin that adds a page to your site combining all pages, allowing your site visitors to File > Print > Save as PDF the entire site.

GitHub: <https://timvink.github.io/mkdocs-print-site-plugin/index.html>


**Installation*

Install the package with pip:

    pip install mkdocs-pdf-export-plugin

Enable the plugin in your mkdocs.yml:

    plugins:
        - pdf-export:
            verbose: true
            media_type: print
            enabled_if_env: ENABLE_PDF_EXPORT
            combined: 1

**Options**

You may customize the plugin by passing options in mkdocs.yml:


`verbose` Setting this to true will show all WeasyPrint debug messages during the build. Default is false.

`media_type` This option allows you to use a different CSS media type (or a custom one like pdf-export) for the PDF export. Default is print.

`enabled_if_env` Setting this option will enable the build only if there is an environment variable set to 1. This is useful to disable building the PDF files during development, since it can take a long time to export all files. Default is not set.

`combined` Setting this to true will combine all pages into a single PDF file. All download links will point to this file. Default is false.

`combined_output_path`

This option allows you to use a different destination for the combined PDF file. Has no effect when combined is set to false. Default is pdf/combined.pdf.

`theme_handler_path`

This option allows you to specify a custom theme handler module. This path must be relative to your project root (See example below). Default is not set.

    project-root
    ├── theme-handler.py
    ├── docs
    ├── mkdocs.yml
    ├── site
    .
