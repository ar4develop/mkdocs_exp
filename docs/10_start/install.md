# Starting MkDocs

---------------------------------------------------------

## Installation

Install **Python*.

Python Download <https://www.python.org/downloads/windows/>

Install **pip**

    python.exe -m pip install --upgrade pip

Material for MkDocs is published as a Python package and can be installed with pip, ideally by using a virtual environment. Open up a terminal and install Material for MkDocs with:

    pip install mkdocs-material

This will automatically install compatible versions of all dependencies: MkDocs, Markdown, Pygments and Python Markdown Extensions. Material for MkDocs always strives to support the latest versions, so there's no need to install those packages separately.

## Creating your site

After you've installed Material for MkDocs, you can bootstrap your project documentation using the mkdocs executable. Go to the directory where you want your project to be located and enter:

    mkdocs new .

or

    cd /D c:\my-project
    mkdocs new c:\my-project

## Commands

* `mkdocs new [dir-name]` - Create a new project.
* `mkdocs serve` - Start the live-reloading docs server (default: 127.0.0.1:8000).
* `mkdocs build` - Build the documentation site.
* `mkdocs -h` - Print help message and exit.


> **Optional:**
> mkdocs serve -a 0.0.0.0:<PORT> - Start the live-reloading docs server.
> mkdocs build -d <OUTPUT_PATH> - Build the documentation site.


## Project layout

    mkdocs.yml    # The configuration file.
    docs/
        index.md  # The documentation homepage.
        ...       # Other markdown pages, images and other files.


## Project YML


``` yaml title="mkdocs.yml"
--8<-- "./mkdocs.yml"
```