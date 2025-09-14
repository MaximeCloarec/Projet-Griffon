<template>
    <div class="mainContainer">
        <div class="cardsContainer">
            <div class="cardGameMaster">
                <div class="containerGameMaster">
                    <div class="textContainer">
                        <h2>Devenez un maitre du jeu</h2>
                        <p>
                            Libérez votre créativité et créez des expériences de
                            jeu inoubliables. Créez vos propres mondes,
                            histoires et défis, et invitez les joueurs à se
                            lancer dans des aventures épiques.
                        </p>
                        <button>Créez une partie</button>
                    </div>
                </div>
            </div>
            <div class="cardPlayer">
                <div class="containerPlayer">
                    <div class="textContainer">
                        <h2>Rejoindre comme joueur</h2>
                        <p>
                            Plongez dans des jeux palpitants créés par de
                            talentueux maitre du jeu. Saisissez un code de lobby
                            pour rejoindre une aventure continue et échanger
                            avec d'autres joueurs.
                        </p>
                        <div class="inputContainer">
                            <input type="text" placeholder="Entrez code lobby"></input>
                            <button></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script></script>

<style>
.cardsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.cardGameMaster {
    border: solid 1px #0d80f2;
    border-radius: 45px;
    padding: 25px;
    margin: 25px;
    max-width: 960px;
}

.containerGameMaster {
    display: flex;
    align-items: flex-end;
    background: linear-gradient(
            0.25turn,
            rgba(0, 0, 0, 10%),
            rgba(0, 0, 0, 40%)
        ),
        url(../../public/bgGameMaster.jpg);
    border-radius: 20px;
    background-position: center;
    background-size: cover;
    min-height: 480px;
}

.textContainer {
    height: fit-content;
    margin: 30px;
}

.containerPlayer {
    display: flex;
    align-items: flex-end;
    background: linear-gradient(
            0.25turn,
            rgba(0, 0, 0, 10%),
            rgba(0, 0, 0, 40%)
        ),
        url(../../public/bgPlayer.webp);
    border-radius: 20px;
    background-position: center;
    background-size: cover;
    min-height: 480px;
}

.cardPlayer {
    border: solid 1px #ffc404;
    border-radius: 45px;
    padding: 25px;
    margin: 25px;
    max-width: 960px;
}
h2 {
    font-family: UnifrakturMaguntia;
    font-size: 62px;
    margin: 10px;
}

p {
    font-family: Space Grotesk;
    font: 16px;
    margin: 10px;
}

button {
    width: 165px;
    height: 48px;
    background-color: #0d80f2;
    border-radius: 8px;
    margin: 10px;
    box-shadow: 2px 2px 5px white;
}

.inputContainer{
    background-color: white;
    width: fit-content;
}
</style>
