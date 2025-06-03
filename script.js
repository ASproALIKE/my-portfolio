// Fetch and display projects
fetch('/projects')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('project-list');
    data.forEach(project => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        ${project.image ? `<img src="${project.image}" alt="${project.title}" />` : ''}
      `;
      list.appendChild(div);
    });
  });

// Handle contact form
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const token = grecaptcha.getResponse();
  const formData = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
    token
  };

  const res = await fetch('/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  const result = await res.json();
  document.getElementById('response').textContent = result.message;
});