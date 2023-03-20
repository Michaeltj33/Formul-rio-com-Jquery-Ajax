let result = "";
$("#form1").submit(function (event) {
  event.preventDefault();
  $("#resp").css({ color: "#43D1AF" });
  $("#resp").text("Salvando Arquivos");

  let tamCel = $("#celular").val();

  if (tamCel.length == 15) {
    result = "Enviado...";
    $("#resp").css({ opacity: 1 });
    $("#submit").attr("disabled", true);
    $("#submit").css({ backgroundColor: "#d8e1e6" });
    $.ajax({
      type: "post",
      url: "cadastrar.php",
      data: $("#form1").serialize(),
      success: function (response) {
        $("#resp").text("Cadastrado com Sucesso");
        $("#resp").css({ color: "#43d1af" });
        console.log(response);
        $("#submit").attr("disabled", false);
        $("#submit").css({ backgroundColor: "#2EBC99" });

        //apaga os dados escritos na tela
        $("#nome").val("");
        $("#email1").val("");
        $("#celular").val("");
        $("#cpf").val("");
        $("#rendaFamiliar").val("");
        $("#submit").val("Salvar");
        deixarVazio("#resp", 5);
      },
      //começa Erros
      error: function (e) {
        $("#resp").text("Erro ao salvar");
        console.log(e);
        $("#submit").attr("disabled", false);
        $("#submit").css({ backgroundColor: "#d14545" });
        $("#resp").css({ color: "#d14545" });

        $("#submit").val("Reenviar Dados");
      },
    });
    $("#resp").text(result);
  } else {
    $("#resp").css({ color: "#eb1809" });
    $("#resp").text("Celular inválido");
  }
});

$("#nome").keyup(function () {
  soNome();
});

$("#nome").keypress(function () {
  soNome();
});

$("#email1").keyup(function () {
  removeEspacoEmail();
});

$("#email1").keypress(function () {
  removeEspacoEmail();
});

$("#celular").keyup(function () {
  telefone();
});

$("#celular").keypress(function () {
  telefone();
});

$("#cpf").keyup(function () {
  cpfCnpj();
});

$("#cpf").keypress(function () {
  cpfCnpj();
});

/* $("#nome").focusout(function () {
  soNome();
}); */

function deixarVazio(vazio, tempo) {
  let tempTotal = tempo / 2;
  console.log(tempTotal);
  setTimeout(() => {
    $(vazio).animate({ opacity: "0" }, { duration: tempTotal * 1000 });
  }, 1000 * tempTotal);
}

function somenteLetra(text) {
  return text.replace(
    /[^a-z àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇA-Z]/g,
    ""
  );
}

function justNumbers(text) {
  var numbers = text.replace(/[^0-9]/g, "");
  return numbers;
}

function soNome() {
  var n = document.getElementById("nome").value;
  n = somenteLetra(n);
  n = removeEspaco(n);
  document.getElementById("nome").value = n;
}

function removeEspacoEmail() {
  var n = document.getElementById("email1").value;
  document.getElementById("email1").value = "";
  n = removeEspaco(n);
  n = n.replace(" ", "");
  document.getElementById("email1").value = n;
}

function removeEspaco(text) {
  while (true) {
    if (text.indexOf("  ") !== -1) {
      text = text.replace("  ", " ");
    } else {
      break;
    }
  }
  return text;
}

function cpfCnpj() {
  var pegaTecla = event.keyCode;
  var tel = document.getElementById("cpf").value;
  if (pegaTecla == 8) {
    if (tel.length == 4) {
      document.getElementById("cpf").value = tel[0] + tel[1] + tel[2];
    } else if (tel.length == 8) {
      document.getElementById("cpf").value =
        tel[0] + tel[1] + tel[2] + "." + tel[4] + tel[5] + tel[6];
    } else if (tel.length == 12) {
      document.getElementById("cpf").value =
        tel[0] +
        tel[1] +
        tel[2] +
        "." +
        tel[4] +
        tel[5] +
        tel[6] +
        "." +
        tel[8] +
        tel[9] +
        tel[10];
    }
  } else {
    tel = justNumbers(tel);
    document.getElementById("cpf").value = "";
    for (var x = 0; x < tel.length; x++) {
      if (x == 2 || x == 5) {
        document.getElementById("cpf").value += tel[x] + ".";
      } else if (x == 8) {
        document.getElementById("cpf").value += tel[x] + "-";
      } else {
        document.getElementById("cpf").value += tel[x];
      }
    }
  } // esse else faz parte no caso não for digitado backSpace
}

function telefone() {
  var pegaTecla = event.keyCode;
  var tel = document.getElementById("celular").value;
  if (pegaTecla == 8) {
    if (tel.length == 1) {
      document.getElementById("celular").value = "";
    } else if (tel.length == 3) {
      document.getElementById("celular").value = "(" + tel[1];
    } else if (tel.length == 6) {
      document.getElementById("celular").value =
        "(" + tel[1] + tel[2] + ")" + tel[4];
    } else if (tel.length == 13) {
      document.getElementById("celular").value =
        "(" +
        tel[1] +
        tel[2] +
        ")" +
        tel[4] +
        "." +
        tel[6] +
        tel[7] +
        tel[8] +
        tel[9];
    }
  } else {
    tel = justNumbers(tel);
    document.getElementById("celular").value = "";
    if (tel.length > 11) {
      tel = tel.replace("55", "");
    }

    for (var x = 0; x < tel.length; x++) {
      if (x == 0) {
        document.getElementById("celular").value += "(" + tel[x];
      } else if (x == 1) {
        document.getElementById("celular").value += tel[x] + ")";
      } else if (x == 2) {
        document.getElementById("celular").value += tel[x] + ".";
      } else if (x == 6) {
        document.getElementById("celular").value += tel[x] + "-";
      } else {
        document.getElementById("celular").value += tel[x];
      }
    }
  }
}
