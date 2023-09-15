# Project deploy

Source links:    
[MkDocs.Deploying your docs](https://www.mkdocs.org/user-guide/deploying-your-docs/)    
[MkDocs MagicSpace. Publish on GitHub Pages](https://mkdocs-magicspace.alnoda.org/tutorials/get-online/github-pages/)   
[Как разработать техническую документацию, которая точно будет работать. Часть 2. DocOps в действии](https://habr.com/ru/companies/swordfish_security/articles/754780/)     

Local article   
[Как разработать техническую документацию, которая точно будет работать. Часть 2. DocOps в действии](../_articles/DocOps Part-2.htm)

## Настройка сборки и публикации

Примечание: Прежде чем продолжить, убедитесь, что на вашей машине установлен Git.

    git --version

Примечание: После установки Git вероятно потребуется перезапустить VS Code.

## GitHub

1. В VS Code перейдите на вкладку Source Control (Ctrl+Shift+G) и нажмите на кнопку Initialize Repository.

2. На вкладке Source Control нажмите … › Remote › Add remote…, а затем выберите Add remote from GitHub.

3. После успешной авторизации в браузере и возвращения в VS Code выберите ранее созданный репозиторий и назначьте ему имя.

4. В поле Message вкладки Source Control введите комментарий, например init, и нажмите на кнопку Commit.

Примечание: Если попытка выгрузки коммита закончилась неудачно, выполните в терминале две следующие команды, указав в кавычках свои данные, и опубликуйте коммит вновь.

    git config --global user.email "you@mail.ru"
    git config --global user.name "Your Name"

5. На вкладке Source Control нажмите на появившуюся кнопку Publish Branch.

> Примечание: В некоторых ОС на этом этапе можно столкнуться с затруднениями, но их легко преодолеть, следуя рекомендациям разработчиков VS Code и GitHub, а также многоуважаемого сетевого комьюнити.

6. Открыв в браузере соответствующий репозиторий, убеждаемся, что файлы успешно загружены.

7. В GitHub переходим на вкладку **Actions** и нажимаем на кнопку **Configure** на карточке **Simple workflow**.

8. Переименуем файл *blank.yml* в *main.yml*, вставим следующие строки и нажмем на кнопку **Commit changes…**.

```
name: ci 
on:
  push:
    branches:
      - main
permissions:
  contents: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: 3.x
      - run: echo "cache_id=$(date --utc '+%V')" >> $GITHUB_ENV 
      - uses: actions/cache@v3
        with:
          key: mkdocs-material-${{ env.cache_id }}
          path: .cache
          restore-keys: |
            mkdocs-material-
      - run: pip install mkdocs-material 
      - run: mkdocs gh-deploy --force
```

9. В открывшемся окне просто нажимаем на кнопку Commit changes.

10. Переходим на вкладку Actions и убеждаемся, что пайплайн отработал без ошибок.

11. Переходим на вкладку Settings.

12. Выбираем пункт меню Pages.

13. Выбираем ветку для публикации.

14. Нажимаем на кнопку Save.

15. Спустя минуту нужно перезагрузить страницу (Cmd+R) и нажать на кнопку Visit site, появившуюся в ее верхней части.

Теперь после размещения в репозитории каждого нового коммита будет автоматически запускаться сборка и публикация справочного портала на GitHub Pages.