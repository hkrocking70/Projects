$(document).ready(function() {
    var q = "";
    q = window.location.search;
    if (q == "") {
        q = "?folder=";
    }
    
    $(".contentArea").load("/files/"+q);
    /*
    jQuery(function($) {
        $('.objectLink').click(function() {
            return false;
        }).dblclick(function() {
            window.location = this.href;
            return false;
        });
    });*/
    var count = 1;

    $(".close_message").on("click",function(){
        $(".messageBox").removeClass("animated slideInUp").fadeOut(100);
    });

    $('.submitBox').submit(function() {
        $(".modal").modal("hide");
        $(".messageBox").addClass("animated slideInUp").show();
        $(".msg").html("<i class='fa fa-spinner fa-spin'></i> Processing ..");
        //alert($(this).html());
        $(this).ajaxSubmit({
            error: function(xhr) {
                    status('Error: ' + xhr.status);
            },

            success: function(response) {
                    //console.log(response);
                    $(".contentArea").load("/files/"+q);
                    $(".msg").html("<i class='fa fa-check'></i> "+response);
            }
        });

        return false;
    });    

    $(".contextMenu div").bind("click",function(e){
        e.preventDefault();
        $(".contextMenu").hide();
    });

    $(document).on("contextmenu", function (event) {
        event.preventDefault();
        x = event.pageX;
        y = event.pageY;
        if(!$(event.target).hasClass("topBar")) {
            if ($(".modal").css("display") == "none") {
                if (!$(event.target).parents().eq(2).hasClass("folder")) {
                    $(".contextMenu.generalMenu").show();
                    $(".contextMenu.generalMenu").css({top: y, left: x, position:'absolute'});      
                }

                if (!$(event.target).parents().eq(2).hasClass("file")) {
                    $(".contextMenu.generalMenu").show();
                    $(".contextMenu.generalMenu").css({top: y, left: x, position:'absolute'});      
                }
            }
        }
        event.stopPropagation();
    });

    $(document).on("contextmenu", ".file", function(event){
        event.preventDefault();
        event.stopPropagation();
        x = event.pageX;
        y = event.pageY;
        if ($(".modal").css("display") == "none") {
            t = $(this).find(".objectName").html();
            $(".contextMenu.fileMenu").show();
            $(".contextMenu.fileMenu").css({top: y, left: x, position:'absolute'});   
        }
    });

    $(document).on("contextmenu", ".folder", function(event){
        event.preventDefault();
        event.stopPropagation();
        x = event.pageX;
        y = event.pageY;
        if ($(".modal").css("display") == "none") {
            t = $(this).find(".objectName").html();
            $(".contextMenu.folderMenu").show();
            $(".contextMenu.folderMenu").css({top: y, left: x, position:'absolute'});
        }
    });

    $(".delFolderNav").bind("click",function() {
        $("#delFolder").find(".foName").attr("value",t);
        $("#delFolder").find(".folName").html(t);
    });

    $(".renFolderNav").bind("click",function() {
        $("#renameFolder").find(".oldfoName").attr("value",t);
    });

    $(".delFileNav").bind("click",function() {
        $("#delFile").find(".fiName").attr("value",t);
        $("#delFile").find(".filName").html(t);
    });

    $(".renFileNav").bind("click",function() {
        $("#renameFile").find(".oldfiName").attr("value",t);
    });

    $(document).bind("mousedown", function (e) {    
        if (!$(e.target).parents(".contextMenu").length > 0) {
            $(".contextMenu").hide();
        }
    });
    
    $('#moveOb').on('hidden.bs.modal', function () {
        $(this).removeData();
    });

    $(".movePlaces").load("../assets/include/moveModal.php");

    $(".reloadFolders i").bind("click",function(){
        $(".movePlaces").load("../assets/include/moveModal.php");
    });

    var c = 0;
    $(".add").on("click",function(){
        c = c+1;
        if(c%2 != 0)
            $(".menu").fadeIn();
        else 
            $(".menu").fadeOut();
    });

    $(document).on("click",".topologyButton",function(){
        $(".topologyBody").load("/topology", function(){
            $("#topology").modal("show");
        });
    });
    /*
    $(document).bind('dragover drop', function(event) {
        // Stop default actions - if you don't it will open the files in the browser
        event.stopPropagation();
        event.preventDefault();

        if (event.type == 'drop') {
            files.push(event.originalEvent.dataTransfer.files);
           for(var i=0; i<files.length; i++){
                for(var j=0; j<files[i].length; j++){
                    console.log(files[i][j].name);
                    // alternatively: console.log(filesArray[i].item(j).name);
                }
            }
        }
    });
    */

});
