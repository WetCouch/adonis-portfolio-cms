const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersRegistered(() => {
  const View = use('View');

  View.global('projectCategories', function () {
    return [
      {
        value: 'ux',
        desc: 'UI / UX Design'
      },
      {
        value: 'dev',
        desc: 'Web Development'
      },
      {
        value: 'fullstack',
        desc: 'Fullstack'
      },
      {
        value: 'photo',
        desc: 'Photo / Video'
      },
      {
        value: 'graphic',
        desc: 'Graphic Design'
      }
    ]
  })
});
