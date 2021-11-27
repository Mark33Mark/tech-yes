
const newFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#post-comment').value.trim();
  const post_id = document.URL.slice(document.URL.lastIndexOf("/")+1);
  const user_id = 3;

  if ( comment && post_id && user_id ) {
    const response = await fetch( "/api/comment", {
      method: 'POST',
      body: JSON.stringify({ comment, post_id, user_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    alert(`Congratulations\nYou've successfully commented on post id: ${post_id}.`);

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to create project');
    }
  }
};

document
  .querySelector('#new-comment')
  .addEventListener('submit', newFormHandler);

