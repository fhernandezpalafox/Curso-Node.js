eliminarUsuario  =  function(id){

  $.post("/Eliminar",{
    id: id,
  },
  function(data,status){
     if (parseInt(data) == 1) {
         alert("Se elimino correctamente");
         window.location.reload();
      }else if(parseInt(data) == 2){
        alert("No se puede eliminar un usuario que sea mayor de 28");
      }
      else{
         alert("Error");
      }
  });
}
