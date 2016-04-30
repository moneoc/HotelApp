//fileTransfer.js
var ft = {
    win: function (r) {
        if(r.response == 1){
            window.localStorage.setItem("user",device.uuid);
			$.mobile.loading( "hide" );
			navigator.vibrate(500);
            window.location.href = '#home';
        }
    },
    fail: function (error) {
		$.mobile.loading( "hide" );
        alert("An error has occurred: Code = " + error.code);
    },
    transfer: function(fileURL){
        var options = new FileUploadOptions();
        options.fileKey = "foto";
        options.fileName = "carlos";
        options.mimeType = "image/jpeg";
        
		var ft2 = new FileTransfer();
        ft2.upload(fileURL, "http://carlos.igitsoft.com/apps/test.php", ft.win, ft.fail, options);
    }
};