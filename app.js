
var lista=["1. open","2. high","3. low","4. close","5. volume"];


$(document).ready(function(){
	$("#tipo").change(function(){
		var tipo = $("#tipo").val();
		
		
			if(tipo=="Intraday"){
	
				$("#intervalo").removeAttr("disabled");
			}else{
				$("#intervalo").prop("disabled","true");
			}
		});

	$("#submit").click(function(){
		
		var tipo = $("#tipo").val();
		var intervalo = $("#intervalo").val();
		var simbolo = $("#simbolo").val();
		

		$(".clm_principal").remove();
		var url="https://ejerciciospark.herokuapp.com/Facadea?periodo=" + tipo + "&simbolo=" + simbolo;
		//var url="http://localhost:4567/Facadea?periodo=" + tipo + "&simbolo=" + simbolo;
		var	seleccion="Time Series";
		if(tipo=="Intraday"){
			url = url + "&intervalo=" + intervalo;
			seleccion="Time Series ("+ intervalo +"min)";
		}else if(tipo=="Daily"){
			seleccion="Time Series (Daily)";
		}else if(tipo=="Weekly"){
			seleccion="Weekly Time Series";
		}else if(tipo=="Monthly"){
			seleccion="Monthly Time Series";
		}
		console.log(url);
		$("#titulo_tabla").html(seleccion);
	
		fetch(url).then(response => response.json()).then(
			
			function(data){
				var columnas="";
				var periodo=data[seleccion];
				
				for(const property in periodo){
					columnas=columnas+'<tr class="clm_principal"><th scope="row">'+property+"</th>"
					for(const nombre in lista){
						columnas=columnas+"<td>"+periodo[property][lista[nombre]]+"</td>";
					}
					columnas=columnas+"</tr>";
				}
				
				$("#tabla_fechas").append(columnas);
				
			});
		
		
		
	});
	
	
});
	

	