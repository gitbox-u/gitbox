const ACTIONS = {
  PUSH_NOTIFICATION: 'NOTIFICATIONS_PUSH',
};

const initial = [{message: 'test'},{message: 'this thing'}];

const addNotification = message => dispatch => dispatch({
  type: ACTIONS.PUSH_NOTIFICATION,
  message
});

const notifications = (state = initial, action) => {
  switch (action.type) {
    case 'NOTIFICATIONS_PUSH':
      return [...state, {message: action.message}];
    default:
      return state;
  }
};

export {addNotification};
export default notifications;