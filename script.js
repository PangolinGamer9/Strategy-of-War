
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', function() {
    const tabData = this.getAttribute('data-tab');
    const selectedTabContent = document.querySelector(`#${tabData}`);

    tabs.forEach(tab => {
      tab.classList.remove('active');
    });
    this.classList.add('active');

    tabContents.forEach(tabContent => {
      tabContent.style.display = 'none';
    });
    selectedTabContent.style.display = 'flex';

   
  });
});

tabContents.forEach((tabContent, index) => {
  if (index !== 0) {
    tabContent.style.display = 'none';
  }
});
