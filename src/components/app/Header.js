import React, { Component } from 'react';
import { connect } from 'react-redux';
import windowSize from 'react-window-size';
import consts from '../../global/consts';
import { Container, Row } from '../tools/Flex.style'
import LinkTab from './LinkTab';
import { UserImage, AppIconContainer, AppIcon, TabsContainer } from './Header.style';
import logo_fsboilerplate from '../../assets/logo_fsboilerplate2.png';
import { setCurrentPage, resetError } from '../../redux/app.actions';
import {themeGlobal, bannersSize} from "../../global/theme.global";
import iconProfile from '../../assets/profile.png';
import iconTrainings from '../../assets/trainings.png';
import iconExercises from '../../assets/exercises.png';
import iconPractice from '../../assets/practice.png';
import imgUserBooli from '../../assets/user-img-booli.jpg';
import imgUserShahaf from '../../assets/user-img-Shahaf.jpg';
import imgUserNahal from '../../assets/user-img-Nahal.jpg';


const linkTabTheme = {
    borderColor: 'transparent',
    bg: 'transparent',
    bgHover: 'transparent',
    transition: 'opacity .25s ease-in-out',
    width: '45px',
    height: '40px',
    tabWidth: '100px',
    margin: '1rem',
    marginTop: '3px',
};

const appIconSize = {
    width:  159, // 137,
    height: 43,
};

class Header extends Component {
    render = () => {
        const { isAuthChecked, isLoggedIn } = this.props;
        const bannerSize = `${Math.floor(bannersSize * this.props.windowWidth)}px`;

        const gameHeader = (this.props.gameType === consts.GAME_TYPE_PRACTICE || this.props.gameType === consts.GAME_TYPE_UNKNOWN ? 'Practice' : 'Examine');
        let imgUser;
        const username = this.props.userInfo && (this.props.userInfo.nickName || '').toLowerCase();
        if (username === 'booli') imgUser = imgUserBooli;
        if (username === 'shahaf') imgUser = imgUserShahaf;
        if (username === 'nahal') imgUser = imgUserNahal;
        return (
            <Container id='header-container' theme={themeGlobal.header}>
                <Row id='header-row'>
                    <UserImage src={imgUser} alt='user' width={bannerSize} height={bannerSize} hide={!isLoggedIn}/>
                    <TabsContainer id='header-2'>
                        <LinkTab  id='link-welcome' text='Welcome' where={consts.PAGE_WELCOME}
                                  theme={linkTabTheme}
                                  src={iconProfile}
                                  onClick={() => this.linkClicked(consts.PAGE_WELCOME)}
                                  currentPage={this.props.currentPage}
                        />

                        <LinkTab  id='link-trainings' text='My Trainings' where={consts.PAGE_MY_TRAININGS}
                                  theme={linkTabTheme}
                                  src={iconTrainings}
                                  onClick={() => this.linkClicked(consts.PAGE_MY_TRAININGS)}
                                  currentPage={this.props.currentPage}
                                  // hide={isAuthChecked && !isLoggedIn}
                        />
                        <LinkTab  id='link-exercises' text="Exercises" where={consts.PAGE_MY_EXERCISES}
                                  theme={linkTabTheme}
                                  src={iconExercises}
                                  onClick={() => this.linkClicked(consts.PAGE_MY_EXERCISES)}
                                  currentPage={this.props.currentPage}
                                  hide={isAuthChecked && !isLoggedIn}
                        />
                        <LinkTab  id='link-game' text={gameHeader} where={consts.PAGE_GAME}
                                  theme={linkTabTheme}
                                  src={iconPractice}
                                  onClick={() => this.linkClicked(consts.PAGE_GAME)}
                                  currentPage={this.props.currentPage}
                        />

                    </TabsContainer>
                    <AppIconContainer width={bannerSize}>
                        <AppIcon src={logo_fsboilerplate} alt='fsboilerplate' width={bannerSize} height='43px'/>
                    </AppIconContainer>
                </Row>
            </Container>
        )
    };
    componentWillMount() {
        this.setCurrentPage();
    }
    componentWillUpdate() {
        this.setCurrentPage();
    }
    setCurrentPage() {
        let pathname = '/' + window.location.href.replace(/^.*[\\/]/, ''); // Todo: currently this regex splits the last node alone
        // console.log('-----------------', pathname);
        if (!pathname || pathname === '/') pathname = consts.PAGE_WELCOME;
        if (pathname !== this.props.currentPage) {
            this.props.appActions.setCurrentPage(pathname);
        }

    }
    linkClicked = (where) => {
        if (this.props.currentPage !== where) {
            this.props.appActions.setCurrentPage(where);
        }
        if (this.props.appError !== null) {
            this.props.appActions.resetError();
        }
    };
}


const mapStateToProps = state => {
    return {
        isAuthChecked: state.user.isAuthChecked,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        currentPage: state.app.currentPage,
        appError: state.app.error,
        gameType: state.game.gameType,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        appActions: {
            setCurrentPage: (currentPage) => dispatch(setCurrentPage(currentPage)),
            resetError: () => dispatch(resetError()),
        },
        userActions: {
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)((windowSize)(Header));
