export const SERVER_URL = process.env.NODE_ENV === 'development' ?
  'http://localhost:1337' : 'http://bloxeo-api.herokuapp.com',

export const API_VERSION = '/v1',

export const CUSTOM_MODAL_STYLES = {
  content: {
    padding: '0',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    border: '0',
    borderRadius: '3px',
  },
  overlay: {
    backgroundColor: 'rgba(51, 51, 51, 0.6)',
    zIndex: '900',
  },
}
