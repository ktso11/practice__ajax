
$(document).ready(function(){


let container = document.querySelector('#recordsContainer')

console.log(container)


  $.ajax({
    method: 'GET',
    url: 'https://gentle-savannah-34520.herokuapp.com/api/todos',
    success: function(response){
      let data = response.records
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

    error: function(err){
      console.log(err)
    }
  })
  $('#add').on('click', function(e){
    e.preventDefault(); 
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
          $('#recordsContainer').find('.todoRecord:first').slideDown(500)
      },
      err: function(err){
        console.log(err)
      }
    })
  })


  $('#recordsContainer').on('click', '.edit', function(e){
    console.log(e)
      $('#input').val(e.target.parentNode.firstElementChild.innerHTML)
      $('#input').attr("data",e.target.id)
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
        title: newTitle
        },
      success: function(data){
        console.log(data)
   
      },
      err: function(err){
        console.log(err)
      }
    })
  })

});
