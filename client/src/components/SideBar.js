import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import logo from '../fabric-logo.png'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from './Modal'
import FolderIcon from '@material-ui/icons/Folder';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        visibility: "hidden",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function PersistentDrawerLeft(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const doSomething = () => {
        console.log('hi')
        localStorage.removeItem('FBtoken')
        window.location.reload();
    }

    // console.log(props.user)


    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    {props.authenticated === true && <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"

                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>}
                    <div></div>

                    <div style={{ height: 35 }}>
                        <img src={logo} alt="logo" height="100%" />
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {(props.user && props.user === 'user8@gmail.com') && <Modal />}

                    <ListItem button >
                        <ListItemIcon><FolderIcon /></ListItemIcon>
                        <ListItemText primary='Price Lists' />
                    </ListItem>
                    <List component="div" disablePadding>
                        <ListItem className={classes.nested} onClick={handleDrawerClose} button component={Link}
                            to={{
                                pathname: `/`,
                                state: {
                                    category: 'priceLists/wholesale',
                                }
                            }}
                        >
                            <ListItemIcon><FolderIcon /></ListItemIcon>
                            <ListItemText primary='Wholesale' />
                        </ListItem>

                        <ListItem className={classes.nested} onClick={handleDrawerClose} button component={Link}
                            to={{
                                pathname: `/`,
                                state: {
                                    category: 'priceLists/contract',
                                }
                            }}
                        >
                            <ListItemIcon><FolderIcon /></ListItemIcon>
                            <ListItemText primary='Contract' />
                        </ListItem>

                        <ListItem className={classes.nested} onClick={handleDrawerClose} button component={Link}
                            to={{
                                pathname: `/`,
                                state: {
                                    category: 'priceLists/manufacturer',
                                }
                            }}
                        >
                            <ListItemIcon><FolderIcon /></ListItemIcon>
                            <ListItemText primary='Manufacturer' />
                        </ListItem>
                    </List>
                    <ListItem button>
                        <ListItemIcon><FolderIcon /></ListItemIcon>
                        <ListItemText primary='Catalogs' />
                    </ListItem>
                    <List component="div" disablePadding>
                        <ListItem className={classes.nested} onClick={handleDrawerClose} button component={Link}
                            to={{
                                pathname: `/`,
                                state: {
                                    category: 'catalogs/european',
                                }
                            }}
                        >
                            <ListItemIcon><FolderIcon /></ListItemIcon>
                            <ListItemText primary='European' />
                        </ListItem>

                        <ListItem className={classes.nested} onClick={handleDrawerClose} button component={Link}
                            to={{
                                pathname: `/`,
                                state: {
                                    category: 'catalogs/durarods',
                                }
                            }}
                        >
                            <ListItemIcon><FolderIcon /></ListItemIcon>
                            <ListItemText primary='Durarods' />
                        </ListItem>
                    </List>
                    <ListItem button onClick={handleDrawerClose} component={Link}
                        to={{
                            pathname: `/`,
                            state: {
                                category: 'specs',
                            }
                        }}
                    >
                        <ListItemIcon><FolderIcon /></ListItemIcon>
                        <ListItemText primary='Specs' />

                    </ListItem>
                    <ListItem button onClick={handleDrawerClose} component={Link}
                        to={{
                            pathname: `/`,
                            state: {
                                category: 'pointOfSale',
                            }
                        }}
                    >
                        <ListItemIcon><FolderIcon /></ListItemIcon>
                        <ListItemText primary='Point of Sale' />
                    </ListItem>
                    <ListItem button component={Link}
                        to={{
                            pathname: `/`,
                            state: {
                                category: 'misc',
                            }
                        }}
                    >
                        <ListItemIcon><FolderIcon /></ListItemIcon>
                        <ListItemText primary='Misc' />
                    </ListItem>
                </List>
                <Divider />
                <ListItem button onClick={doSomething}>
                    <ListItemIcon>
                        <MeetingRoomIcon />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </ListItem>
            </Drawer>
        </div >
    );
}
