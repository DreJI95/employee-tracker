const db = require('./db/connection');
const employee = require('./utils/employee');
const role = require('./utils/role');
const department = require('./utils/department');
const inquirer = require('inquirer');

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
});

//ask the user for an action on initial load of the app
const questions1 = [
  {
    type: 'list',
    name: 'cms_options',
    message: "What would you like to do?",
    choices: [
    'View all departments',
    'View all roles',
    'View all employees',
    'Add a department',
    'Add a role', 
    'Add an employee',
    'Update an employee role',
    'Update an employee manager',
    'Delete a department',
    'Delete a role',
    'Delete a employee']
  }];

  //add employee questions
  const addEmployeeQues = [
    {
      type: 'input',
      name: 'emp_firstname',
      message: "What is the employee first name?",
      validate: emp_firstname => {
        if (emp_firstname){
            return true;}
          else{
            console.log('Please the employee first name!');
            return false;}
        }
    },
  {
    type: 'input',
    name: 'emp_lastname',
    message: "What is the employee last name",
    validate: emp_firstname => {
      if (emp_firstname){
          return true;}
        else{
          console.log('Please the employee last name!');
          return false;}
      }
  },
  {
    type: 'input',
    name: 'emp_role',
    message: "What is the employee role? Enter the role id.",
  },
  {
    type: 'input',
    name: 'emp_manager',
    message: "Who is the employee's manager? Enter the manager's employee id.",
  }
];

const addRoleQues = [
  {
    type: 'input',
    name: 'role_title',
    message: "What is the role title?",
    validate: role_title => {
      if (role_title){
          return true;}
        else{
          console.log('Please the role title!');
          return false;}
    }
  },
{
  type: 'input',
  name: 'role_salary',
  message: "What is the role salary?",
  validate: role_salary => {
    if (role_salary){
        return true;}
      else{
        console.log('Please the role salary!');
        return false;}
  }
},
{
  type: 'input',
  name: 'role_department',
  message: "What is the department for the role? Enter the department id",
}
];

const addDepartmentQues = [
  {
    type: 'input',
    name: 'department_name',
    message: "What is the department name?",
    validate: department_name => {
      if (department_name){
          return true;}
        else{
          console.log('Please the department name!');
          return false;}
    }
  }
];

const removeEmployeeQues = [
  {
    type: 'input',
    name: 'employee_id',
    message: "What is the employee id?",
  }
];

const removeRoleQues = [
  {
    type: 'input',
    name: 'role_id',
    message: "What is the role id?",
  }
];

const removeDepartmentQues = [
  {
    type: 'input',
    name: 'department_id',
    message: "What is the department id?",
  }
];

const updateEmployeeRoleQues = [
  {
    type: 'input',
    name: 'employee_id',
    message: "What is the employee id?",
  },
  {
    type: 'input',
    name: 'emp_role',
    message: "What is the employee role? Enter the role id.",
  },
];

const updateEmployeeManagerQues = [
  {
    type: 'input',
    name: 'employee_id',
    message: "What is the employee id?",
  },
  {
    type: 'input',
    name: 'emp_manager',
    message: "Who is the employee's manager? Enter the manager's employee id.",
  },
];

const promptUser = (questions) => {
  return inquirer.prompt(questions);
}

const selectedOption = function (option) {
  switch (option)
  {
    case 'View all departments': {
      department.viewAllDepartments();
      break;
    }
    case 'View all roles': {
      role.viewAllRoles();
      break;
    }
    case 'View all employees': {
      employee.viewAllEmployees();
      break;
    }
    case 'Add a department': {
      promptUser(addDepartmentQues).then(response => {
        department.addDepartment(response.department_name);
      })
      break;
    }
    case 'Add a role': {
      promptUser(addRoleQues).then(response => {
        role.addRole(response.role_title, response.role_salary, response.role_department);
      })
      break;
    }
    case 'Add an employee': {
      promptUser(addEmployeeQues).then(response => {
        employee.addEmployee(response.emp_firstname,response.emp_lastname, response.emp_role, response.emp_mnager);
      })
      break;
    }
    case 'Update an employee role': {
      promptUser(updateEmployeeRoleQues).then(response => {
        employee.updateEmployeeRole(response.employee_id, response.emp_role);
      }) 
      break;
    }
    case 'Update an employee manager': {
      promptUser(updateEmployeeManagerQues).then(response => {
        employee.updateEmployeeManager(response.employee_id, response.emp_manager);
      }) 
      break;
    }
    case 'Delete a department': {
      promptUser(removeDepartmentQues).then(response => {
        department.removeDepartment(response.department_id);
      })
      break;
    }
    case 'Delete a role': {
      promptUser(removeRoleQues).then(response => {
        role.removeRole(response.role_id);
      })
      break;
    }
    case 'Delete a employee': {
      promptUser(removeEmployeeQues).then(response => {
        employee.removeEmployee(response.employee_id);
      })
      break;
    }
  }
  console.log('\n');
  init();
}

function init () {
promptUser(questions1)
//.then() // second prompt
.then(response => {
  selectedOption(response.cms_options.toString()); // show table results
})
.catch(err => {
  console.log(err);
});
}

init();