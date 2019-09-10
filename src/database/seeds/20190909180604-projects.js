module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'projects',
      [
        {
          id: 1,
          name: 'Projeto Cliente A',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Projeto Cliente B',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('projects', null, {}),
};
