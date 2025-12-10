const popup = document.getElementById("kontakt-popup");
const openBtn = document.getElementById("kontakt-link");
const closeBtn = document.getElementById("close-popup");

// Mobile menu toggle
$(document).ready(function() {
    const $menuToggle = $(".mobile-menu-toggle");
    const $navLinks = $(".nav-links");
    
    $menuToggle.click(function() {
        $(this).toggleClass("active");
        $navLinks.toggleClass("active");
    });
    
    // Close menu when clicking on a link
    $navLinks.find("a").click(function() {
        $menuToggle.removeClass("active");
        $navLinks.removeClass("active");
    });
    
    // Close menu when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest(".navbar").length) {
            $menuToggle.removeClass("active");
            $navLinks.removeClass("active");
        }
    });
});

$(document).ready(function() {
    const $popup = $("#kontakt-popup");
    const $content = $(".popup-content");

    $(".kontakt-link").click(function() {
        $popup.fadeIn(200); // pokaz tło
        $content.fadeIn(300); // eleganckie pojawienie okienka
    });

    $("#close-popup").click(function() {
        $content.fadeOut(300, function() {
            $popup.fadeOut(200); // zamknij tło po animacji
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

    // Obsługa formularza - Web3Forms
    $("#query-form").submit(function(e) {
        e.preventDefault(); // nie przeładowuj strony
        
        // Ukryj poprzednie komunikaty
        $("#query-success").hide();
        $("#query-error").hide();
        $("#query-loading").show();
        
        // Wyłącz przycisk podczas wysyłania
        const $submitBtn = $("#submit-btn");
        $submitBtn.prop("disabled", true).text("Wysyłanie...");
        
        // Pobierz wszystkie dane z formularza
        const formData = {
            access_key: $("input[name='access_key']").val(),
            subject: $("input[name='subject']").val(),
            name: $("input[name='name']").val(),
            email: $("input[name='email']").val(),
            message: $("textarea[name='message']").val(),
            from_name: "Hydroinstal Formularz"
        };
        
        // Wyślij dane przez AJAX do Web3Forms
        $.ajax({
            url: "https://api.web3forms.com/submit",
            method: "POST",
            data: formData,
            dataType: "json",
            success: function(response) {
                if (response.success) {
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
                } else {
                    $("#query-loading").hide();
                    $("#query-error").text("Błąd: " + (response.message || "Spróbuj ponownie")).show();
                    $submitBtn.prop("disabled", false).text("Wyślij");
                    
                    setTimeout(function() {
                        $("#query-error").fadeOut();
                    }, 3000);
                }
            },
            error: function(xhr, status, error) {
                $("#query-loading").hide();
                $("#query-error").text("Wystąpił błąd. Sprawdź połączenie i spróbuj ponownie.").show();
                $submitBtn.prop("disabled", false).text("Wyślij");
                
                // Ukryj błąd po 3 sekundach
                setTimeout(function() {
                    $("#query-error").fadeOut();
                }, 3000);
            }
        });
    });
});
