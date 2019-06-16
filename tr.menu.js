

// Namespace TR
if( TR == undefined )
	var TR = {};

// Globals
	// Char to personalize for opening submenu
TR.gCharOpenSubMenu='&#9658;'; //'>';
	// internal infos about menu ids
TR.gEntryGenId = 0;

// Create the nice menu struct
TR.NiceMenuItem = function ( _popup, _id, _name, _shortcut, _js_event, _needFrontSpace )
{
	var This = this;
	this.mPopup = _popup;
	this.mId = _id;
	this.mName = _name;
	this.mOnClick = undefined;
	this.mShortCut = _shortcut;
	this.mNeedFrontSpace = _needFrontSpace || false;

	if( _js_event )
	{
		This.mOnClick = _js_event.bind(This);
	}
	
	this.GetShortCut = function () {
		if( This.mShortCut && This.mShortCut!='' )
			return '<div class="menuShortcut">'+This.mShortCut+'</div>';
		return '';
	}	
	
	this.GetDomElement = function () {
		return This.mPopup.mListDomElements.find("#tr_menu_entry_"+This.mId);
	}
	
	this.GetDomElementInput = function () {
		return this.GetDomElement().children("input");
	}
	
	this.GetClass = function (  ) {
		var addClass='';
		if( This.mNeedFrontSpace )
			addClass += ' frontSpaceNeedEntry';
		return addClass;
	}
	
	this.SetClick = function ( _domE )
	{
		if( This.mOnClick )
		{
			// Add event on "#tr_menu_entry_"+This.mId
			_domE.click(This.mOnClick);
			
			 // This code enable to do not have double click event with input (checkbox/radio buttons)
			This.GetDomElementInput().click(function(e){e.stopImmediatePropagation();});
		} 
	}
	
	this.LinkEvents = function ()
	{
		var domE = This.GetDomElement();
		domE.hover(This.mPopup.MenuHover.bind(domE));
		This.SetClick(domE);
		return This;
	}
}

// Create the nice menu struct
TR.NiceMenuPopup = function ( _id_entry, _is_subMenu )
{
	var This = this;
	var ThisLastShow;
	This.mId = _id_entry;
	if( _is_subMenu )
		This.mListDomElements = $('#tr_menu_entry_'+_id_entry).find(".menuContent");
	else
		This.mListDomElements = $('#tr_menu_entry_'+_id_entry).next(".menuContent");
	This.mListItems = {};
	
	// Text Entry
	this.AddEntry = function ( _name, _shortcut, _js_event, _needFrontSpace ) {
	
		var item = new TR.NiceMenuItem(This, ++TR.gEntryGenId, _name, _shortcut, _js_event, _needFrontSpace);

		This.mListDomElements.append('<span id="tr_menu_entry_'+item.mId+'" class="'+item.GetClass()+'">'+_name+item.GetShortCut()+'</span>');
		
		This.mListItems[item.mId] = item.LinkEvents();
		return item.mId;
	}
	
	// Html Entry
	this.AddEntryNoSelection = function ( _name ) {
	
		var item = new TR.NiceMenuItem(This, ++TR.gEntryGenId, _name);
		
		This.mListDomElements.append('<div id="tr_menu_entry_'+item.mId+'">'+_name+'</div>');
		
		This.mListItems[item.mId] = item.LinkEvents();
		return item.mId;
	}
	
	// CheckBox Entry
	this.AddEntryCheckBox = function ( _name, _shortcut, _js_event ) {
	
		var item = new TR.NiceMenuItem(This, ++TR.gEntryGenId, _name, _shortcut, _js_event);

		This.mListDomElements.append('<label class="menuLabel" id="tr_menu_entry_'+item.mId+'"><input type="checkbox" id="tr_menu_entry_input_'+item.mId+'"><span class="icon"/><span class="menu_text">'+_name+'</span>'+item.GetShortCut()+'</label>');

		This.mListItems[item.mId] = item.LinkEvents();
		return item.mId;
	}
	
	// Radio Entry
	this.AddEntryRadio = function ( _common_name, _name, _shortcut, _js_event ) {
	
		var item = new TR.NiceMenuItem(This, ++TR.gEntryGenId, _name, _shortcut, _js_event);

		This.mListDomElements.append('<label class="menuLabel" id="tr_menu_entry_'+item.mId+'"><input type="radio" id="tr_menu_entry_input_'+item.mId+'" name="'+_common_name+'"><span class="icon"/><span class="menu_text">'+_name+'</span>'+item.GetShortCut()+'</label>');

		This.mListItems[item.mId] = item.LinkEvents();
		return item.mId;
	}
	
	// CheckBox Entry
	this.SetEntryCheck = function ( _id ) {
		This.mListItems[_id].GetDomElementInput().prop('checked', true);
	}
	
	// CheckBox Entry
	this.SetEntryUnCheck = function ( _id ) {
		This.mListItems[_id].GetDomElementInput().prop('checked', false);
	}
	
	// Disable Entry
	this.SetEntryDisable = function ( _id ) {
		This.mListItems[_id].GetDomElement().off('click').addClass('menuDisable');
	}
	
	// Enable Entry
	this.SetEntryEnable = function ( _id ) {
		var item = This.mListItems[_id];
		var tDomE = item.GetDomElement();
		item.SetClick(domE);
		tDomE.removeClass('menuDisable');
	}
	
	// CheckBox Entry
	this.IsEntryCheck = function ( _id ) {
		return This.mListItems[_id].GetDomElementInput().is(':checked');
	}

	// Sub menu
	this.AddEntryWithSubMenu = function ( _name, _needFrontSpace ) {
	
		var item = new TR.NiceMenuItem(This, ++TR.gEntryGenId, _name, "", undefined, _needFrontSpace);

		This.mListDomElements.append('<span class="menuButtonWithSubMenu'+item.GetClass()+'" id="tr_menu_entry_'+item.mId+'"><div class="menuContent menuSubmenu"></div>'+_name+'<div class="menuShortcutSubmenu">'+TR.gCharOpenSubMenu+'</div></span>');

		This.mListItems[item.mId] = item.LinkEvents();
		return new TR.NiceMenuPopup(item.mId, true);
	}
	
	// Clean submenu
	this.CleanSubMenu = function ( _id ) {
		This.mListDomElements.empty();
	}
	
	
	// Remove entry
	this.RemoveEntry = function ( _id ) {
		if(!_id)
			_id = _id_entry;

		$('#tr_menu_entry_'+_id).remove();
	}
	
	// Menu Hover
	this.MenuHover = function() {
		if( ThisLastShow != $(this).children(".menuContent"))
		{
			$(this).focus();
			if( ThisLastShow )
				ThisLastShow.hide();
				
			ThisLastShow = $(this).children(".menuContent");
			
			if( ThisLastShow && !$(this).hasClass("menuDisable"))
			{
				ThisLastShow.css({left: $(this).outerWidth()});
				ThisLastShow.show();
			}
		}
	}
	
}

// Create the nice menu struct
TR.NiceMenu = function ( _id_child )
{
	var This = this;
	
	// Menu object
	var ThisMenu = $('#'+_id_child);
	
	// Menu open
	var ThisMenuOpen = this.mMenuOpen = false;
	var ThisLastShow;
	
	
	// Hide last shown
	function HideLastShown(){
	
		if( ThisLastShow )
		{
			window.focus();
			ThisLastShow.hide();
			ThisLastShow = null;
			ThisMenu.find(".menuSubmenu").hide();
		}
	}
	
	// Menu Click
	this.AddEntry = function ( _entry_name ) {
		++TR.gEntryGenId;
		
		ThisMenu.append('<div class="menuColumn"><button class="menuButton" id="tr_menu_entry_'+TR.gEntryGenId+'">'+_entry_name+'</button><div class="menuContent"></div></div>');
		$("#tr_menu_entry_"+TR.gEntryGenId).click(This.MenuClick).hover(This.MenuHover);
	
		return new TR.NiceMenuPopup(TR.gEntryGenId, false);
	}
	
	// Menu Click
	this.MenuClick = function() {
		// Closed or open
		ThisMenuOpen = !ThisMenuOpen;
		
		ThisLastShow = $(this).next(".menuContent");
		if( ThisMenuOpen )
			ThisLastShow.show();
		else
			ThisLastShow.hide();
	}
	ThisMenu.find(".menuButton").click(This.MenuClick);
	
	// Menu Hover
	this.MenuHover = function() {
		// Closed or open
		if( ThisMenuOpen )
		{
			if( ThisLastShow != $(this).next(".menuContent") )
			{
				$(this).focus();
				HideLastShown();
				
				ThisLastShow = $(this).next(".menuContent");
				ThisLastShow.show();
			}
		}
	}
	ThisMenu.find(".menuButton").hover(This.MenuHover);

	$('body').click(function(){
		if (!event.target.matches('.menuButton') && !event.target.matches('.menuButtonWithSubMenu')) {
	
			HideLastShown();
			ThisMenuOpen = false;
		}
	});
	
}
