/* Javascript library of module Autolist */


// --------------------------------- LAYOUT FUNCTIONS --------------------------------- //

function resetLeftMenuHeight(topMenuHeight) {
  // Make the height of the left menu the full page height.
  $('#id-left').parent().height('calc(100vh - '+topMenuHeight+'px)');   // Set the left menu to the full height of the window minus the top menu
}



function resetRightContentHeight(topMenuHeight){
  // Make the right content area the exact height of the window minus the top menu height
  $('#id-right').parent().height('calc(100vh - '+topMenuHeight+'px)');   // Set the right content area to the full height of the window minus the top menu
}



function setupLayout(topMenuHeight,sideMenuWidth) {
  // Get the height of fiche and its title and set the size of our content wrapper to fit the page perfectly without scroll.

  var rightContent = $("#id-right");  //Get the right content area element

  // Load the page DOM content
  var pageContent = $.get('./pageContent.html');

  // When the page content is successfully loaded from the file, continue with the page setup.
  pageContent.done(function(data){

    rightContent.empty().html(data);   // Inject list area element into the rightContent element/div
    rightContent.css({'padding':'0','position':'relative','width':'100%','overflow-y':'hidden','overflow-x':'hidden'});             // Modify the css properties of the rightContent element. NOTE: JavaScript injected opposed to css so as to not affect the entire website.

    var rightContentInner = $("#rightContentInner");                                    // Set the element to a variable so it isn't searched for in the DOM on every use.
    rightContentInner.height('calc(100vh - '+topMenuHeight+'px)');                      // Set the height of the element to window minus top menu height.
    rightContentInner.width('100%');                                                    // Set the element width to 100% of it's parent element.

  })
  .fail(function(xhr){
    console.log('FAILURE: Can not get page content', xhr);
  })




}


// --------------------------------- DATA AQUISITION FUNCTIONS --------------------------------- //
// Functions that are for selecting information from the database.

// This function loads the DOM objects for the page from a html file.
function getPageContent(){
  var pageContent = null;
  $.get('./pageContent.html')
    .done(function(data){
        pageContent = data;
        console.log("Page Content Imported");
        console.log(data);
        return pageContent
    })
    .fail(function(){
        console.log("FAILURE: Loading Page Content");
        return "FAILURE"
    })

}

// This function returns a list of Vehicle Makes.
async function getVehicleMakes(){
  var vehicleMakes = null;
  $.get('./loadVehicleMakes.php')
    .done(function(data){
        vehicleMakes = JSON.parse(data);
        vehicleMakes.sort((a,b) => (a.makename > b.makename) ? 1 : -1);
        console.log("Successfully loaded Vehicle Manufacturers");
        console.log(vehicleMakes);
        populateList(vehicleMakes);
        sessionStorage.setItem('fullSet',JSON.stringify(vehicleMakes));
        sessionStorage.setItem('subSet',JSON.stringify(vehicleMakes));

    })
    .fail(function(){
        console.log('FAILURE: Loading Vehicle Manufacturers');
    })


  return vehicleMakes;
}


// --------------------------------- DATA MUTATION FUNCTIONS --------------------------------- //
// Functions that work at mutating or creating data in the database



// --------------------------------- DATA DELETION FUNCTIONS --------------------------------- //
// Functions that work at deleting data in the database


// --------------------------------- DOM FUNCTIONS --------------------------------- //
// Functions that make changes to the DOM (Document Object Model a.k.a View on screen)
function openModal(){
    console.log("Open Modal");
    $('#moduleModal').removeClass('hide').addClass('show');
    $('#moduleOverlay').removeClass('hide').addClass('show');
}

function closeModal(){
    console.log("Close Modal");
    $('#moduleModal').removeClass('show').addClass('hide');
    $('#moduleOverlay').removeClass('show').addClass('hide');
}

//Change the state of the toggle to the opposite of its current state
function toggleEntry(e){
  var row = $("#row_"+e.target.id);
  var toggle = row.children('.active').children('.toggle');
  if(toggle.hasClass('toggleOn')){
    toggle.removeClass('toggleOn').addClass('toggleOff');
    return false;
  }
  else{
    toggle.removeClass('toggleOff').addClass('toggleOn');
    return true;
  }
}

//This function regenerates the list onscreen for a given dataset.
function populateList(dataSet){

  var template2 = $("#listRowTemplate").clone();
  $("#listBottom").empty().append(template2);

  for(i = 0; i<dataSet.length; i++){

    var template = $("#listRowTemplate").clone();

    if(parseInt(dataSet[i].published)===1){
      template.children('.active').children('.toggle').removeClass('toggleOff').addClass('toggleOn');
    }
    else{
      template.children('.active').children('.toggle').removeClass('toggleOn').addClass('toggleOff');
    }
    template.children('.active').children('.toggle').attr('id',dataSet[i].rowid);
    template.attr('id','row_'+dataSet[i].rowid).removeClass('hide');
    template.children('.image').children('.logo').attr('src','/custom/autos/images/'+dataSet[i].make_logo);
    template.children('.make').html(dataSet[i].makename);
    template.children('.origin').html('');

    console.log(template);

    $("#listBottom").append(template);
  }
}

// This function filters an array by the searchterm specified in the events target value.
function sortQuery(e){

  //Get the search term
  var searchTerm = e.target.value.toLowerCase();

  //Retrieve the full set of data from client side session storage
  var subSet = JSON.parse(sessionStorage.getItem('fullSet'));

  //create the filtered set of data by filtering the full set
  var newSubSet = subSet.filter(row => row.makename.toLowerCase().includes(searchTerm));

  //Run the populateList function to redraw the list onscreen
  populateList(newSubSet);
}


//This function shows the list of files selected in the file upload field.
function listFiles(event){

  var fileBox = event.target;               //Set the filebox variable to the target element of the event

  if('files' in fileBox){                   //Check there is a files object in the element
    if(fileBox.files.length == 0){          //Check the files object is not empty
      console.log("No Files Selected");
    }
    else{
      for(i=0;i<fileBox.files.length;i++){  //Iterate through the file list
        var file =  fileBox.files[i];
        var response = '';
        response += 'File '+i;
        if('name' in file){
          response += ' - Name: '+file.name;
        }
        if('size' in file){
          response += ' - Size: '+file.size+' bytes'
        }
        console.log(response);
      }
    }
  }
}


// --------------------------------- EXECUTION LOGIC --------------------------------- //

$(document).ready(function() {     //Awaits the document ready state ensuring that Dolibarr is fully loaded.
  // Find the current sizes in the page
  var topMenuHeight = parseInt($('#id-top').outerHeight());             // Get the height of the top menu
  var sideMenuWidth = parseInt($('#id-left').outerWidth());             // Get the height of the top menu

  //Get the current path
  var pathname = window.location.pathname;  // Get the current URL path after the domain / TLDs and port.
  pathname = pathname.split("/");           // Split the path into an array by the "/" delimiter
  pathname.splice(0,1);                     // Remove the first blank array entry
  console.log(pathname);

  // Make the height of the left menu the full page height.
  resetLeftMenuHeight(topMenuHeight); // Always perform this fucntion

  // Only set the page up for the AutoList module if the URL matches the Custom / AutoList Module.
  if(pathname[0]==='custom' && pathname[1]==='autolist'){
    resetRightContentHeight(topMenuHeight);
    setupLayout(topMenuHeight,sideMenuWidth);
  }

var makes = getVehicleMakes();              // Get the list of vehicle makes.

//Add all the event listeners for the page
$(document).on({click:function(){closeModal()}},'#modalClose');
$(document).on({click:function(){openModal()}},'#newMakeButton');
$(document).on({change:function(e){listFiles(e)}},'#upload');

}); // End document ready state code block
