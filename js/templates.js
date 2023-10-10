function showHelpFirstPage() {
    return /*html */ `
        <div class=" d-flex justify-content-center align-items-center gapHelp" >
            <img class="closeImg position-absolute" src="img/10_extras/close.svg" alt="" onclick="closeHelpPage()">
            <img class="pepe d-flex align-items-center" src="img/2_character_pepe/2_walk/W-21.png" alt="">
            <div class="d-flex flex-column align-items-center margin-top">
                <span>WALK</span>
                <img class="actionImg" src="img/10_extras/keyboard.png" alt="">
            </div>                
            <button class="position-absolute nextBtn d-flex justify-content-center align-items-center" onclick="showSecondPage()">Next</button>
        </div>            
    `;
}

function showHelpSecondPage() {
    return /*html */ `
        <div class=" d-flex justify-content-center align-items-center gapHelp" >
            <img class="closeImg position-absolute" src="img/10_extras/close.svg" alt="" onclick="closeHelpPage()">
            <img class="pepe d-flex align-items-center" src="img/2_character_pepe/3_jump/J-34.png" alt="">
            <div class="d-flex flex-column align-items-center margin-top">
                <span>JUMP</span>
                <img class="actionImg" src="img/10_extras/space.png" alt="">
            </div>                
            <button class="position-absolute nextBtn d-flex justify-content-center align-items-center" onclick="showThirdPage()">Next</button>
            <button class="position-absolute backBtn d-flex justify-content-center align-items-center" onclick="showFirstPage()">Back</button>
        </div>                
    `;
}

function showHelpThirdPage() {
    return /*html */ `
        <div class=" d-flex justify-content-center align-items-center gapHelp" >
            <img class="closeImg position-absolute" src="img/10_extras/close.svg" alt="" onclick="closeHelpPage()">
            <div class="d-flex negative-margin-top">
                <img class="pepe d-flex align-items-center" src="img/2_character_pepe/1_idle/idle/I-1.png" alt="">
                <img class="bottle" src="img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png" alt="">
                <img class="finalBoss" src="img/4_enemie_boss_chicken/4_hurt/G21.png" alt="">
            </div>
            
            <div class="d-flex flex-column align-items-center margin-top negative-margin-top">
                <span>THROW</span>
                <img class="actionImg" src="img/10_extras/buchstabe-d.png" alt="">
            </div>                
            <button class="position-absolute backBtn d-flex justify-content-center align-items-center" onclick="showSecondPage()">Back</button>
        </div>                
    `;
}