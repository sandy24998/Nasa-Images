$(document).ready(function(){
    $.ajax({
        url: 'https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo',
        beforSend : function(xhr){
            $('#loading').show();
        },
        success : function(data){
            console.log(data.hdurl);
            $('body').css("background", "url("+data.hdurl+")");
        },
        complete : function(xhr){
            $('#loading').hide();
        }
    });
    $('#search').keypress(function(e){
        if(e.keyCode==13){
        var d = $('#search').val();
        $.ajax({
            url: 'https://images-api.nasa.gov/search?q='+d,
            beforSend : function(xhr){
                $('#search').show();
            },
            success : function(data){
                var t = data.collection.items;
                for(var i=0; i<5; i++){
                    // addTemplate(i);
                    $.ajax({
                        url: t[i].href,
                        success : function(data){                            
                            var t = '<div class="jumbotron"><img class="img-fluid rounded mx-auto d-block" src="'+data[1]+'"></div>';
                            $('#image').append(t);
                        },
                        complete : function(xhr){
                            $('#search').hide();
                            $('body').css("background", "");
                        }
                    });
                };
            },   
        })
        }
    });
});