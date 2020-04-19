const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersRegistered(() => {
  const View = use('View');
  const Drive = use('Drive');

  View.global('projectCategories', () => {
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
  });

  View.global('getImgUrl', img => {
    return Drive.disk('s3').getUrl(img);
  })
});
