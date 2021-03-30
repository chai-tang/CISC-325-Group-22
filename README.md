# CISC325-Group22

Repository for Group 22's CISC325 High Fidelity Prototype

# Current Functionality:

Welcome Page (index.html)

- When entering the site, users may select their account type and be redirected to the appropriate login page.

Login Pages

- Separate login pages for students and teachers. Currently they just redirect to the associated demo homepages, as there is no actual user login database.

Teacher Homepage

- Users can interact with menu buttons to navigate the site. Most of those pages don't exist yet, so expect some 404 errors.
- Individual projects can be selected from the table. For this prototype, they will all redirect to the same demo project.
- New projects can be added with the "New Project" button, updating the table instantly. However they will disappear upon page refresh because this prototype does not have backend database functionality.

Teacher Project Page

- Users can add and remove custom input and operator blocks.
- Users can create and delete new custom rules for output blocks
- Rule creation menu updates in real time as users create and delete blocks
- The "Preview as Student" button shows the user what this project will look like to students. Currently it just redirects to the student project demo page because we don't have a backend to handle this functionality properly.

Student Homepage

- Similar menu navigation features as the teacher homepage, although with slightly different options for students specifically.
- Individual lessons can be selected from the table. For this prototype, they will all redirect to the same demo project.

Student Project Page

- Users can drag around blocks between the input, operator and block bank areas of the page. The output area updates automatically as blocks are moved.
- Currently only has support for very basic math operations using some demo blocks. In a full implementation, these blocks and their combination outputs would be pulled from a database of projects created by a teacher user.

Known Issues:

- Block bank CSS can't fit more than four blocks at once
- Block text isn't vertically centered
- Most of the CSS is really ugly because josh made it
