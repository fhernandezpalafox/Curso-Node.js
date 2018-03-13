var PI= 3.1416;

function sumar(a,b){
    return a + b;
}

function restar(a,b){
    return a - b;
}

function multiplicacion(a,b){
    return a * b;
}

function dividir(a,b){
  
     if (b == 0) 
     {
        Error();
     }else 
     {
     	return a/b;
     }
}

function Error(){
	console.log("No se puede dividir entre cero");
}


exports.sumar = sumar;
exports.restar = restar;
exports.multiplicacion = multiplicacion;
exports.dividir = dividir;
exports.PI = PI;







