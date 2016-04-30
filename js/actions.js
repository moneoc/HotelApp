var fn = {
    ready: function(){
        document.addEventListener("deviceready", fn.init, false);
    },
    init: function(){
		//Funcionalidades para el registro
        if(!fn.estaRegistrado())
            window.location.href = '#registro';
        $('#registro div[data-role=footer] a').tap(fn.registrar);
        $('#tomarFoto').tap(capture.takePhoto);
		//Funcionalidades para reservar
		$('#nr1 div[data-role=navbar] a:eq(0)').tap(fn.siguientePaso);
		$('#nr2 ul[data-role=listview] a').tap(fn.seleccionaHabitacion);
		$('#nr2 div[data-role=navbar] a:eq(0)').tap(fn.obtenerReserva);
		
		//Sincronizar automàticamente cuado se conecte a internet
		document.addEventListener("online", almacen.leerReservas, false);
    },
    // ------ Funciones de Registro -------
    estaRegistrado: function(){
        var usr = window.localStorage.getItem("user");
        if(usr == undefined || usr == '')
            return false;
        else
            return true;
    },
    registrar: function(){
        var nom = $('#regNom').val();
        var mail = $('#regMail').val();
        var tel = $('#regTel').val();
        var foto = $('#regFoto').data('foto');
        
        if(nom != '' && mail != '' && tel != '' && foto != undefined){
			$.mobile.loading( "show", {
				theme: 'b'
			});
            $.ajax({
                method: "POST",
                url: "http://carlos.igitsoft.com/apps/test.php",
                data: { nom: nom, mail: mail, tel: tel },
                error: function(jq,txt){
					$.mobile.loading( "hide" );
                    alert(jq+txt);
                }
            }).done(function( msg ) {
                alert(msg);
                if(msg == 1)
                    ft.transfer(foto);
            });
        }else
            alert('Todos los campos son requeridos');
    },
	//Funciones de Reserva
	per: '',
	dia: '',
	th: '',
	siguientePaso: function(){
		fn.per = $('#nrPer').val();
		fn.dia = $('#nrDia').val();
		if(fn.per != '' && fn.dia != '')
			window.location.href = "#nr2";
		else
			navigator.notification.alert("Todos los campos son requeridos", null, "Error al llenar", "Aceptar");
	},
	seleccionaHabitacion: function(){
		$(this).parent().parent().find('a').css('background-color','transparent');
		$(this).css('background-color','#00ff00');
		fn.th = $(this).parent().index();
	},
	obtenerReserva: function(){
		if(fn.th != ''){
			if(navigator.connection.type != Connection.NONE)
				server.sincronizar(fn.per,fn.dia,fn.th);//Enviar a servidor
			else
				almacen.guardarReserva(fn.per,fn.dia,fn.th);//Guardar Localmente
		}else
			navigator.notification.alert("Debe seleccionar tipo de habitaciòn", null, "Error al llenar", "Aceptar");
	}
};

$(fn.ready);