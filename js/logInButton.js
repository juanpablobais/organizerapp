document.getElementById("btnHome").onclick = function () {
    location.href = "./html/selectApp.html";{
        Swal.fire({
            title: 'You logged successfully',
            icon: 'success',
            confirmButtonText: 'Confirm'
          })
    }
};