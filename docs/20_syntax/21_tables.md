## Data tables

Material for MkDocs defines default styles for data tables – an excellent way of rendering tabular data in project documentation. Furthermore, customizations like sortable tables can be achieved with a third-party library and some additional JavaScript.

**Configuration**

This configuration enables Markdown table support, which should normally be enabled by default, but to be sure, add the following lines to mkdocs.yml:

markdown_extensions:
  - tables

**Usage**

=== "Left"

    ```
    | Method      | Description                          |
    | :---------- | :----------------------------------- |
    | `GET`       | :material-check:     Fetch resource  |
    | `PUT`       | :material-check-all: Update resource |
    | `DELETE`    | :material-close:     Delete resource |
    ```

=== "Center"
    ```
    | Method      | Description                          |
    | :---------: | :----------------------------------: |
    | `GET`       | :material-check:     Fetch resource  |
    | `PUT`       | :material-check-all: Update resource |
    | `DELETE`    | :material-close:     Delete resource |
    ```

=== "Right"

    ```
    | Method      | Description                          |
    | ----------: | -----------------------------------: |
    | `GET`       | :material-check:     Fetch resource  |
    | `PUT`       | :material-check-all: Update resource |
    | `DELETE`    | :material-close:     Delete resource |
    ```


**Sortable tables**

If you want to make data tables sortable, you can add tablesort, which is natively integrated with Material for MkDocs and will also work with instant loading via additional JavaScript:

docs/javascripts/tablesort.js

```
document$.subscribe(function() {
  var tables = document.querySelectorAll("article table:not([class])")
  tables.forEach(function(table) {
    new Tablesort(table)
  })
})
```

mkdocs.yml

```
extra_javascript:
  - https://unpkg.com/tablesort@5.3.0/dist/tablesort.min.js
  - javascripts/tablesort.js
```

Table Centered, Sorted:

| Method      | Description                          |
| :---------: | :----------------------------------: |
| `GET`       | :material-check:     Fetch resource  |
| `PUT`       | :material-check-all: Update resource |
| `DELETE`    | :material-close:     Delete resource |



### Import table from file
 
You can also import data from a CSV or Excel file using the plugin mkdocs-table-reader-plugin.

First, you will need to install it with pip:

    pip install mkdocs-table-reader-plugin

Then extend the mkdocs.yml file like this:

    plugins:
    - table-reader

Then, it is a simple process to import the data in to the Markdown files.


=== "Import data from  CSV file"

    ``` csv title="data.csv"
  
    col1,col2,col3 
    r1c1,r1c2,r1c3 
    r2c1,r2c2,r2c3 
    r3c1,r3c2,r3c3 

    ```
    add it to your Markdown page this (withot symbol slash (/)):
    
    */{/{ read_csv('./docs/_files/data.csv') /}/}*

    Result from data.csv

    {{ read_csv('./docs/_files/data.csv') }}



=== "Import data from  Excel file"

    ```
    pip install openpyxl

    ./docs/_files/data.xlsx

    add it to your Markdown page this (withot symbol slash (/)):

    /{/{ read_excel('./docs/_files/data.xlsx', engine='openpyxl') /}/}

    For document with sheets.

    /{/{ read_excel('./Book1.xlsx', engine='openpyxl', sheet_name="Sheet1") /}/}

    ```
    Result from data.xlsx

    {{ read_excel('./docs/_files/data.xlsx', engine='openpyxl') }}

=== "Import data from other file types"

    The plugin mkdocs-table-reader-plugin also provides readers for other formats:

    *read_csv, read_fwf, read_yaml, read_table, read_json, read_excel, read_raw*

    You can read more on their Docs website: [mkdocs-table-reader-plugin](https://timvink.github.io/mkdocs-table-reader-plugin/)


### Readers

Install the plugin using pip:

    pip install mkdocs-table-reader-plugin

``` title="mkdocs.yml"
    plugins:
    - table-reader
```    

The following table reader functions are available:

**read_csv**

    /{/{ read_csv('tables/basic_table.csv') /}/}


**read_fwf**

    /{/{ read_fwf('tables/fixedwidth_table.txt') /}/}

**read_yaml**
    
    /{/{ read_yaml('tables/yaml_table.yml') /}/}

**read_table**

    /{/{ read_table('tables/basic_table.csv', sep = ',') /}/}

**read_json**

    /{/{ read_json('tables/data.json', orient='split') /}/}


**read_excel**

    /{/{ read_excel('tables/excel_table.xlsx', engine='openpyxl') /}/}

**read_raw**

{{ read_raw() }} inserts contents from a file directly. This is great if you have a file with a table already in markdown format. It could also replace a workflow where you use the snippets extension to embed external files.

    /{/{ read_raw('tables/markdown_table.md') /}/}


### Embed File

    /--8<--
    /./docs/20_syntax/21_tables.md
    /./docs/20_syntax/21_diagrams.md
    /--8<--

