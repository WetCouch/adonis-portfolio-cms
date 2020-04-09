const projects = document.getElementsByClassName('projects__card');

Array.from(projects).forEach(project => {
  const style = 'projects__card--active';

  project.addEventListener('click', () => {
    if (project.classList.contains(style)) project.classList.remove(style);
    else project.classList.add(style);
  })
});
