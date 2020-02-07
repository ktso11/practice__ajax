//signals that the DOM of the page is now ready
//DOM represents HTML as a tree of structured tags, every ele or node is an object
//every node may or may not have children
$(document).ready(function(){






//how are you talking to the server

// Application Programming Interface (API) allows two systems to communicate
//  with one another (hence there are documentations that teaches us how 
// information can be transferred )

// http call with a get request. HTTP request get information from a web app or server
// ENDPOINTS /api/todos  - usually url, from which api can access resources to 
// carry out their function
// https protocol - allows fetching of resources, such as HTML documents (usualy initiated by the web to a server)
// https://gentle-savannah-34520.herokuapp.com DNS

// what is api - how to consume it 

let container = document.querySelector('#recordsContainer')

console.log(container)
// ajax is a jquery tool to allow is to get, post data. 
// ajax is a callback  in nature (delivering a promise)
// async - browser does not wait until a response is received from the server; 
// the user is not prevented from doing something else during the Ajax call

// 1. Send a message to the server from JavaScript running in the browser
// 2. Send a message (i.e. JavaScript code/json?) from the server back to the browser
// 3. Execute the JavaScript (success/err) that was sent from the server in the browser

// CALLBACK - A callback is a function that is to be executed after another
// function has finished executing. It is make sure certain code doesn’t 
// execute until other code has already finished execution.

  $.ajax({
    method: 'GET',
    url: 'https://gentle-savannah-34520.herokuapp.com/api/todos',
    success: function(response){
      let data = response.records
      // for loop is synchronus (aka execute one at a time), better to use within ajax
      // index of iteration is always a clearly defined
      //
      //for each pro - you dont' need to think about the number of index
      for(i=0; i <data.length; i++){
        let record = document.createElement("DIV")
        record.setAttribute("class", "todoRecord")
        let label = document.createElement("LABEL")
        label.innerHTML = data[i].title;
        let span = document.createElement("SPAN")
        span.innerHTML = data[i].date_created;
        let button = document.createElement("BUTTON")
        button.innerHTML = "Edit"
        button.setAttribute("class", "edit")
        button.setAttribute("id", data[i]._id)
        record.appendChild(label)
        record.appendChild(span)
        record.appendChild(button)
        container.appendChild(record);
      }
    },
    //ERR HANDLING - great way to fine-tune your JavaScript and deal with 
    // specific error scenarios
    error: function(err){
      console.log(err)
    }
  })

  //no need to define #add variable because it is a listener, it will always listen. 
  // Listening interaction between a event and element. When the event is prompt, fire the following 
  $('#add').on('click', function(e){
    e.preventDefault(); //PREVENT DEFAULT behaviour event to happen for this selector (submit)
    let newTitle = $('#input').val();
    
    $.ajax({
      type: "POST",
      url: "https://gentle-savannah-34520.herokuapp.com/api/todos",
      data: {
        title: newTitle
        },
      success: function(data){
        console.log(data)
        $('#recordsContainer').prepend(`<div style="display: none;" class="todoRecord"><label>${data.title}</label> <span>${data.date_created} </span><button class="edit" id=${data._id}>Edit</button></div>`).slideDown('500')
        //ANIMATION - used jquery because it is fast great for prototyping, performance wise 
        // it is abit slower than CSS, if speed is the main priority I heard GSAP (js library) 
        // performance is even better than CSS. 
        // one reason jquery is not the best is memory consumption, it triggers momentarily freeze in animation 

        //CSS disadvantage is taxing on GPU (graphics processing unit), which can cause stuttering
        // when browser is under load/issue with mobile device 
        $('#recordsContainer').find('.todoRecord:first').slideDown(500)
      },
      err: function(err){
        console.log(err)
      }
    })
  })

  // EVENT DELEGATION
  // event listeners are set when the DOM loaded, when div create 
  // after listeners will not know its there. FIX: delegate events by 
  // placing onto static element (default)
  // the .on event takes in the paramaters ( events, selector ,data)
  $('#recordsContainer').on('click', '.edit', function(e){
    console.log(e)
    // if(e.target.className === "edit"){
      $('#input').val(e.target.parentNode.firstElementChild.innerHTML)
      $('#input').attr("data",e.target.id)
    // }
  })

  $('#update').on('click', function(e){
    e.preventDefault()
    let newTitle = $('#input').val() 
    let id = $('#input').attr("data") 
    console.log(id)
    $.ajax({
      method: "PUT",
      url: "https://gentle-savannah-34520.herokuapp.com/api/todos/"+id,
      data: {
        // _id: id,
        title: newTitle
        // done: done
        },
      success: function(data){
        console.log(data)
        //good ux to empty input
      },
      err: function(err){
        console.log(err)
      }
    })
  })

});
