//capture.js
var capture = {
    success: function(mf){
        var i, path, len;
        for (i = 0, len = mf.length; i < len; i += 1) {
            path = mf[i].fullPath;
        }
        $('#regFoto').attr('data-foto',path);
        $('#regFoto').html('<img src="'+path+'" style="width:100%;">');
    },
    captureError: function(error) {
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error','Perfecto!');
    },
    takePhoto: function(){
        navigator.device.capture.captureImage(capture.success, capture.captureError, {limit:2});
    }
}