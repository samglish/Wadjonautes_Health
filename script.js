const form = document.getElementById('form');
const formContent = document.getElementById('form-content');
const toggleBtn = document.getElementById('toggle-btn');

let isLoginMode = true;

function toggleForm() {
    if (isLoginMode) {
        // Mode inscription
        formContent.innerHTML = `
            <div class="form-group">
                <input type="text" id="username" name="username" placeholder="Nom d'utilisateur" required>
                <input type="password" id="password" name="password" placeholder="Mot de passe" required>
                <input type="password" id="cpassword" name="cpassword" placeholder="Confirmer" required>

            </div>
            <button type="submit" name="action" value="register">S'inscrire</button> </br></br>
            
        `;
        toggleBtn.textContent = 'Se connecter';
    } else {
        // Mode connexion
        formContent.innerHTML = `
            <div class="form-group">
            <input type="text" id="username" name="username" placeholder="Nom d'utilisateur" required>
            <input type="password" id="password" name="password" placeholder="Mot de passe" required>
            </div>
          

            <button type="submit" name="action"   
 value="login">Se connecter</button> </br></br> 

        `;
        toggleBtn.textContent = 'S\'inscrire';
    }
    isLoginMode = !isLoginMode;
}

toggleBtn.addEventListener('click', toggleForm);

function coordonnees(pos) {
    let crd = pos.coords;
  
    let latitude = crd.latitude;
    let longitude = crd.longitude;
    
    document.getElementById('lat').val= latitude.toFixed(2);
    document.getElementById('long').val= longitude.toFixed(2);
}
navigator.geolocation.getCurrentPosition(coordonnees);

