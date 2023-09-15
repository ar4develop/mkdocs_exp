
# PDF Plugin with-pdf

 Source link GitHub: <https://github.com/orzih/mkdocs-with-pdf>
 
 Sorce link pypi.org: <https://pypi.org/project/mkdocs-with-pdf/>


**Installation**

Install the package with pip:

    pip install mkdocs-with-pdf

Enable the plugin in your mkdocs.yml:

``` mkdocs.yml
    plugins:
        - with-pdf
```

**Options**

``` mkdocs.yml
plugins:
    - with-pdf:
      author: Автор Документа # Автор документа 
      copyright: ©2023 Your company # Копирайт
      # cover: false # Отключает отображение обложки (С1 — титульный лист) 
      # back_cover: true # Включает отображение обложки (С4 — задняя часть). На ней может отображаться QR-code со ссылкой на вашу документацию, см. ниже
      cover_title: Документация для Наш продукт # Заголовок на обложке С1 
      cover_subtitle: Руководство по установке • Руководство администратора # Подзаголовок на обложке С1
      cover_logo: docs/assets/logo_fav.png # Логотип на обложку 
      custom_template_path: templates # Директория с кастомизированными СSS
      toc_title: Содержание # Название раздела с содержанием
      # heading_shift: false # Отключает вложенность заголовков. Просто раскомментируйте этот параметр и посмотрите, как изменится содержание
      #toc_level: 3 # Уровни заголовков в содержании. К сожалению, максимальное значение — 3
      ordered_chapter_level: 3 # Максимальный уровень нумеруемых заголовков. К сожалению, максимальное значение — 3
      #excludes_children: # Исключает отдельные документы из генерируемого PDF
      #    - 'release-notes/:upgrading' # см. секцию nav в этом файле
      #    - 'release-notes/:changelog' # см. секцию nav в этом файле
      #exclude_pages: # Исключает отдельные папки из PDF
      #    - 'ig/' # см. секцию nav в этом файле
      #    - 'ag/contribute/' # см. секцию nav в этом файле
      #convert_iframe: # Конвертирует тег iframe в картинку со ссылкой 
      #    - src: IFRAME SRC #
      #      img: POSTER IMAGE URL #
      #      text: ALTERNATE TEXT #
      #    - src: ... #
      two_columns_level: 3 # Bключает двухколоночную верстку, начиная с третьего уровня заголовков
      #render_js: true # Включает рендер результатов JS (требуется Headless Chrome)
      #headless_chrome_path: headless-chromium # путь к Headless Chrome 
      output_path: ../site/Doc.pdf # Директория, в которую сохраняется PDF. В данном случае, чтобы просмотреть документ достаточно будет добавить к адресу в браузере Docs.pdf
      # enabled_if_env: PDF_EXPORT # Отключение генерации PDF, например при разработке (чтобы включить, комментируем эту строку)
      debug_html: true # Создает html-файл со всеми разделами. Незаменим при создании/редактировании стилей. Для вывода в файл, а не в терминал используем команду  mkdocs build > pdf_print.html 
      # verbose: true # Подробное логирование процесса генерации
```      