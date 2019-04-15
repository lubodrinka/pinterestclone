
var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: 160,
    horizontalOrder: true
});
$grid.on( 'click', '.grid-item', function() {
  // change size of item via class
  $( this ).toggleClass('grid-item--gigante');
  // trigger layout
 
  $grid.masonry();
});

$(document).ready(function () {
    let w1 = 160;
    let w2 = 320;
    let w3 = 480;
    let w4 = 640;
    let h1 = 120;
    let h2 = 200;
    let h3 = 260;
    let h4 = 360;
    let widthArr = [w1, w2, w3, w4];
    let heightArr = [h1, h2, h3, h4];



    $('#addValueOptiontoModal').click(function (e) {
        e.preventDefault();
        $('.ModalPollsinputs').append('<input  type="text" name="graphVal" required="required">');
    });

    $('#signout').click(function (e) {

        $.ajax({
            type: "POST",
            url: 'signout',
            data: { signout: false, user_id: code($('#modalUser').attr("value")) },
            dataType: 'json',
            success: 'success'

        });
        $('#signout').hide();
        $('#signin').show();
        $("#socialName").empty();
        $("#socialPhoto").empty();
    });
    $('#signin').click(function (e) {
        $('#signin').hide();
    });

    $('#Home').click(function () {
        $("#navMyPolls").removeClass('active');
        $("#navAllPolls").removeClass('active');
        $("#navHome").addClass('active');
    });
    $.ajax({
        url: '/autologin',
        type: 'post',
        dataType: 'json',
        data: { user: $('#modalSocialType').text() },
        success: function (data) {

            if (data !== "") {

              console.log("67"+(data._id)+ Boolean( (data._id)));
                $('#modalUser').attr("value", Boolean((data.id)) ? JSON.stringify(data.id) : "unregistered");
                $("#socialName").text(data.name);


                $('#signin').hide();
                $('#signout').show();
                // $('#myPolls').show();


                // console.log("50" + JSON.stringify(data));
                // console.log("54"+(data.polls.length+ data.polls ));

                //console.log(data.hasOwnProperty('polls'));-square'
                $("#socialPhoto").attr("src", data.url);
                $("#socialLogo").removeClass();

                $("#socialLogo").addClass('fa fa-' + data.social );

                $.ajax({
                    url: '/myimg',
                    type: 'get',
                    dataType: 'json',
                    data: { user_id: code(data.id) },
                    success: function (data) {

                        $(".grid").empty();
                        //update listalert(data);
                        $("#navHome").removeClass('active');
                        $("#navAllPolls").removeClass('active');
                        $("#navMyPolls").addClass('active');
        
                        getMy(data);
                    }, error: function (err) {
                    
                    }
                });
            } else {
                $('#modalUser').attr("value", "unregistered");
                $("#socialName").hide();
                $("#socialPhoto").hide();

            }
        }
    });
    $('#myPolls').click(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/myimg',
            type: 'get',
            dataType: 'json',
            data: { user_id: code($('#modalUser').attr("value")) },
            success: function (data) {
             
                $(".grid").empty();
                //update listalert(data);
                $("#navHome").removeClass('active');
                $("#navAllPolls").removeClass('active');
                $("#navMyPolls").addClass('active');

                getMy(data);
            }, error: function (err) {
                console.log(err);
            }
        });
    });

    $('#allPolls').click(function (e) {
        e.preventDefault();
        //

        $.ajax({
            url: '/allimg',
            type: 'post',
            dataType: 'json',
            data: { user_id: '' },
            success: function (data) {
                //update listalert(data);
                $(".grid").empty();
                $("#navHome").removeClass('active');
                $("#navMyPolls").removeClass('active');
                $("#navAllPolls").addClass('active');
                getMy(data);
            }
        });
    });

    $('#searchSubmit').click(function (e) { 
        e.preventDefault();
 $.ajax({
   url: '/search',
   type: 'get',
   dataType: 'json',
   data: { search: $('#searchInput').val() },
   success: function (data) {  

    getMy(data);
}
});
});



    function getMy(data) {

//console.log(JSON.stringify(data));
        function imgError(image) {
            image.onerror = "";
            image.src = "./images/placeholder.jpg";
            return true;
        }
        const Winwidth = window.innerWidth;
        let tempWidth = 0;

let logged =JSON.parse($('#modalUser').attr("value")) ;

        // $(".polls").text('My Polls');
        let newlineBoo = false;
        if (data.length > 0) {
            let maxh = 5;
            for (let x = data.length-1 ; x != -1; x--) {
                let w = Math.floor(Math.random() * 3 + 1);
                /* let h =6;
              while (h>maxh){
                    h=    Math.floor(Math.random() * 3 + 1);
                 }
               maxh=h;
 */
                let h = Math.floor(Math.random() * 3 + 1);
                if (newlineBoo) {
                    tempWidth = 0;
                }

                if ((tempWidth + widthArr[w - 1]) > Winwidth) {
                    newlineBoo = true;

                    for (let i = 4; i > 0; i--) {
                        if ((tempWidth + widthArr[i]) < Winwidth) { w = i + 1; }

                    }
                } else {
                    tempWidth += widthArr[w - 1];
                }

                let tooltip = "";
                try {
                    tooltip = Boolean(data[x].comment) ? data[x].comment : "";
                } catch (error) {

                }
          
                let deleteEle=logged===data[x].ID?'<a class="deleteBtn btn " href="/delete/'+data[x]['ID/img'] +'"><p>Delete</p></a>':"";

                $(".grid").append('<div class="grid-item grid-item--width' + w + ' grid-item--height' + h + '" ><img src=' +
                    encodeURI(data[x].imgUrl) + ' onError=this.onerror=null;this.src="./images/placeholder.jpg"; >' +
                    '<span class="comment"  ><div>' + data[x].name + '<p>'+tooltip + '</p>'+deleteEle+'</div></span></div>');


            }

          

        }
    }


    function code(myString) {

        return myString ? JSON.stringify(myString.toString().replace(/"/g, "")) : JSON.stringify("unregistered");

    }






});
