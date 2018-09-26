import React, {  Component } from "react";
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Container, Row, Item, TitleContainer, Title } from './DelTrainingConfirm.style';
import {setCurrentPage, setError} from "../../redux/app.actions";
import {Route} from "react-router-dom";


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
});


class DelTrainingConfirm extends Component {
    render() {
        const { onClickCancel, onClickDelete } = this.props;
        return (
            <Route render={({history}) => (
                <Container>
                    <TitleContainer key='title'>
                        <Title>
                            Press Delete button to delete this training.
                        </Title>
                    </TitleContainer>,
                    <Row>
                        <Item>
                            <Button id='cancel-button' variant="outlined"
                                    size='large'
                                    onClick={() => onClickCancel()}
                            >
                                Cancel
                            </Button>
                        </Item>
                        <Item>
                            <Button id='delete-button' variant="contained" color='secondary'
                                    size='large'
                                    onClick={() => onClickDelete(history)}
                            >
                                Delete
                            </Button>
                        </Item>
                    </Row>
            </Container>
            )}/>
        );
    };
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
}



const mapStateToProps = state => {
    return {
        currentPage: state.app.currentPage,
        error: state.app.error,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        appActions: {
            setError: (prefix, msg) => dispatch(setError(prefix, msg)),
            setCurrentPage: (currentPage) => dispatch(setCurrentPage(currentPage)),
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DelTrainingConfirm));
