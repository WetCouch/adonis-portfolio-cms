const homepageProjects = document.getElementsByClassName('projects__card');
const portfolioProjects = document.getElementsByClassName('project-card');

if (homepageProjects) Array.from(homepageProjects).forEach(project => {
  const style = 'projects__card--active';

  project.addEventListener('click', () => {
    if (project.classList.contains(style)) project.classList.remove(style);
    else project.classList.add(style);
  })
});

if (portfolioProjects) Array.from(portfolioProjects).forEach(project => {
  const style = 'project-card--active';

  project.addEventListener('click', () => {
    if (project.classList.contains(style)) project.classList.remove(style);
    else project.classList.add(style);
  })
});
