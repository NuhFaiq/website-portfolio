'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

fetch('./assets/projects.json')
  .then(response => response.json())
  .then(projects => {
    const projectList = document.getElementById('projectList');
    const modalContainer1 = document.querySelector("[data-modal-container1]");
    const modalCloseBtn1 = document.querySelector("[data-modal-close-btn1]");
    const overlay1 = document.querySelector("[data-overlay1]");
    const modalTitle = document.querySelector("[data-modal-title1]");
    const modalPreviews = document.querySelector("[data-modal-previews]");
    const modalDescription = document.querySelector("[data-modal-description]");
    const modalFeatures = document.querySelector("[data-modal-features]");

    // Global variable to store the current project for fullscreen
    let currentProject;

    // Function to display the projects based on the selected category
    const displayProjects = (category) => {
      projectList.innerHTML = ''; // Clear current project list
      const filteredProjects = category === 'All' ? projects : projects.filter(project => project.category === category);

      filteredProjects.forEach(project => {
        const projectItem = document.createElement('li');
        projectItem.classList.add('project-item', 'active');
        projectItem.setAttribute('data-category', project.category);
        projectItem.setAttribute('data-project-id', project.title);

        // Create the project link
        const projectLink = document.createElement('a');
        projectLink.href = '#';
        projectLink.setAttribute('data-modal-trigger', 'modal');

        // Create the project image
        const projectImg = document.createElement('figure');
        projectImg.classList.add('project-img');
        const projectIconBox = document.createElement('div');
        projectIconBox.classList.add('project-item-icon-box');
        const projectIcon = document.createElement('ion-icon');
        projectIcon.setAttribute('name', 'eye-outline');
        projectIconBox.appendChild(projectIcon);
        const projectImage = document.createElement('img');
        projectImage.src = project.images && project.images[0]; // Assuming first image is the thumbnail
        projectImage.alt = project.title;
        projectImage.loading = 'lazy';
        projectImg.appendChild(projectIconBox);
        projectImg.appendChild(projectImage);

        // Create project title and category
        const projectTitle = document.createElement('h3');
        projectTitle.classList.add('project-title');
        projectTitle.textContent = project.title;
        const projectCategory = document.createElement('p');
        projectCategory.classList.add('project-category');
        projectCategory.textContent = project.category;

        // Append elements to the project link
        projectLink.appendChild(projectImg);
        projectLink.appendChild(projectTitle);
        projectLink.appendChild(projectCategory);

        // Append project link to the project item
        projectItem.appendChild(projectLink);

        // Append the project item to the project list
        projectList.appendChild(projectItem);

        // Add event listener for modal
        projectItem.addEventListener('click', function () {
          const selectedProject = projects.find(p => p.title === project.title);
          currentProject = selectedProject;  // Store the selected project

          if (selectedProject) {
            // Set the modal content based on the project
            modalTitle.innerHTML = selectedProject.title;
            modalDescription.innerHTML = `<p>${selectedProject.description}</p>`;

            modalFeatures.innerHTML = `<p>${selectedProject.features.map(feature => `- ${feature}`).join('<br />')}</p>`;

            modalPreviews.innerHTML = '';
            const imagesToShow = selectedProject.images.slice(0, 2);
            imagesToShow.forEach((imageSrc, index) => {
              const previewImg = document.createElement('img');
              previewImg.src = imageSrc;
              previewImg.alt = `Screenshot ${index + 1}`;
              previewImg.classList.add('preview-img');
              previewImg.onclick = () => openFullscreen(index);
              modalPreviews.appendChild(previewImg);
            });

            if (selectedProject.images.length > 2) {
              const moreButton = document.createElement('button');
              moreButton.textContent = `+${selectedProject.images.length - 2} More`;
              moreButton.classList.add('more-button');
              moreButton.onclick = () => openFullscreen(2);
              modalPreviews.appendChild(moreButton);
            }

            portfolioModalFunc();
          }
        });
      });
    };

    // Call displayProjects for the initial load (All projects)
    displayProjects('All');

    // Filter button functionality
    document.querySelectorAll('[data-filter-btn]').forEach(button => {
      button.addEventListener('click', (e) => {
        const category = e.target.textContent.trim();
        displayProjects(category);

        // Set the active class on the clicked filter button
        document.querySelectorAll('[data-filter-btn]').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
      });
    });

    // Select dropdown functionality
    document.querySelectorAll('[data-select-item]').forEach(button => {
      button.addEventListener('click', (e) => {
        const category = e.target.textContent.trim();
        displayProjects(category);

        // Update the select button text
        document.querySelector('[data-selecct-value]').textContent = category;
      });
    });

    // Modal functionality
    const portfolioModalFunc = () => {
      modalContainer1.classList.toggle("active");
      overlay1.classList.toggle("active");
    };

    modalCloseBtn1.addEventListener("click", portfolioModalFunc);
    overlay1.addEventListener("click", portfolioModalFunc);

    // Fullscreen viewer
    function openFullscreen(index) {
      const images = currentProject.images;
      const fullscreenImage = document.getElementById('fullscreenImage');
      fullscreenImage.src = images[index];
      document.getElementById('fullscreenViewer').classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      window.currentFullscreenIndex = index;
    }

    function closeFullscreen() {
      document.getElementById('fullscreenViewer').classList.add('hidden');
      document.body.style.overflow = '';
    }

    function moveFullscreenSlide(direction) {
      const images = currentProject.images;
      window.currentFullscreenIndex += direction;

      if (window.currentFullscreenIndex < 0) {
        window.currentFullscreenIndex = images.length - 1;
      } else if (window.currentFullscreenIndex >= images.length) {
        window.currentFullscreenIndex = 0;
      }

      document.getElementById('fullscreenImage').src = images[window.currentFullscreenIndex];
    }

    document.querySelector('.fullscreen-close').addEventListener('click', closeFullscreen);
    document.querySelector('.prev-fullscreen').addEventListener('click', () => moveFullscreenSlide(-1));
    document.querySelector('.next-fullscreen').addEventListener('click', () => moveFullscreenSlide(1));
  })
  .catch(error => console.error('Error loading projects:', error));
