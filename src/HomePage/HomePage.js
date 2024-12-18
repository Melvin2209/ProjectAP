import './HomePage.scss';
import ancreImage from '../Icon/ancre-de-bateau.png';

//todo: responsive
function HomePage() {
  return (
    <body>
        <div class="HomePage">
            <div class="HomePage__welcome">
                <img class="navbar__logo" src={ancreImage}/>
                <h1 class="HomePage__welcome-text">Bienvenue chez MarieTeam</h1>
                <img class="navbar__logo" src={ancreImage}/>
            </div>
            <a href="#" class="HomePage__reservation">Réservez vos trajets en ligne</a>
            <h2 class="HomePage__description">MarieTeam - Naviguez en toute sérénité vers votre destination</h2>
            <div class="HomePage__Actuality">
                <h2 class="HomePage__Actuality-title">Actualité</h2>
                <img class="navbar__logo" src={ancreImage}/>
            </div>
        </div>
    </body>
  );
}

export default HomePage;
