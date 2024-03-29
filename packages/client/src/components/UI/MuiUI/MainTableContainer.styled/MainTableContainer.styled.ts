import styled from '@emotion/styled'
import {
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  Modal,
  Typography,
} from '@mui/material'
import {
  BLACK,
  MAIN_BLUE_COLOR,
  MAIN_DARK_CREAM_COLOR,
  MAIN_DARK_CREAM_HOVER_COLOR,
  MAIN_GRAY_COLOR,
  MAIN_LIGHTBLUE_COLOR,
  MAIN_LIGHT_CREAM_COLOR,
} from '../../../../variables/variables'

export const MainTableContainer = styled(TableContainer)({
  '&.MuiTableContainer-root': {
    width: '80%',
    margin: '0 auto',
    marginTop: '40px',
    marginBottom: '40px',
    padding: '15px 15px 15px 15px',
    backgroundColor: MAIN_DARK_CREAM_COLOR,
    borderRadius: '10px',
    boxShadow: '4px 4px 23px -3px rgba(217,186,152,0.71)',

    '& .MuiBox-root.wrapper': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      padding: '0 20px',
      backgroundColor: MAIN_LIGHTBLUE_COLOR,

      transition: '0.2s ease-out',
      opacity: 0,

      '&.active': {
        opacity: 1,
        padding: '20px',
      },

      '& .MuiTypography-root': {
        display: 'flex',
        gap: '5px',

        '& span': {
          fontWeight: 600,
        },
      },

      '& .MuiSvgIcon-root': {
        width: '30px',
        cursor: 'pointer',
        transition: '0.2s linear',

        '&:hover': {
          color: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  },
}) as typeof TableContainer

export const MainTableHead = styled(TableHead)({
  '&.MuiTableHead-root': {
    transition: '0.3s linear',

    '&.active': {
      backgroundColor: MAIN_LIGHTBLUE_COLOR,
    },

    '& .MuiTableRow-root': {
      color: MAIN_BLUE_COLOR,
      borderBottom: 'none',
    },

    '& .MuiTableCell-root': {
      padding: '5px',
      fontWeight: 600,
      borderBottom: 'none',

      '&:nth-last-of-type(-n+3)': {
        textAlign: 'center',
        paddingLeft: '25px',
      },
    },

    '& .MuiCheckbox-root': {
      height: '100%',
      color: MAIN_GRAY_COLOR,

      '&.Mui-checked': {
        color: MAIN_BLUE_COLOR,
      },
    },
  },
}) as typeof TableHead

export const MainTableBody = styled(TableBody)({
  '&.MuiTableBody-root': {
    '& .MuiTableRow-root': {
      alignItems: 'center',
      height: '100%',
      cursor: 'pointer',
      transition: '0.3s linear',

      '&.active': {
        backgroundColor: MAIN_LIGHTBLUE_COLOR,

        '&:hover': {
          backgroundColor: MAIN_LIGHTBLUE_COLOR,
        },
      },

      '&:hover': {
        backgroundColor: MAIN_DARK_CREAM_HOVER_COLOR,
      },
    },

    '& .MuiCheckbox-root': {
      color: MAIN_GRAY_COLOR,

      '&.Mui-checked': {
        color: MAIN_BLUE_COLOR,
      },
    },

    '& .MuiTableCell-root': {
      padding: '5px',
      borderBottom: 'none',

      '&:first-of-type': {
        padding: '5px',
      },

      '&:nth-last-of-type(-n+3)': {
        textAlign: 'center',
      },

      '& .table_cell_clickable': {
        textDecoration: 'none',
        color: BLACK,

        '&:hover': {
          textDecoration: 'underline',
        },
      },
    },
  },
}) as typeof TableBody

export const MainTablePagination = styled(TablePagination)({
  '& .MuiTablePagination-toolbar': {
    padding: '0 35px 0 0',
  },
}) as typeof TablePagination

export const RemoveMainTableModal = styled(Modal)({
  // '& .MuiBackdrop-root': {
  //   backgroundColor: MAIN_BACKDROP_BLUE_COLOR,
  // },
  '& .MuiBox-root': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    padding: '40px 30px',
    borderRadius: '10px',
    boxShadow: '4px 5px 28px -4px rgba(0,0,0,0.75)',
    backgroundColor: MAIN_DARK_CREAM_COLOR,

    '& .MuiTypography-root': {
      fontSize: '20px',
    },

    '& .buttons': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '15px',
      gap: '5%',

      '& .MuiButtonBase-root': {
        padding: '8px 35px',

        '&.btn_agree': {
          color: MAIN_LIGHT_CREAM_COLOR,
          backgroundColor: 'rgba(57, 86, 127, 0.8)',

          '&:hover': {
            backgroundColor: 'rgba(57, 86, 127, 1)',
            boxShadow: '0 0 5px rgba(57, 86, 127, 1)',
          },
        },

        '&.btn_not_agree': {
          color: MAIN_GRAY_COLOR,
          backgroundColor: 'rgba(57, 86, 127, 0.25)',

          '&:hover': {
            color: MAIN_LIGHT_CREAM_COLOR,
            backgroundColor: 'rgba(57, 86, 127, 1)',
            boxShadow: '0 0 5px rgba(57, 86, 127, 1)',
          },
        },
      },
    },
  },
}) as typeof Modal

export const DetailModal = styled(Modal)({
  '& .MuiBox-root': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    maxWidth: '85vw',
    width: '100%',
    maxHeight: '80vh',
    height: '100%',

    overflow: 'scroll',
    scrollBehavior: 'auto',

    outline: 'none',
    padding: '30px 60px',
    borderRadius: '10px',
    backgroundColor: MAIN_LIGHT_CREAM_COLOR,

    '& .modal_content': {
      display: 'flex',

      gap: '40px',

      width: '100%',

      '& .modal_content_left': {
        flex: '1 1 20%',
        width: '100%',

        display: 'flex',
        alignItems: 'start',

        marginTop: '40px',

        '& .modal_image': {
          maxWidth: '250px',
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          borderRadius: '50%',
        },
      },

      '& .modal_content_right': {
        flex: '1 1 80%',
        width: '100%',

        '& .modal_title_name': {
          textAlign: 'center',
          textTransform: 'uppercase',
          fontSize: '25px',
          fontWeight: 600,
        },

        '& .modal_info_list': {
          display: 'flex',
          flexDirection: 'column',

          gap: '5px',

          marginTop: '10px',

          '& .modal_info_item': {
            '& span': {
              fontWeight: 500,
            },
          },
        },
      },
    },
  },
}) as typeof Modal

export const ModalTypography = styled(Typography)({
  '&.MuiTypography-root': {
    margin: '10px 0',
    color: MAIN_BLUE_COLOR,
  },
}) as typeof Typography
