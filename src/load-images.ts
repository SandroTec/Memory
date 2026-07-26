import "./scss/main.scss";
// file to help initalise all images needed for game ts

//code-theme images:
const CODE_CARD_BACK = "assets/img/game_page/code-theme/main/card/basic_card_back.png";

const CODE_PLAYER_ICON_B = "assets/img/game_page/code-theme/header/player_label_blue.png";
const CODE_PLAYER_ICON_O = "assets/img/game_page/code-theme/header/player_label_orange.png";

const CODE_PLAYER_ICONS = {
    blue: CODE_PLAYER_ICON_B,
    orange: CODE_PLAYER_ICON_O
}

const CODE_IMAGES = [
    "assets/img/game_page/code-theme/main/card/html_card.png",
    "assets/img/game_page/code-theme/main/card/css_card.png",
    "assets/img/game_page/code-theme/main/card/typescript_card.png",
    "assets/img/game_page/code-theme/main/card/javascript_card.png",
    "assets/img/game_page/code-theme/main/card/angular_card.png",
    "assets/img/game_page/code-theme/main/card/bootstrap_card.png",
    "assets/img/game_page/code-theme/main/card/console_card.png",
    "assets/img/game_page/code-theme/main/card/django_card.png",
    "assets/img/game_page/code-theme/main/card/git_card.png",
    "assets/img/game_page/code-theme/main/card/git_hub_card.png",
    "assets/img/game_page/code-theme/main/card/firebase_card.png",
    "assets/img/game_page/code-theme/main/card/node_card.png",
    "assets/img/game_page/code-theme/main/card/python_card.png",
    "assets/img/game_page/code-theme/main/card/react_card.png",
    "assets/img/game_page/code-theme/main/card/sass_card.png",
    "assets/img/game_page/code-theme/main/card/vs_code_card.png",
    "assets/img/game_page/code-theme/main/card/vueJS_card.png",
    "assets/img/game_page/code-theme/main/card/sql_card.png",
];

//gaming-theme images:
const GAMING_CARD_BACK = "assets/img/game_page/gaming-theme/main/card/basic_card_back.png";

const GAMING_PLAYER_ICON_B = "assets/img/game_page/gaming-theme/header/chess_pawn_blue.png";
const GAMING_PLAYER_ICON_O = "assets/img/game_page/gaming-theme/header/chess_pawn_orange.png";

const GAMING_PLAYER_ICONS = {
    blue: GAMING_PLAYER_ICON_B,
    orange: GAMING_PLAYER_ICON_O
}

const GAMING_IMAGES = [
    "assets//img/game_page/gaming-theme/main/card/ass_card.png",
    "assets//img/game_page/gaming-theme/main/card/banana_card.png",
    "assets//img/game_page/gaming-theme/main/card/controller_card.png",
    "assets//img/game_page/gaming-theme/main/card/circle_card.png",
    "assets//img/game_page/gaming-theme/main/card/dice_card.png",
    "assets//img/game_page/gaming-theme/main/card/game_boy_card.png",
    "assets//img/game_page/gaming-theme/main/card/level_up_card.png",
    "assets//img/game_page/gaming-theme/main/card/mario_card.png",
    "assets//img/game_page/gaming-theme/main/card/minecraft_card.png",
    "assets//img/game_page/gaming-theme/main/card/pacman_card.png",
    "assets//img/game_page/gaming-theme/main/card/pacman2_card.png",
    "assets//img/game_page/gaming-theme/main/card/play_card.png",
    "assets//img/game_page/gaming-theme/main/card/puzzle_card.png",
    "assets//img/game_page/gaming-theme/main/card/symbol_card.png",
    "assets//img/game_page/gaming-theme/main/card/snake_card.png",
    "assets//img/game_page/gaming-theme/main/card/square_card.png",
    "assets//img/game_page/gaming-theme/main/card/star_card.png",
    "assets//img/game_page/gaming-theme/main/card/triangle_card.png",
]

//DA-theme images:
const DA_CARD_BACK = "assets//img/game_page/da-theme/main/card/basic_card_back.png";

const DA_PLAYER_ICON_B = "assets//img/game_page/da-theme/header/chess_pawn_blue.png";
const DA_PLAYER_ICON_O = "assets//img/game_page/da-theme/header/chess_pawn_orange.png";

const DA_PLAYER_ICONS = {
    blue: DA_PLAYER_ICON_B,
    orange: DA_PLAYER_ICON_O
}


const DA_IMAGES = [
    "assets//img/game_page/da-theme/main/card/basket_card.png",
    "assets//img/game_page/da-theme/main/card/chef_card.png",
    "assets//img/game_page/da-theme/main/card/code_a_cuisine_card.png",
    "assets//img/game_page/da-theme/main/card/curtansie_card.png",
    "assets//img/game_page/da-theme/main/card/daBubble_card.png",
    "assets//img/game_page/da-theme/main/card/egg_card.png",
    "assets//img/game_page/da-theme/main/card/flower_card.png",
    "assets//img/game_page/da-theme/main/card/green_symbol_card.png",
    "assets//img/game_page/da-theme/main/card/join_logo_card.png",
    "assets//img/game_page/da-theme/main/card/poke_ball_card.png",
    "assets//img/game_page/da-theme/main/card/poll_app_card.png",
    "assets//img/game_page/da-theme/main/card/pollo_loco_card.png",
    "assets//img/game_page/da-theme/main/card/sakura_ramen_card.png",
    "assets//img/game_page/da-theme/main/card/sharky_card.png",
    "assets//img/game_page/da-theme/main/card/smiley_card.png",
    "assets//img/game_page/da-theme/main/card/soup_card.png",
    "assets//img/game_page/da-theme/main/card/tic_tac_toe_card.png",
    "assets//img/game_page/da-theme/main/card/violet_symbol_card.png",
]

const CURRENT_PLAYER_ICON = "assets//img/game_page/gaming-theme/header/chess_pawn.png";

export {
    CODE_IMAGES,
    GAMING_IMAGES,
    DA_IMAGES,

    CODE_CARD_BACK,
    GAMING_CARD_BACK,
    DA_CARD_BACK,

    CODE_PLAYER_ICONS,
    GAMING_PLAYER_ICONS,
    DA_PLAYER_ICONS,

    CURRENT_PLAYER_ICON
};
