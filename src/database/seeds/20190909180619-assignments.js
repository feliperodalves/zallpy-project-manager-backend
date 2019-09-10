module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'assignments',
      [
        {
          user_id: 1,
          project_id: 1,
          role_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          project_id: 2,
          role_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          project_id: 1,
          role_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 3,
          project_id: 1,
          role_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 3,
          project_id: 2,
          role_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('assignments', null, {}),
};
