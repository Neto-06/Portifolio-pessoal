$(function () {
  // MENU MOBILE
  $("nav.menu-mobile").click(function () {
    $(this).find("ul").slideToggle();
  });

  // ANIMAÇÃO BOTÃO
  $(".container-submit,.container-button").hover(
    function () {
      $(this).addClass("hovered");
    },
    function () {
      $(this).removeClass("hovered");
    }
  );

  $(".container-submit,.container-button").on({
    mousedown: function () {
      $(this).addClass("active");
    },
    mouseup: function () {
      $(this).removeClass("active");
    },
    touchstart: function () {
      $(this).addClass("active");
    },
    touchend: function () {
      $(this).removeClass("active");
    },
  });

  //SCROLL DA NAV
  $("header nav a").click(function (e) {
    e.preventDefault();

    var href = $(this).attr("href");
    var posicao = $(href).offset().top;

    if (href == "#projects") {
      $("html, body").animate(
        {
          scrollTop: posicao + 70,
        },
        1000
      );
    } else {
      $("html, body").animate(
        {
          scrollTop: posicao,
        },
        1000
      );
    }
  });


  //ADD E REMOVENDO A DIV informations-button
  $("#informations-button").hide(); 

  $(".btn-informations").click(function(e){
    e.preventDefault();

    $("#informations-button").slideToggle();
    
  })




  
  //VALIDAÇAO DE FORMULARIO

  var nome = $("input[name=nome]");
  var email = $("input[name=email]");
  var telefone = $("input[name=telefone]");
  var mensagem = $("textarea[name=mensagem]");
  var submit = $("input[type=submit]");
  //FUNÇAO PARA RESETAR ESTILO
  $(
    "input[name=nome], input[name=email], input[name=telefone], textarea[name=mensagem]"
  ).focus(function () {
    resetarEstilo($(this));
  });

  $(".contact-form #formulario").ajaxForm({
    dataType: "json",
    beforeSubmit: function () {
      var inputnome = nome.val();
      var inputemail = email.val();
      var inputtelefone = telefone.val();
      var inputmensagem = mensagem.val();

      if (!validarNome(nome, inputnome)) {
        return false;
      } else if (!validarEmail(email, inputemail)) {
        return false;
      } else if (!validarTelefone(telefone, inputtelefone)) {
        return false;
      } else if (!validarMensagem(mensagem, inputmensagem)) {
        return false;
      }

      //DESATIVANDO O BOTAO E MUDANDO A OPACIDADE
      submit.prop("disabled", true);
      submit.val("Enviando...");
      submit.css("opacity", "0.5");
      return true;
    },
    success: function () {
      limparCampos(nome, email, telefone, mensagem);
      alert("Mensagem enviada com sucesso!");

      //ATIVANDO O BOTAO E VOLTANDO A OPACIDADE
      submit.prop("disabled", false);
      submit.val("Enviar");
      submit.css("opacity", "1");
    },
    error: function () {
      alert("Erro ao enviar formulário!");
      submit.prop("disabled", false);
      submit.val("Enviar");
      submit.css("opacity", "1");
    },
  });
  //FUNÇAO PARA VALIDAR NOME
  function validarNome(nome, inputnome) {
    var splitStr = inputnome.split(" ").filter(Boolean); //FILTER(BOOLEAN)REMOVE OS ESPACOS
    var amount = splitStr.length;

    if (inputnome === "") {
      campoInvalido(nome);
      return false;
    }

    if (amount < 2) {
      campoInvalido(nome);
      return false;
    }

    for (var i = 0; i < amount; i++) {
      var palavra = splitStr[i];
      var palavraMinuscula = palavra.toLowerCase();

      if (
        palavraMinuscula == "de" ||
        palavraMinuscula == "do" ||
        palavraMinuscula == "da" ||
        palavraMinuscula == "das" ||
        palavraMinuscula == "dos"
      ) {
        continue;
      }

      if (!palavra.match(/^[A-ZÀ-Ú][a-zà-ú]+([ '-][A-Za-zÀ-ú]+)*$/)) {
        campoInvalido(nome);
        return false;
      }
    }

    return true;
  }

  //FUNÇAO PARA VALIDAR EMAIL
  function validarEmail(email, inputemail) {
    if (inputemail === "") {
      campoInvalido(email);
      return false;
    }

    if (!inputemail.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/i)) {
      campoInvalido(email);
      return false;
    }

    return true;
  }

  //FUNÇAO PARA VALIDAR TELEFONE
  function validarTelefone(telefone, inputtelefone) {
    var divError = $(".error-tel");

    if (inputtelefone === "") {
      campoInvalido(telefone);
      return false;
    }

    if (!inputtelefone.match(/^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/)) {
      campoInvalido(telefone);
      divError.html("Digite no formato (00) 00000-0000");
      return false;
    } else {
      divError.html("");
    }

    return true;
  }

  //FUNÇAO PARA VAIDAR MENSAGEM
  function validarMensagem(mensagem, inputmensagem) {
    if (inputmensagem === "") {
      campoInvalido(mensagem);
      return false;
    }

    return true;
  }

  //FUNÇOES DE ESTILO
  function campoInvalido(el) {
    el.css("border-color", "red");
    el.css("color", "red");
    el.removeClass("animate-input"); //REMOVE SE JÁ TIVER ANIMADO
    void el[0].offsetWidth;
    el.addClass("animate-input"); //ANIMA DNV
  }

  function resetarEstilo(el) {
    el.css("border-color", "");
    el.css("color", "");
  }

  function limparCampos(el1, el2, el3, el4) {
    el1.val("");
    el2.val("");
    el3.val("");
    el4.val("");
  }
  
});
