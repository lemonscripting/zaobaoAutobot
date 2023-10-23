// Select the <a> element with the specified class
const linkElement = document.querySelector('a.btn.btn-assign');

// Check if the element was found
if (linkElement) {
  // Get the top-level domain of the current page
  const topLevelDomain = window.location.protocol + '//' + window.location.hostname;

  // Retrieve the href attribute value
  const hrefValue = linkElement.getAttribute('href');

  // Combine the top-level domain with the href value
  const fullLink = topLevelDomain + hrefValue;

  console.log('Full link:', fullLink);
} else {
  console.log('No element with class "btn btn-assign" found.');
}
