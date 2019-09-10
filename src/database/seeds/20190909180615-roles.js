module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'roles',
      [
        {
          id: 1,
          name: 'Administrador',
        },
        {
          id: 2,
          name: 'Programador',
        },
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('roles', null, {}),
};
