let users = [];
let userId = 1;
let currentPage = 1;
let usersPerPage = 10;

function validateField(value, minLength, maxLength) {
    if (value.length < minLength || value.length > maxLength) {
        return 'Value must be between ' + minLength + ' and ' + maxLength + ' characters';
    }
    return null;
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return 'Invalid email format';
    }
    return null;
}

$(document).ready(function() {
    $('#submitAddUser').click(function(e) {
        e.preventDefault();
        let firstName = $('#firstName').val();
        let lastName = $('#lastName').val();
        let email = $('#email').val();
        let department = $('#department').val();

        let errors = {};

        if (firstName.trim() === '') {
            errors.firstName = 'First name is required';
        } else {
            let error = validateField(firstName, 2, 50);
            if (error) {
                errors.firstName = error;
            }
        }

        if (lastName.trim() === '') {
            errors.lastName = 'Last name is required';
        } else {
            let error = validateField(lastName, 2, 50);
            if (error) {
                errors.lastName = error;
            }
        }

        if (email.trim() === '') {
            errors.email = 'Email is required';
        } else {
            let error = validateEmail(email);
            if (error) {
                errors.email = error;
            }
        }

        if (department.trim() === '') {
            errors.department = 'Department is required';
        } else {
            let error = validateField(department, 2, 50);
            if (error) {
                errors.department = error;
            }
        }

        if (Object.keys(errors).length > 0) {
            for (let field in errors) {
                $('#' + field + 'Error').text(errors[field]);
            }
            return;
        }

        const newUser = {
            id: userId++,
            firstName,
            lastName,
            email,
            department,
        };

        users.push(newUser);
        displayUsers();
        $('#addUserModal').modal('hide');
    });

    $('#submitEditUser').click(function(e) {
        e.preventDefault();
        let id = $('#editUserId').val();
        let firstName = $('#editFirstName').val();
        let lastName = $('#editLastName').val();
        let email = $('#editEmail').val();
        let department = $('#editDepartment').val();

        let errors = {};

        if (firstName.trim() === '') {
            errors.firstName = 'First name is required';
        } else {
            let error = validateField(firstName, 2, 50);
            if (error) {
                errors.firstName = error;
            }
        }

        if (lastName.trim() === '') {
            errors.lastName = 'Last name is required';
        } else {
            let error = validateField(lastName, 2, 50);
            if (error) {
                errors.lastName = error;
            }
        }

        if (email.trim() === '') {
            errors.email = 'Email is required';
        } else {
            let error = validateEmail(email);
            if (error) {
                errors.email = error;
            }
        }

        if (department.trim() === '') {
            errors.department = 'Department is required';
        } else {
            let error = validateField(department, 2, 50);
            if (error) {
                errors.department = error;
            }
        }

        if (Object.keys(errors).length > 0) {
            for (let field in errors) {
                $('#edit' + field + 'Error').text(errors[field]);
            }
            return;
        }

        const userIndex = users.findIndex(user => user.id == id);
        if (userIndex !== -1) {
            users[userIndex] = { id, firstName, lastName, email, department };
            displayUsers();
            $('#editUserModal').modal('hide');
        }
    });

    function displayUsers() {
        const start = (currentPage - 1) * usersPerPage;
        const end = currentPage * usersPerPage;
        const paginatedUsers = users.slice(start, end);
        
        $('#userTableBody').html('');
        paginatedUsers.forEach(user => {
            $('#userTableBody').append(`
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.email}</td>
                    <td>${user.department}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button>
                    </td>
                </tr>
            `);
        });

        displayPagination();
    }

    function editUser(id) {
        const user = users.find(u => u.id === id);
        $('#editUserId').val(user.id);
        $('#editFirstName').val(user.firstName);
        $('#editLastName').val(user.lastName);
        $('#editEmail').val(user.email);
        $('#editDepartment').val(user.department);
        $('#editUserModal').modal('show');
    }

    function deleteUser(id) {
        users = users.filter(u => u.id !== id);
        displayUsers();
    }

    function displayPagination() {
        const pageCount = Math.ceil(users.length / usersPerPage);
        $('#pagination').html('');
        for (let i = 1; i <= pageCount; i++) {
            $('#pagination').append(`
                <li class="page-item ${currentPage === i ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>
                </li>
            `);
        }
    }

    function goToPage(page) {
        currentPage = page;
        displayUsers();
    }
});
