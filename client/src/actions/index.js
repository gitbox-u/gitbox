let userID = 0;

export const addUser = username => ({
  type: 'ADD_USER',
  id: userID++,
  username,
});

export const removeUser = id => ({
  type: 'REMOVE_USER',
  id
});