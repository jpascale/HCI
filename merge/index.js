function set_cookie (cookie_name, cookie_value, lifespan, valid_domain)
{
  var domain_string = valid_domain ? ("; domain=" + valid_domain) : '' ;
  document.cookie = cookie_name + "=" + encodeURIComponent(cookie_value) +
      "; max-age=" + lifespan +
      "; path=/" + domain_string;
}

function get_cookie(name)
  {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
  }

function delete_cookie(name) {
    /*document.cookie = name + '=;max-age=0;expires=Thu, 01 Jan 1970 00:00:01 GMT;';*/
    set_cookie("username", "", -1);
};

function isLogged(){
      return (get_cookie("username") == '' || get_cookie("username") == null)? false : true;
}

function loadTrademarks(){
      // AJAX REQUEST
      var tds = [{"name": "Puma", "url": "search_page_1.html"}, {"name": "Adidas", "url": "search_page_1.html"}, {"name": "Nike", "url": "search_page_1.html"}, {"name": "Lacoste", "url": "search_page_1.html"}];

      var t = $('#trademarks-link');
      t.attr("data-toggle", "dropdown");
      t.addClass('dropdown-toggle');

      t = $('#trademarks');
      t.addClass('dropdown');

      var st = "";

      for (var i = 0; i < tds.length; i++){
        st = st + '<li><a href="' + tds[i]["url"] +'">' + tds[i]["name"] + '</a></li>';
      }
      t.append('<ul class="dropdown-menu">' + st + '</ul>');

}

function loadLoginLogoutInterface() {

  $("#women").on('click', function(){
    window.location = 'search_page_1.html';
  });
  $("#men").on('click', function(){
    window.location = 'search_page_1.html';
  });
  $("#boys").on('click', function(){
    window.location = 'search_page_1.html';
  });
  $("#girls").on('click', function(){
    window.location = 'search_page_1.html';
  });
  $("#trademarks").on('click', function(){
    window.location = 'search_page_1.html';
  });



  if (isLogged()){
    var login = $('#login');
    var register = $('#register');

    var myprofile = $('<a id="myprofile" href="#">Mi perfil</a>');
    var logout = $('<li class="verticalLine"><a id="logout" href="index.html">Salir</a></li>');
    var nameli = $('<li><a id="userlabel">¡Hola, ' + get_cookie('username') + '!</a></li>');

    var aux;
    aux = login.parent();

    aux.after(logout);
    register.remove();

    aux.append(myprofile);
    aux.removeClass('verticalLine');
    login.remove();

    aux.before(nameli);

    $('#myprofile').on('click',function(){
      window.location = 'profile.html';
    });

    $('#logout').on('click', function(){
      delete_cookie('username');
    });
  } /*else {
    $('#login').on('click', function(){
      set_cookie("username", "Marcelo", 3600);
    });
  }*/
}

function loadCategory(id) {

  var obj = $('#' + id);
  var obj_link = $('#' + id + '-link');

  // AJAX REQUEST ++ convert
  var categories = [{"name": "Calzado", "sub": []}, {"name": "Indumentaria", "sub": [{"name": "Buzos"}, {"name": "Camisas"}, {"name": "Pantalones"}, {"name": "Remeras"}, {"name": "Trajes de baño"}]}, {"name": "Accesorios", "sub": []}, {"name": "Novedades", "sub": []}, {"name": "Ofertas", "sub": []}, {"name": "Destacados", "sub": []}];

if (categories.length > 0) {

    //make drowdown
    obj.addClass('dropdown');
    obj_link.attr('data-toggle', 'dropdown');
    obj_link.addClass('dropdown-toggle');

    var st = '<ul class="dropdown-menu">';

    for (var i = 0; i < categories.length; i++){
        if (categories[i]["sub"].length > 0){
            st = st + '<li><a href="search_page_1.html">' + categories[i]["name"] + '<span class="glyphicon glyphicon-menu-right cb pull-right" aria-hidden="true"></span><i class="icon-arrow-right"></i></a>';
            st = st + '<ul class="dropdown-menu sub-menu">';
            for (var j = 0; j < categories[i]["sub"].length; j++){
                st = st + '<li><a href="search_page_1.html">' + categories[i]["sub"][j]["name"] + '</a></li>';
            }
            st = st + '</ul></li>';
        } else {
            st = st + '<li><a href="search_page_1.html">' + categories[i]["name"] + '</a></li>';
        }

    }
    st = st + '</ul>';

    obj.append(st);
}

  /*console.log(id);
  console.log(categories)
  console.log($(st));*/
}

function loadLoginInterface(){
    
}



















