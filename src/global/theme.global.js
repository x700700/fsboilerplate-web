import {colorTheme} from "./theme.colors";

export const bannersSize = 0.11;

export const themeGlobal = {
    header: {
        height: '80px',
        bg: colorTheme.col2_d1,
        color: colorTheme.col2_d3,
        fontFamily: "'Trebuchet MS', Helvetica, sans-serif",
        fontSize: '16px',
        link: {
            width: '8em',
            bg: colorTheme.col2_m,
            bgSelected: colorTheme.col2_l3,
            color: colorTheme.col0_d4,
            selectedColor: colorTheme.col2_l3,
            hoverColor: colorTheme.col2_d3,
        },
    },
    footer: {},
    house: {
        bg: colorTheme.col2_l3,
        width: `${Math.floor(100 - bannersSize * 2* 100)}%`,
    },
    banners: {
        bg: 'linear-gradient(to bottom, rgba(244, 232, 66, 0), rgba(165, 104, 0, 0.3))',
        color: colorTheme.col2_d3,
        width: `${Math.floor(bannersSize * 100)}%`,
    },
    error: {
        bg: '#f8d7da',
        color: '#721c24',
    },
};
