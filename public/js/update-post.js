
const updateFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const post = document.querySelector('#post-content').value.trim();

  // get the post id from the url
  const path = window.location.pathname;
  const id = path.slice(path.lastIndexOf("/")+1);
      

  if (id&&title&&post) {

        const response = await fetch( `/api/post/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ id, title, post }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          alert(`Post id: ${id} has now been updated.`);
          document.location.replace('/dashboard');

        } else {
          alert('Failed to update the post.');
        }
    }
};


const deleteButtonHandler = async (event) => {
  
  event.preventDefault();
  
  // get the post id from the url
  const path = window.location.pathname;
  const id = path.slice(path.lastIndexOf("/")+1);

  const response = await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    alert(`Post id: ${id} has now been deleted.`);
    document.location.replace('/dashboard');
  } else {
    alert(`Oops, there was a problem deleting post id: ${id}`);
  }
};


document
  .querySelector('#update-post')
  .addEventListener('submit', updateFormHandler);

document
  .querySelector('#delete-post')
  .addEventListener('click', deleteButtonHandler);