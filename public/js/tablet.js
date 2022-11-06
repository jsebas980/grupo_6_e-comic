$(document).ready(function () {
    $('#myTable').DataTable({
      "language": {
        "decimal": "",
        "emptyTable": "No hay datos en la tabla",
        "info": "Mostrando _START_ de _END_ de _TOTAL_ registros",
        "infoEmpty": "Mostrando 0 de 0 de 0 registros",
        "infoFiltered": "(Filtrado de _MAX_ total registros)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ registros",
        "loadingRecords": "Cargando...",
        "processing": "",
        "search": "Filtrar registro:",
        "zeroRecords": "No encuetra registros",
        "paginate": {
          "first": "Primero",
          "last": "Ultimo",
          "next": "Siguiente",
          "previous": "Previo"
        },
        "aria": {
          "sortAscending": ": activar para ordenar la columna de forma ascendente",
          "sortDescending": ": activar para ordenar la columna de forma desendente"
        }
      }
    });
  });
