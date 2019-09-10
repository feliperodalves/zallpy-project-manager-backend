module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          name: 'Administrador',
          email: 'administrador@zallpy.com',
          password_hash:
            '$2a$08$RuwbLJa/xmcmflkEvLjFe.1isZ6sgFurbHU4qwGqNAJSWbnwuD3ay',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Programador 1',
          email: 'programador1@zallpy.com',
          password_hash:
            '$2a$08$RuwbLJa/xmcmflkEvLjFe.1isZ6sgFurbHU4qwGqNAJSWbnwuD3ay',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'Programador 2',
          email: 'programador2@zallpy.com',
          password_hash:
            '$2a$08$RuwbLJa/xmcmflkEvLjFe.1isZ6sgFurbHU4qwGqNAJSWbnwuD3ay',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
