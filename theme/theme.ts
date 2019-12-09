import {
    createMuiTheme
} from '@material-ui/core/styles';

export const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            textPrimary: {
                color: '#06c3e1'
            },
            contained: {
                borderRadius: '3px',
                boxShadow: 'inset 0 -3px 0 rgba(0,0,0,.1)',
                fontWeight: 500,
                color: '#717a8a',
                '&:hover': {
                    boxShadow: 'none',
                }
            },
            containedPrimary: {
                backgroundColor: '#06c3e1 !important',
                color: '#fff',
                '&:hover': {
                    backgroundColor: '#01bedc !important',
                },
                '&$disabled': {
                    color: '#c6c9d0 !important',
                    background: '#e2e4e7 !important'
                }
            },
            containedSecondary: {
                color: '#06c3e1 !important',
                backgroundColor: '#fff !important',
            },
            root: {
                '&$disabled': {
                    color: '#c6c9d0 !important',
                    background: 'none !important'
                },
                color: '#717a8a',
                padding: '17px 25px',
                borderRadius: '3px',
                fontFamily: '\'Montserrat\', sans-serif !important',
                '&:hover': {
                    backgroundColor: 'none !important'
                }
            }
        },
        MuiBadge: {
            colorPrimary: {
                color: '#ffffff',
                backgroundColor: '#f44336'
            }
        },
        MuiCheckbox: {
            root: {
                color: '#06c3e1',
                '&$checked': {
                    color: '#06c3e1 !important'
                }
            }
        },
        MuiCircularProgress: {
            colorPrimary: {
                color: '#06c3e1'
            }
        },
        MuiDialogActions: {
            root: {
                padding: '0px 20px 20px'
            }
        },
        MuiDialogContent: {
            root: {
                padding: '24px 40px 24px 40px'
            }
        },
        MuiDialogTitle: {
            root: {
                padding: '10px',
                background: '#eef1f4',
                textAlign: 'center',
                textTransform: 'uppercase'
            }
        },
        MuiFormControlLabel: {
            label: {
                width: '100%'
            }
        },
        MuiDivider: {
            root: {
                backgroundColor: '#ebeef1',
                height: '2px'
            }
        },
        MuiFormControl: {
            root: {
                marginTop: '8px',
            },
        },
        MuiFormHelperText: {
            root: {
                fontFamily: '\'Montserrat\', sans-serif !important',
            }
        },
        MuiFormLabel: {
            root: {
                color: '#717a8a',
                fontSize: '14px',
                width: '100%',
                fontWeight: 500,
                fontFamily: '\'Montserrat\', sans-serif !important',
                '&$focused': {
                    color: '#06c3e1 !important',
                    marginTop: '0px !important'
                }
            },
        },
        MuiGridListTileBar: {
            root: {
                background: '#c6c9d0',
                borderRadius: '3px',
            }
        },
        MuiIcon: {
            root: {
                width: '22px',
                height: '22px',
                fontSize: '22px'
            },
            colorPrimary: {
                color: '#06c3e1'
            }
        },
        MuiIconButton: {
            root: {
                '&:hover': {
                    background: 'rgba(6,195,225, 0.2) !important'
                },
                color: '#06c3e1',
                borderRadius: '3px',
                height: '30px',
                width: '30px',
                padding: '0px'
            },
            colorPrimary: {
                color: '#fff !important',
                borderRadius: '5px',
                height: '30px',
                width: '30px',
                background: '#06c3e1',
                '&:hover': {
                    background: 'rgba(6,195,225, 0.75) !important'
                },
            },
            colorSecondary: {
                color: '#b6bac3 !important',
                borderRadius: '5px',
                height: '10px',
                width: '10px',
                background: '#fff',
                '&:hover': {
                    background: 'rgba(6,195,225, 0.75) !important'
                },
            }
        },
        MuiInput: {
            fullWidth: {
                width: 'auto'
            },
            input: {
                '&::placeholder': {
                    color: '#717a8a !important'
                },
                background: '#f3f6f9',
                borderRadius: '5px',
                color: '#717a8a !important',
                padding: '17px 18px'
            },
            multiline: {
                padding: '20px'
            },
            root: {
                border: '2px solid #ebeef1 !important',
                borderRadius: '5px',
                '$&focused': {
                    border: '2px solid #06c3e1 !important',
                    borderRadius: '5px',
                },
            },
            underline: {
                '&:after': {
                    display: 'none'
                },
                '&:before': {
                    display: 'none'
                },
                backgroundColor: '#f3f6f9 !important'
            },
            error: {
                borderColor: '#f44336 !important'
            }
        },
        MuiInputBase: {
            root: {
                fontFamily: '\'Montserrat\', sans-serif !important',
                '&$error': {
                    borderColor: '#f44336 !important'
                }
            }
        },
        MuiInputLabel: {
            root: {
                marginLeft: '20px',
                marginTop: '12px',
                zIndex: 10
            },
            shrink: {
                marginTop: '0px'
            }
        },
        MuiLinearProgress: {
            barColorPrimary: {
                backgroundColor: '#06c3e1'
            },
            colorPrimary: {
                backgroundColor: '#c6c9d0'
            }
        },
        MuiListItem: {
            button: {
                '&:hover': {
                    textDecoration: 'underline #06c3e1',
                    backgroundColor: 'none !important'
                }
            }
        },
        MuiMenuItem: {
            root: {
                color: '#717a8a'
            }
        },
        MuiMobileStepper: {
            root: {
                background: '#fff'
            }
        },
        MuiPaper: {
            rounded: {
                borderRadius: '3px'
            }
        },
        MuiRadio: {
            root: {
                '&$checked': {
                    color: '#06c3e1 !important'
                }
            }
        },
        MuiSelect: {
            select: {
                width: 'calc(100% - 50px)',
            },
            filled: {
                width: 'calc(100% - 50px)',
                backgroundColor: '#fff'
            }
        },
        MuiSnackbarContent: {
            root: {
                color: '#fff !important'
            },
            message: {
                width: '84%'
            }
        },
        MuiStepIcon: {
            root: {
                color: '#c6c9d0 !important'
            },
            active: {
                color: '#06c3e1 !important'
            }
        },
        MuiStepLabel: {
            active: {
                color: '#717a8a !important'
            },
        },
        MuiSvgIcon: {
            colorPrimary: {
                color: '#06c3e1 !important'
            }
        },
        MuiTable: {
            root: {
                fontFamily: '\'Montserrat\', sans-serif !important',
            }
        },
        MuiTableRow: {
            root: {
                borderBottom: '1px solid #ebeef1',
            }
        },
        MuiTableCell: {
            root: {
                padding: '4px',
                border: 'none !important'
            },
            body: {
                color: '#717a8a !important'
            },
        },
        MuiTooltip: {
            tooltipPlacementTop: {
                backgroundColor: '#06c3e1',
                color: '#fff',
                fontSize: '12px'
            }
        },
        MuiTypography: {
            root: {
                fontFamily: '\'Montserrat\', sans-serif !important',
                color: '#717a8a !important',
                '&$colorPrimary': {
                    color: '#06c3e1 !important'
                },
                '&$colorSecondary': {
                    color: '#FB7F6B !important'
                },
                '&$colorError': {
                    color: '#f44336 !important'
                },
            },
            h5: {
                color: '#fff !important'
            },
            h2: {
                color: '#06c3e1 !important',
                fontSize: '24px !important',
                fontWeight: 500,
                marginTop: '20px !important',
                textAlign: 'center',
                textTransform: 'uppercase'
            },
            h6: {
                color: '#06c3e1 !important'
            }
        }
    }
});