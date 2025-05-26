const bannedWordImages = document.querySelectorAll('.bannedWordTrash');


bannedWordImages.forEach((image) => {
    image.addEventListener('click', (e) => {
        let word = image.getAttribute('data-word');
        fetch('/bannedWord/remove', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', // Content type should be JSON
            },
            body: JSON.stringify({ word: word }),  // Send the word in the body

        }).then(response => {
            if (response.ok) {
                // If the request is successful, redirect to /app
                window.location.href = '/';
            } else {
                console.error('Failed to remove banned word');
            }
        })
            .catch(error => {
                console.error('Error during fetch:', error);
            });

    })
});

const charWizardImages = document.querySelectorAll('.charWizardTrash');

charWizardImages.forEach((image) => {
    image.addEventListener('click', (e) => {
        let key = image.getAttribute('data-word');
        fetch('/charWizard/remove', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', // Content type should be JSON
            },
            body: JSON.stringify({ key: key }),  // Send the word in the body

        }).then(response => {
            if (response.ok) {
                // If the request is successful, redirect to /app
                window.location.href = '/';
            } else {
                console.error('Failed to remove banned word');
            }
        })
            .catch(error => {
                console.error('Error during fetch:', error);
            });

    })
});

// const submitButtons = document.querySelectorAll('input[type="submit"]');

// submitButtons.forEach((submitButton) => {
//     submitButton.addEventListener('click', function (event) {
//         event.preventDefault();

//         alert('Submit button not codded. Form will not be submitted.');
//     });
// });
