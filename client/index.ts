function bootStrapApp() {
  console.log("First app");
  const rootApp = document.getElementById('root-app');
  const newElement = document.createElement('h1');
  newElement.innerText = 'This is my first page of youtube lite!';
  newElement.style.textDecoration = 'underline';
  newElement.style.color = '#008CA2';
  newElement.style.fontStyle = 'italic';
  if (rootApp !== null) {
    rootApp.appendChild(newElement);
  } else {
    console.error('No rood container found');
  }
}

bootStrapApp();
