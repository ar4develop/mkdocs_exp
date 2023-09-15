# WeasyPrint

The pdf-export plugin will export all markdown pages in your MkDocs repository as PDF  files using [**WeasyPrint**](https://weasyprint.org/). The exported documents support many advanced features missing in most other PDF exports, such as a PDF Index and support for CSS paged media module.

WeasyPrint Documentation: <https://doc.courtbouillon.org/weasyprint/stable/first_steps.html#installation>


Blog: [How to build your GTK+ application on Windows](https://blogs.gnome.org/nacho/2014/08/01/how-to-build-your-gtk-application-on-windows/)

GitHub project: [GTK+ for Windows Runtime Environment Installer: 64-bit](https://github.com/tschoonj/GTK-for-Windows-Runtime-Environment-Installer)


* Install GTK-for-Windows-Runtime-Environment-Installer from:  
<https://github.com/tschoonj/GTK-for-Windows-Runtime-Environment-Installer/releases>

* Create environment variable:   
**WEASYPRINT_DLL_DIRECTORIES = C:\Program Files\GTK3-Runtime Win64\bin**

> *gobject-2.0-0 error message: OSError: cannot load library 'gobject-2.0-0'*

> The error means that the gobject-2.0.0 library, which is part of GTK3+, cannot be found. Did you follow the installation instructions (https://doc.courtbouillon.org/weasyprint/stable/first_steps.html), which include installation of GTK3+? If no, do that. If yes, then the problem is, that the GTK3+ DLLs are not where Python is looking for them. For this, you need to add the directory containing the DLLs (e.g. C:\Program Files\GTK3-Runtime Win64\bin on Windows) to your PATH environment variable. That directory contains the relevant libgobject-2.0-0.dll library.