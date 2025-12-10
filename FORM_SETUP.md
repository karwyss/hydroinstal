# Instrukcja konfiguracji formularza

Formularz kontaktowy jest skonfigurowany do wysyłania e-maili. Masz dwie opcje:

---

## Opcja 1: Web3Forms (Aktualnie używane - Zalecane) ✅

**Web3Forms jest prostsze w konfiguracji i działa od razu!**

### Kroki konfiguracji:

1. Przejdź na **https://web3forms.com/**
2. Wprowadź swój adres e-mail (na który chcesz otrzymywać wiadomości)
3. Kliknij "Get Your Access Key"
4. Skopiuj wygenerowany **Access Key** (wygląda jak: `abc123-def456-ghi789`)
5. Otwórz plik `index.html`
6. Znajdź linię 149: `<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">`
7. Zamień `YOUR_WEB3FORMS_ACCESS_KEY` na swój klucz dostępu

**Przykład:**
```html
<input type="hidden" name="access_key" value="abc123-def456-ghi789">
```

**Gotowe!** Formularz będzie wysyłał e-maile na podany adres.

---

## Opcja 2: EmailJS (Alternatywa)

### Kroki konfiguracji:

1. Przejdź na **https://www.emailjs.com/** i utwórz darmowe konto
2. Dodaj usługę e-mail:
   - Kliknij "Add New Service"
   - Wybierz swojego dostawcę (Gmail, Outlook, etc.)
   - Zaloguj się i autoryzuj
3. Utwórz szablon e-maila:
   - Kliknij "Create New Template"
   - Użyj zmiennych: `{{from_name}}`, `{{from_email}}`, `{{message}}`
   - Zapisz Template ID
4. Skopiuj swoje klucze:
   - **Public Key** (z sekcji Account)
   - **Service ID** (z dodanej usługi)
   - **Template ID** (z utworzonego szablonu)
5. Zaktualizuj `index.html`:
   - Dodaj przed `</body>` (przed `script.js`):
   ```html
   <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   <script>
       emailjs.init("YOUR_PUBLIC_KEY");
   </script>
   ```
   - Zamień `script.js` na `script-emailjs.js`:
   ```html
   <script src="script-emailjs.js"></script>
   ```
6. Zaktualizuj `script-emailjs.js`:
   - Znajdź linie z `YOUR_SERVICE_ID` i `YOUR_TEMPLATE_ID`
   - Zamień na swoje wartości

**Przykład w script-emailjs.js:**
```javascript
const SERVICE_ID = "service_abc123";
const TEMPLATE_ID = "template_xyz789";
```

---

## Którą opcję wybrać?

- **Web3Forms** - prostsze, szybsze w konfiguracji, działa od razu
- **EmailJS** - więcej opcji personalizacji, lepsze dla zaawansowanych użytkowników

Formularz automatycznie obsługuje wysyłanie i wyświetla komunikaty sukcesu/błędu.

