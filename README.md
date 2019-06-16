# Nice-Menu
jQuery based menu. It is modern javascript, easy to integrate, easy to use.

# Features
 - Disable.
 - Checkbox.
 - Radio buttons.
 - Click outside the menu, close it.
 
# Dependencies
 - [jquery](https://jquery.com/)


# Simple Demo
2 screenshots of the possibilities, with sub menu and checkbox and radio buttons.

![Nice-Menu Nice-Menu](http://www.ti-r.com/images/js/tr.menu_sub_menu.jpg)

![Nice-Menu Nice-Menu](http://www.ti-r.com/images/js/tr.menu_checkbox_radiobutton.jpg)

There is a demos inside demos directory

- demo-basic.html:
	* It show how to use it with all possibilities.
	* You can open the console (F12) to see events on clicks. 


# How to use it
- Html:
You need 1 div to position the menu.

```html
	<div class="menu" id="MainMenu"></div>
```

- Javascript:

```js
	var niceMenu = new TR.NiceMenu("MainMenu");
	var menuFile = niceMenu.AddEntry("File");
	menuFile.AddEntry("Save","Ctrl+S", ClickIntrospect);
	menuFile.AddEntry("Save As","Shift+Ctrl+C", ClickIntrospect);
```

# Reason
I needed a menu for my project [OSLED](https://www.ti-r.com/?C++/OpenGL/OSLED) for free and because I couldn't find a good one fitting all my needs, I just create my own :)

# License
The MIT License (MIT), check "LICENSE" file.

# Changelog

 - Version 1.0.0
	* Release
	