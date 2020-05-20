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

    var moduleHead = $("#moduleHead");
    var listTop = $("#listTop");
    var listBottom = $("#listBottom");

    var calculatedListHeight = parseInt(rightContentInner.height()) - (parseInt(listTop.outerHeight(true))+parseInt(moduleHead.outerHeight(true)));
    listBottom.height(calculatedListHeight+"px");

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
        return pageContent
    })
    .fail(function(){
        console.log("FAILURE: Loading Page Content");
        return "FAILURE"
    })

}
/*
// This function returns a list of Vehicle Makes.
function getVehicleMakes(){
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
*/

// This function gets or posts data wrapped in a promise from a JSON source
async function getData(url,payload = null){
  var requestMethod;
  if(payload!=null){
    requestMethod = {type:'POST',
                      data: payload};
  }
  else{
    requestMethod = {type:'GET'};
  }
  var responseData = await Promise.resolve(
    $.ajax(url,requestMethod)
    .then(function(data){
      console.log(data);
        var parsedData = JSON.parse(data);
        return parsedData;
    })).catch(function(e){
          return("Failed: "+e.status+" - "+e.responseText);
        });
    return responseData;
}

//This function gets information from non JSON sources
async function getMarkup(url){
  var responseData = await Promise.resolve(
    $.get(url)
    .then(function(data){
        return data;
    })).catch(function(e){
          return("Failed: "+e.status+" - "+e.responseText);
        });
    return responseData;
}

/*
// This is an attempt at wrapping the session storage functions in a promise
async function store(storageName,payload){
  var responseData = await Promise.resolve(

    try {
        sessionStorage.setItem(storageName,JSON.stringify(payload));
    }).
    catch (error) {
      console.log("Failed: "+error.status+' - '+error.responseText);
    }

  )
}
*/



// --------------------------------- DATA MUTATION FUNCTIONS --------------------------------- //
// Functions that work at mutating or creating data in the database

//This function sorts a list of makes alphabetically
function sortListAlphabetically(makes){
  makes.sort((a,b) => (a.makename > b.makename) ? 1 : -1);
  return makes;
}


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

  //Clone the template row
  var templateOrigin = $("#listRowTemplate").clone();
  //Assign the list area to a variable
  var list = $("#listBottom");
  //Initialize the array for all the list items
  var finalList = [];
  //Push the row template to the new list
  finalList.push(templateOrigin);
  //Purge the list area
  list.empty();

  // Iterate on the data set creating each list item
  for(i = 0; i<dataSet.length; i++){

    var template = templateOrigin.clone();

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

    //Push this iteration to the array of list items
    finalList.push(template);
  }

  //Iterate on the items in the array appending each to the list area
  for(i=0;i<finalList.length;i++){
    list.append(finalList[i]);
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
        showImagePreview(fileBox);
        uploadImage(fileBox,'./uploadManufacturerLogo.php')
        console.log(response);
      }
    }
  }
}


// This function shows the uploaded file as the
// background image of the image window prior to Loading
// and sets the loader to visible and full cover.
function showImagePreview(input){
  if(input.files && input.files[0]){
    var reader = new FileReader();
    reader.onload = function(e){
      $("#manufacturerImage").css({'background-image':'url('+e.target.result+')'});
      $("#uploadImageText").addClass("hide");
      $("#imageLoader").removeClass("hide");
    }
    reader.readAsDataURL(input.files[0]);
  }
  else{
    console.log("No files selected");
  }
}

function saveNewManufacturer(){

  //NOTE: Need to revise the operations of this so that each validation is not nested
  //      and that any unvalidated fields simply raise a flag.

  //Assign each element on the page to a variable
  var make = $("#makename");
  var origin = $("#countryOrigin");
  var active = $("#activeRecord");
  var fileBox = document.getElementById('upload');

  //Remove redBorder class where necessary



  //Check that the manufacturer / make name is present
  if(make.val().length<1){
    alert('Makufacturer name must be entered.');      //If it is not present make an alert
    make.parent().addClass("redBorder");
    make.focus();
  }
  else{
    make.parent().removeClass("redBorder");            //If makename is present check that a file has been selected for the image.
    if(fileBox.files && fileBox.files[0]){            // if it had been it was uploaded previously to a temp file on the server.
      var data = {file: fileBox.files[0].name,        // Place all the Manufacturer information into an object ready for handoff to the server
                  makename: make.val(),
                  origin: origin.val(),
                  active: active.val()};

      $("#manufacturerImage").removeClass("redBorder");

      //POST the data to the server
      console.log(data);
    }
    else{
      alert('No image has been selected.');          //If there was no image selected notify the user.
      $("#manufacturerImage").addClass("redBorder");
    }
  }


  /*
  $.post('./saveNewManufacturer.php',{make:make, origin:origin,active:active},function(data){

  });
  */
}

// This function uploads the image to the server
function uploadImage(fileInput,destination){
  var formData = new FormData();
  formData.append('userfiles',fileInput.files[0]);
  $.ajax({url: destination,
          type: 'POST',
          data: formData,
          xhr: function(){
            var xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener('progress', function(evt){
              if(evt.lengthComputable){
                var percentComplete = evt.loaded / evt.total;
                var newWidth = Math.round((1 - percentComplete) * 100);
                console.log(newWidth);
                $("#imageLoader").css({'width': newWidth+'%',bottom:'0px',right:'0px'});
              }
            },false);
            return xhr;
          },
          success: function(data){
            console.log("Uploaded");
          },
          cache: false,
          contentType: false,
          processData: false
        });
};


// --------------------------------- EXECUTION LOGIC --------------------------------- //
async function loadMakes(){

  try {
    const vehicleMakes = await getData('./loadVehicleMakes.php');
    vehiclemakes = sortListAlphabetically(vehicleMakes);
    sessionStorage.setItem('fullSet',JSON.stringify(vehicleMakes));
    //sessionStorage.setItem('subSet',JSON.stringify(vehicleMakes));
    populateList(vehicleMakes);
  }
  catch (error){
    console.log('Failed: '+error.status+' - '+error.responseText);
    return('Failed: '+error.status+' - '+error.responseText);
  }

}              // Get the list of vehicle makes.



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


loadMakes(); //Loads the vehicles into the DOM

//Add all the event listeners for the page
$(document).on({click:function(){closeModal()}},'#modalClose');
$(document).on({click:function(){openModal()}},'#newMakeButton');
$(document).on({change:function(e){listFiles(e)}},'#upload');
$(document).on({click:function(){saveNewManufacturer()}}, '#saveMakeButton');
//Attempt at getting debug bar logging working.
/*
var logInfo = {message:'Is it working',logLevel:'LOG_INFO'};
getData('./dolibarrLogging.php',JSON.stringify(logInfo));
*/
}); // End document ready state code block
