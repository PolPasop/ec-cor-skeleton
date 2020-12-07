$(window).on("load", function () {

  // CorrectDeclarationButton();
  SetActiveVariation();
  SetLanguagesLink();
  resizeThemeTiles();
  setHeightSpeakers();
  //	resizeMediaContact();	

  var inDesignMode = false;
  if (inDesignMode != "1")// page is in browse mode
  {
    var icons = {
      header: "ui-icon-plusthick",
      activeHeader: "ui-icon-minusthick"
    };

    $("div[id*='collapsibleContent']").each(function () {
      $(this).accordion({
        icons: icons,
        active: false,
        collapsible: true,
        heightStyle: "content",
        beforeActivate: function (event, ui) {
          $("div[id*='collapsibleContent']").not($(this)).not($(this).parent()).accordion('option', 'active', false);
        }
      });
    });



  }

  $('#PrintMediaProgrammeButton').click(function () {
    window.print();
  });

  $('#DownloadMediaProgrammePDF').click(function () {
    window.open("/en/summit2019/Documents/media_programme_EN.pdf");
  });

  $('#PrintButton').click(function () {
    window.print();
  });

  $('#DownloadPDF').click(function () {
    var variation = GetVariation(document.location.pathname.toLowerCase());
    var url = "/en/summit2019/Documents/summit_programme_EN.pdf";
    switch (variation) {
      case "/fr/":
        break;
      case "/de/":
        url = "/en/summit2019/Documents/Summit_Programme_DE.pdf";
        break;
      case "/ro/":
        url = "/en/summit2019/Documents/3800%20Summit%20Programme%20RO%20-%20FINAL.pdf";
        break;
    }
    window.open(url);
  });



});

$(window).resize(function () {
  resizeThemeTiles();
  resizeMediaContact();
  setHeightSpeakers();
});

function CorrectDeclarationButton() {
  var variation = GetVariation(document.location.pathname.toLowerCase());
  var url = "/bucarest_declaration_en.go";
  var label = "Read the Bucharest Declaration";
  switch (variation) {
    case "/fr/":
      label = "Lire la Déclaration de Bucarest";
      url = "/bucarest_declaration_fr.go";
      break;
    case "/de/":
      label = "Lesen Sie die Bukarester Erklärung hier";
      url = "/bucarest_declaration_de.go";
      break;
    case "/ro/":
      label = "Citiţi Declaraţia de la Bucureşti";
      url = "/bucarest_declaration_ro.go";
      break;
  }
  $("#declarationLink").text(label);
  $("#declarationLink").attr("href", url);
}
function resizeMediaContact() {
  $(".media-contact img").css("height", $(".media-contact img").width());
}
function Redirect(language) {
  var search = window.location.search;
  var redirect = "/" + language + window.location.pathname.slice(3);

  //	window.location = redirect + search;
  return redirect + search;

}

function setHeightSpeakers() {
  $("#og-grid>div").each(function () {
    $(this).find("a").css("height", $(this).height());
  });
}

function SetLanguagesLink() {
  $("#english").attr("href", Redirect("en"));
  $("#french").attr("href", Redirect("fr"));
  $("#german").attr("href", Redirect("de"));
  $("#romanian").attr("href", Redirect("ro"));
}
function SetActiveVariation() {
  var variation = GetVariation(document.location.pathname.toLowerCase());
  switch (variation) {
    case "/en/":
      $("#english").addClass("active");
      break;
    case "/fr/":
      $("#french").addClass("active");
      break;
    case "/de/":
      $("#german").addClass("active");
      break;
    case "/ro/":
      $("#romanian").addClass("active");
      break;
  }

}

function GetVariation(pathname) {
  var v_ret = '';
  v_ret = pathname.toString().substring(0, 4);

  return v_ret;
}


function resizeThemeTiles() {
  if ($("#Themes-container .embed-video").length > 0) {
    var height = $("#Themes-container .embed-video").height();
    $(".theme-tile").height(height);
    var marginTop = height / 4;
    var maxHeight = 0;
    $(".theme-info").each(function () {
      themeHeight = marginTop + $(this).find('.theme-title').outerHeight() + $(this).find('.theme-description').outerHeight()
      if (maxHeight < themeHeight)
        maxHeight = themeHeight;
    });

    if (maxHeight > height)
      $(".theme-title").css("margin-top", "15px");
    else
      $(".theme-title").css("margin-top", marginTop + "px");

  }
}
function ActivateWebstreaming(sender, args) {
  var webstreamingItem = [];
  var siteUrl = GetVariation(document.location.pathname.toLowerCase()) + 'summit2019/'
  var clientContext = new SP.ClientContext(siteUrl);
  var oList = clientContext.get_web().get_lists().getByTitle('Programme');

  $(".Summit2019_Prog_Webstreaming a").each(function () {
    var id = $(this).attr("id");
    id = id.substring(id.indexOf("-") + 1);
    webstreamingItem['live-' + id] = oList.getItemById(id);
    clientContext.load(webstreamingItem["live-" + id]);
  });
  this.webstreamingItem = webstreamingItem;
  clientContext.executeQueryAsync(Function.createDelegate(this, onQueryProgrammeSucceeded), Function.createDelegate(this, this.onQueryProgrammeFailed));
}
function onQueryProgrammeSucceeded() {
  for (var item in this.webstreamingItem) {
    var title = this.webstreamingItem[item].get_item("Title");
    var start = Date.parse(this.webstreamingItem[item].get_item("Summit2019_nt_WebstreamingStart"));
    var end = Date.parse(this.webstreamingItem[item].get_item("Summit2019_nt_WebstreamingEnd"));
    var now = (new Date()).addHours(1);

    var id = item.substring(item.indexOf("-") + 1);

    if (now > start && now < end) {
      $("#live-" + id).removeClass("disabled").addClass("blink");
      $("#live-" + id).html("<span>Watch Live!</span>" + $("#live-" + id).html())
      $("#live-" + id)[0].href = $("#live-" + id)[0].href.replace("/en/", GetVariation(document.location.pathname.toLowerCase()))
    }
  }

  blink();
}
Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
}
function onQueryProgrammeFailed(sender, args) {
  alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}

function blink() {
  $('.blink').delay(500).fadeTo(100, 0.5).delay(100).fadeTo(100, 1, blink);
}

function ActivateRooms(sender, args) {
  var roomItem = [];
  var siteUrl = GetVariation(document.location.pathname.toLowerCase()) + 'summit2019/'
  var clientContext = new SP.ClientContext(siteUrl);
  var oList = clientContext.get_web().get_lists().getByTitle('Programme');

  $(".room>a").each(function () {
    var id = $(this).attr("id");

    var camlQuery = new SP.CamlQuery();
    switch (id) {
      case "Iorga":
        camlQuery.set_viewXml("<View><Query><Where><And><Contains><FieldRef Name='Summit2019_Session_Location' /><Value Type='Text'>Iorga</Value></Contains><And><Leq><FieldRef Name='Summit2019_nt_WebstreamingStart' /><Value IncludeTimeValue='TRUE' Type='DateTime'><Now /></Value></Leq><Geq><FieldRef Name='Summit2019_nt_WebstreamingEnd' /><Value IncludeTimeValue='TRUE' Type='DateTime'><Now /></Value></Geq></And></And></Where></Query></View>");
        camlQuery.set_viewXml("<View><Query><Where><Contains><FieldRef Name='Summit2019_Session_Location' /><Value Type='Text'>Iorga</Value></Contains></Where></Query></View>");
        break;
      case "Cuza":
        camlQuery.set_viewXml("<View><Query><Where><Contains><FieldRef Name='Summit2019_Session_Location' /><Value Type='Text'>Cuza</Value></Contains></Where></Query></View>");
        break;
      case "Balcescu":
        camlQuery.set_viewXml("<View><Query><Where><Contains><FieldRef Name='Summit2019_Session_Location' /><Value Type='Text'>Bălcescu</Value></Contains></Where></Query></View>");
        break;
    }

    roomItem[id] = oList.getItems(camlQuery);
    clientContext.load(roomItem[id]);
  });
  this.roomItem = roomItem;

  //    clientContext.executeQueryAsync(Function.createDelegate(this, function(){onQueryWorkshopsSucceeded(param);}), Function.createDelegate(this, this.onQueryFailed));    
  clientContext.executeQueryAsync(Function.createDelegate(this, onQueryRoomSucceeded), Function.createDelegate(this, this.onQueryRoomFailed));

}
function onQueryRoomSucceeded() {
  for (var item in this.roomItem) {
    var listItemInfo = '';
    var listItemEnumerator = this.roomItem[item].getEnumerator();
    while (listItemEnumerator.moveNext()) {
      var oRoom = listItemEnumerator.get_current();
      var roomTitle = oRoom.get_item("Title");
      var extraTitle = oRoom.get_item("Summit2019_Session_ExtraInfoMedi");
      extraTitle = $("<div/>").html(extraTitle).text()
      var start = Date.parse(oRoom.get_item("Summit2019_nt_WebstreamingStart"));
      var end = Date.parse(oRoom.get_item("Summit2019_nt_WebstreamingEnd"));
      var now = (new Date()).addHours(1);

      if (now > start && now < end) {
        var selector;
        switch (item) {
          case "Iorga":
            selector = "Room1Session";
            break;
          case "Cuza":
            selector = "Room2Session";
            break;
          case "Balcescu":
            selector = "Room3Session";
            break;
        }
        $("#" + selector).text(roomTitle + " " + extraTitle);
        $("#" + selector).css("display", "block");
      }
    }
  }
}
function onQueryRoomFailed(sender, args) {
  alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}
