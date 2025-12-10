// Alternatywna wersja z EmailJS - użyj tego pliku zamiast script.js jeśli chcesz EmailJS
// Pamiętaj: dodaj EmailJS SDK do index.html przed tym skryptem

const popup = document.getElementById("kontakt-popup");
const openBtn = document.getElementById("kontakt-link");
const closeBtn = document.getElementById("close-popup");

$(document).ready(function() {
    const $popup = $("#kontakt-popup");
    const $content = $(".popup-content");

    $(".kontakt-link").click(function() {
        $popup.fadeIn(200);
        $content.fadeIn(300);
    });

    $("#close-popup").click(function() {
        $content.fadeOut(300, function() {
            $popup.fadeOut(200);
        });
    });

    $popup.click(function(e) {
        if (e.target.class === "kontakt-popup") {
            $content.fadeOut(300, function() {
                $popup.fadeOut(200);
            });
        }
    });
});


$(document).ready(function() {
    const $popup = $("#query-popup");
    const $content = $(".popup-content", $popup);

    // Otwórz popup formularza
    $("#send-query").click(function() {
        $popup.fadeIn(200);
        $content.fadeIn(300);
    });

    // Zamknij popup po kliknięciu ×
    $("#close-query").click(function() {
        $content.fadeOut(300, function() {
            $popup.fadeOut(200);
        });
    });

    // Zamknij po kliknięciu w tło
    $popup.click(function(e) {
        if (e.target.id === "query-popup") {
            $content.fadeOut(300, function() {
                $popup.fadeOut(200);
            });
        }
    });

    // Obsługa formularza - EmailJS
    $("#query-form").submit(function(e) {
        e.preventDefault();
        
        // Ukryj poprzednie komunikaty
        $("#query-success").hide();
        $("#query-error").hide();
        $("#query-loading").show();
        
        // Wyłącz przycisk podczas wysyłania
        const $submitBtn = $("#submit-btn");
        $submitBtn.prop("disabled", true).text("Wysyłanie...");
        
        // Przygotuj parametry dla EmailJS
        const templateParams = {
            from_name: $("input[name='name']").val(),
            from_email: $("input[name='email']").val(),
            message: $("textarea[name='message']").val(),
            to_name: "Hydroinstal Paweł Juszczak"
        };
        
        // Wyślij przez EmailJS
        // ZMIEŃ TE WARTOŚCI na swoje z EmailJS:
        const SERVICE_ID = "YOUR_SERVICE_ID";
        const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
        
        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then(function(response) {
                $("#query-loading").hide();
                $("#query-success").show();
                $("#query-form")[0].reset();
                
                setTimeout(function() {
                    $content.fadeOut(300, function() {
                        $popup.fadeOut(200);
                        $("#query-form").show();
                        $("#query-success").hide();
                        $submitBtn.prop("disabled", false).text("Wyślij");
                    });
                }, 2000);
            }, function(error) {
                $("#query-loading").hide();
                $("#query-error").text("Wystąpił błąd. Spróbuj ponownie.").show();
                $submitBtn.prop("disabled", false).text("Wyślij");
                
                setTimeout(function() {
                    $("#query-error").fadeOut();
                }, 3000);
            });
    });
});

