# FAQ

-------------------------------------

## Embedded files

Use without first slash `(/)`.

```
/--8<--
/./docs/20_syntax/21_tables.md
/./docs/20_syntax/21_diagrams.md
/--8<--
```

Use without slash `(/)` before `{`.

``` 
/{/{ read_raw('./docs/20_syntax/21_diagrams.md') /}/}
```


## Useful plugins

``` title="mkdocs.yaml"
plugins:
  - glightbox
  - search:
      lang: 
        - en
        - ru

  - table-reader        
  - print-site
```

+ *Table reader*  
<https://github.com/timvink/mkdocs-table-reader-plugin>   
<https://timvink.github.io/mkdocs-table-reader-plugin/>   
`pip install mkdocs-table-reader-plugin`

+ *Import data from  Excel file*    
<https://github.com/shshe/openpyxl>   
<https://openpyxl.readthedocs.io/en/stable/tutorial.html>   
`pip install openpyxl`

+ *Export PDF*    
mkdocs-print-site-plugin    
<https://github.com/timvink/mkdocs-print-site-plugin>   
<https://timvink.github.io/mkdocs-print-site-plugin/print_page.html>    
`pip install mkdocs-print-site-plugin`

+ *Lightbox For Enlarge image*    
<https://github.com/blueswen/mkdocs-glightbox>   
<https://github.com/biati-digital/glightbox#lightbox-options>      
`pip install mkdocs-glightbox`