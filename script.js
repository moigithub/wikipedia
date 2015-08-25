/*

{
    "warnings": {
        "query": {
            "*": "Formatting of continuation data will be changing soon. To continue using the current formatting, use the 'rawcontinue' parameter. To begin using the new format, pass an empty string for 'continue' in the initial query."
        }
    },
    "query-continue": {
        "search": {
            "sroffset": 10
        }
    },
    "query": {
        "searchinfo": {
            "totalhits": 143308
        },
        "search": [
            {
                "ns": 0,
                "title": "Super",
                "snippet": "<span class=\"searchmatch\">Super</span> may refer to:   <span class=\"searchmatch\">SUPER</span> (computer programme), or Simplified Universal Player Encoder &amp; Renderer, a video converter/ player <span class=\"searchmatch\">Super</span> (computer science)",
                "size": 1797,
                "wordcount": 214,
                "timestamp": "2015-05-14T05:24:16Z"
            }
        ]
    }
}

*/

var wikipediaAPI = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srwhat=text"; // &srsearch=super
var wikiAPIoffset ="&sroffset=";  // &sroffset=10  // next page

var wikipediaURL = "https://en.wikipedia.org/wiki/";

$(document).ready(function() { 
  
  // GO search button handler
  $("#go").click(function(){
    var valuetosearch = $("#search").val();
    if (valuetosearch==="") {return; }
    
    $(".resultslist").html("");
    
    var querystring = wikipediaAPI +"&srsearch="+ valuetosearch +"&callback=?" ;
    
    var jqxhr = $.getJSON( querystring, function() {
      console.log( "success" );
    })
    .done(function(JSONdata) {
      console.log( "second success" );
      
      //var nextpage = JSONdata["query-continue"].search.sroffset;
      //console.log(nextpage);
      
      $(".resultslist").hide();
      JSONdata.query.search.forEach(function(searchresult){
        //console.log(searchresult);
        var resultdiv = $('<div class="result"></div>');
        var link = $('<a href="'+wikipediaURL + searchresult.title +'" alt="'+searchresult.title+'" target="_blank"></a>');
        var header = $('<h1>'+ searchresult.title+'</h1>');
        var description = $('<p>'+searchresult.snippet+'</p>');
        
        link.append(header);
        link.append(description);
        
        resultdiv.append(link);
        
        $(".resultslist").append(resultdiv);
        
      });
      $(".resultslist").show();
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "complete" );
    });

    // Perform other work here ...

    // Set another completion function for the request above
    jqxhr.complete(function() {
      console.log( "second complete" );
    });
  }); // fin click #go
  
  
    // autocomplete  search input handler
  $("#search").keyup(function(){
    var valuetosearch = $("#search").val();
    $(".options").hide();
    if (valuetosearch==="") {return; }
    
    // clear options ul childs
    var querystring = wikipediaAPI + "&srlimit=5&srsearch="+ valuetosearch +"&callback=?" ;
    
    var jqxhr = $.getJSON( querystring, function() {
      console.log( "success" );
    })
    .done(function(JSONdata) {
      console.log( "second success" );
      
      //var nextpage = JSONdata["query-continue"].search.sroffset;
      //console.log(nextpage);
      
      $(".options").html("");
      JSONdata.query.search.forEach(function(searchresult){
        //console.log(searchresult);
        var link = $('<li><a class="searchresult" href="#" data-search="'+searchresult.title +'" alt="'+searchresult.title+'" >'+searchresult.title+'</a></li>');
        
        $(".options").append(link);
        
      });
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "complete" );
    });

    // Perform other work here ...

    // Set another completion function for the request above
    jqxhr.complete(function() {
      console.log( "second complete" );
    });
    
    
    $(".options").show();
    $(".options").css("display","block");
  }); // fin click #autocomplete

  // use on to dynamic elements. which do not exist when started
  $('.options').on('click', 'a.searchresult', function() {
    var search = $(this).data("search");
    $("#search").val(search);
    $(".options").hide();
    $("#go").click();
  });

});